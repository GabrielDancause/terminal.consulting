#!/usr/bin/env python3
"""
backfill-dates.py

Backfills publish dates for blog posts on aliimperiale.com.

For each blog post without a date:
  1. Extracts the YouTube video ID from the post HTML
  2. Uses yt-dlp to fetch the video's upload date
  3. Updates:
     - blog/index.html card-date divs
     - Each blog post's article-date, article:published_time meta, and JSON-LD schema
     - sitemap.xml lastmod entries

Idempotent: skips posts that already have dates.
Caches results in dates-cache.json to avoid re-fetching.
"""

import glob
import json
import os
import re
import shutil
import subprocess
import sys
import time
from datetime import datetime
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
BLOG_DIR = BASE_DIR / "blog"
INDEX_FILE = BLOG_DIR / "index.html"
SITEMAP_FILE = BASE_DIR / "sitemap.xml"
CACHE_FILE = BASE_DIR / "dates-cache.json"

BATCH_DATE = "2026-02-14"  # The placeholder date used in sitemap for undated posts


def check_yt_dlp():
    """Check if yt-dlp is installed."""
    if shutil.which("yt-dlp") is None:
        print("ERROR: yt-dlp is not installed.")
        print("Install it with: brew install yt-dlp")
        sys.exit(1)
    print("[OK] yt-dlp found")


def load_cache():
    """Load the date cache from disk."""
    if CACHE_FILE.exists():
        with open(CACHE_FILE, "r") as f:
            cache = json.load(f)
        print(f"[OK] Loaded cache with {len(cache)} entries")
        return cache
    return {}


def save_cache(cache):
    """Save the date cache to disk."""
    with open(CACHE_FILE, "w") as f:
        json.dump(cache, f, indent=2, sort_keys=True)
    print(f"[OK] Saved cache ({len(cache)} entries)")


def extract_video_id(html_content):
    """Extract YouTube video ID from blog post HTML.

    Looks for patterns like:
      - youtube.com/embed/VIDEO_ID
      - i3.ytimg.com/vi/VIDEO_ID/
    """
    # Try embed URL first
    match = re.search(r'youtube\.com/embed/([a-zA-Z0-9_-]{11})', html_content)
    if match:
        return match.group(1)

    # Try thumbnail URL
    match = re.search(r'i3\.ytimg\.com/vi/([a-zA-Z0-9_-]{11})/', html_content)
    if match:
        return match.group(1)

    return None


def fetch_upload_date(video_id, cache):
    """Fetch upload date for a YouTube video using yt-dlp.

    Returns (iso_date, human_date) tuple, e.g. ("2025-12-15", "December 15, 2025")
    Uses cache to avoid redundant fetches.
    """
    if video_id in cache:
        entry = cache[video_id]
        return entry["iso"], entry["human"]

    print(f"    Fetching date for video {video_id}...")
    try:
        result = subprocess.run(
            ["yt-dlp", "--print", "upload_date", "--no-download",
             f"https://www.youtube.com/watch?v={video_id}"],
            capture_output=True, text=True, timeout=30
        )
        if result.returncode != 0:
            print(f"    WARNING: yt-dlp failed for {video_id}: {result.stderr.strip()}")
            return None, None

        raw_date = result.stdout.strip()  # YYYYMMDD format
        if not raw_date or len(raw_date) != 8:
            print(f"    WARNING: Unexpected date format from yt-dlp: '{raw_date}'")
            return None, None

        dt = datetime.strptime(raw_date, "%Y%m%d")
        iso_date = dt.strftime("%Y-%m-%d")
        human_date = dt.strftime("%B %-d, %Y")  # e.g. "January 5, 2026"

        cache[video_id] = {"iso": iso_date, "human": human_date}
        return iso_date, human_date

    except subprocess.TimeoutExpired:
        print(f"    WARNING: yt-dlp timed out for {video_id}")
        return None, None
    except Exception as e:
        print(f"    WARNING: Error fetching date for {video_id}: {e}")
        return None, None


def find_posts_without_dates(index_html):
    """Parse index.html to find blog cards with empty card-date divs.

    Returns a list of dicts:
      { "href": "filename.html", "video_id": "...", "thumb_video_id": "..." }
    """
    posts = []

    # Find all blog cards with empty card-date
    # Pattern: <a href="FILENAME" class="blog-card">
    #   <img ... src="https://i3.ytimg.com/vi/VIDEO_ID/mqdefault.jpg" ...>
    #   <div class="info">
    #     <div class="card-date"></div>
    pattern = re.compile(
        r'<a\s+href="([^"]+)"\s+class="blog-card"[^>]*>\s*'
        r'<img[^>]*src="https://i3\.ytimg\.com/vi/([a-zA-Z0-9_-]{11})/[^"]*"[^>]*>\s*'
        r'<div\s+class="info">\s*'
        r'<div\s+class="card-date">\s*</div>',
        re.DOTALL
    )

    for match in pattern.finditer(index_html):
        href = match.group(1)
        thumb_vid = match.group(2)
        posts.append({
            "href": href,
            "thumb_video_id": thumb_vid,
        })

    return posts


def update_index_html(index_html, updates):
    """Update blog/index.html with dates for empty card-date divs.

    updates: dict mapping video_id -> human_date
    Returns the modified HTML.
    """
    modified = index_html
    for vid_id, human_date in updates.items():
        # Find the card that has this video ID in its thumbnail and an empty card-date
        pattern = re.compile(
            r'(<a\s+href="[^"]+"\s+class="blog-card"[^>]*>\s*'
            r'<img[^>]*src="https://i3\.ytimg\.com/vi/' + re.escape(vid_id) + r'/[^"]*"[^>]*>\s*'
            r'<div\s+class="info">\s*)'
            r'<div\s+class="card-date">\s*</div>',
            re.DOTALL
        )
        replacement = r'\g<1><div class="card-date">' + human_date + '</div>'
        modified, count = pattern.subn(replacement, modified)
        if count > 0:
            print(f"  [index.html] Set date for video {vid_id}: {human_date}")
        else:
            print(f"  [index.html] WARNING: Could not find empty card-date for video {vid_id}")

    return modified


def update_blog_post(post_path, iso_date, human_date):
    """Update a single blog post file with the publish date.

    Updates:
      1. <p class="article-date">CATEGORY</p> -> keeps category, or replaces with date
         Actually: replace category text with date
      2. Add <meta property="article:published_time" content="ISO_DATE"> if missing
      3. Add datePublished and dateModified to JSON-LD schema if missing
    """
    with open(post_path, "r", encoding="utf-8") as f:
        html = f.read()

    modified = False

    # 1. Update article-date: replace category text with human-readable date
    #    Pattern: <p class="article-date">CATEGORY TEXT</p>
    #    But only if it doesn't already contain a date-like string
    article_date_pattern = re.compile(
        r'<p\s+class="article-date">([^<]+)</p>'
    )
    match = article_date_pattern.search(html)
    if match:
        current_text = match.group(1).strip()
        # Check if it already has a date (contains a year like 2025 or 2026)
        if not re.search(r'\b20\d{2}\b', current_text):
            html = article_date_pattern.sub(
                f'<p class="article-date">{human_date}</p>',
                html
            )
            print(f"    Updated article-date: '{current_text}' -> '{human_date}'")
            modified = True
        else:
            print(f"    article-date already has a date: '{current_text}'")
    else:
        # Check for <span class="date"> pattern (used by dated posts)
        span_date_pattern = re.compile(r'<span\s+class="date">([^<]*)</span>')
        span_match = span_date_pattern.search(html)
        if span_match:
            current_text = span_match.group(1).strip()
            if not re.search(r'\b20\d{2}\b', current_text):
                html = span_date_pattern.sub(
                    f'<span class="date">{human_date}</span>',
                    html
                )
                print(f"    Updated span date: '{current_text}' -> '{human_date}'")
                modified = True

    # 2. Add article:published_time meta tag if missing
    if 'article:published_time' not in html:
        # Insert after article:author meta, or after og:image meta
        insertion_patterns = [
            (r'(<meta\s+property="article:author"[^>]*>)', r'\1\n  <meta property="article:published_time" content="' + iso_date + '">'),
            (r'(</head>)', r'  <meta property="article:published_time" content="' + iso_date + '">\n\1'),
        ]
        for pattern, replacement in insertion_patterns:
            new_html = re.sub(pattern, replacement, html, count=1)
            if new_html != html:
                html = new_html
                print(f"    Added article:published_time: {iso_date}")
                modified = True
                break
    else:
        print(f"    article:published_time already present")

    # 3. Add datePublished and dateModified to JSON-LD schema
    ld_json_pattern = re.compile(
        r'(<script\s+type="application/ld\+json">\s*\{)(.*?)(}\s*</script>)',
        re.DOTALL
    )
    ld_match = ld_json_pattern.search(html)
    if ld_match:
        ld_content = ld_match.group(2)
        if '"datePublished"' not in ld_content:
            # Find the closing brace of the JSON object and insert before it
            # We need to add datePublished and dateModified before the closing }
            # Find the last property in the JSON (before the closing })
            new_ld_content = ld_content.rstrip()
            if new_ld_content.endswith(','):
                new_ld_content += '\n  "datePublished": "' + iso_date + '",\n  "dateModified": "' + iso_date + '"'
            else:
                new_ld_content += ',\n  "datePublished": "' + iso_date + '",\n  "dateModified": "' + iso_date + '"'

            html = html[:ld_match.start(2)] + new_ld_content + html[ld_match.end(2):]
            print(f"    Added datePublished/dateModified to JSON-LD: {iso_date}")
            modified = True
        else:
            print(f"    JSON-LD datePublished already present")
    else:
        print(f"    WARNING: No JSON-LD schema found in {post_path.name}")

    if modified:
        with open(post_path, "w", encoding="utf-8") as f:
            f.write(html)
        print(f"    Saved {post_path.name}")
    else:
        print(f"    No changes needed for {post_path.name}")

    return modified


def update_sitemap(sitemap_html, date_map):
    """Update sitemap.xml: replace BATCH_DATE with actual dates for matching URLs.

    date_map: dict mapping filename (e.g. "bedroom-techniques.html") -> iso_date
    """
    modified = sitemap_html
    changes = 0

    for filename, iso_date in date_map.items():
        url = f"https://aliimperiale.com/blog/{filename}"
        # Pattern: <loc>URL</loc>\n    <lastmod>BATCH_DATE</lastmod>
        pattern = re.compile(
            r'(<loc>' + re.escape(url) + r'</loc>\s*<lastmod>)' +
            re.escape(BATCH_DATE) +
            r'(</lastmod>)'
        )
        new_modified = pattern.sub(r'\g<1>' + iso_date + r'\2', modified)
        if new_modified != modified:
            modified = new_modified
            changes += 1
            print(f"  [sitemap.xml] {filename}: {BATCH_DATE} -> {iso_date}")

    print(f"  [sitemap.xml] Updated {changes} entries")
    return modified


def main():
    print("=" * 60)
    print("Blog Date Backfill Script")
    print("=" * 60)
    print()

    # Pre-flight checks
    check_yt_dlp()
    print()

    # Load cache
    cache = load_cache()
    print()

    # Read index.html
    print("[1/5] Reading blog index...")
    with open(INDEX_FILE, "r", encoding="utf-8") as f:
        index_html = f.read()

    # Find posts without dates
    undated_posts = find_posts_without_dates(index_html)
    print(f"  Found {len(undated_posts)} posts without dates")
    print()

    if not undated_posts:
        print("All posts already have dates. Nothing to do!")
        return

    # Fetch dates for each undated post
    print("[2/5] Fetching YouTube upload dates...")
    date_results = {}  # video_id -> (iso_date, human_date)
    fetch_count = 0

    for i, post in enumerate(undated_posts, 1):
        vid_id = post["thumb_video_id"]
        href = post["href"]
        print(f"  [{i}/{len(undated_posts)}] {href} (video: {vid_id})")

        # Also try to get video ID from the actual post file (embed URL)
        post_path = BLOG_DIR / href
        if post_path.exists():
            with open(post_path, "r", encoding="utf-8") as f:
                post_html = f.read()
            embed_vid = extract_video_id(post_html)
            if embed_vid and embed_vid != vid_id:
                print(f"    Note: embed video ID ({embed_vid}) differs from thumbnail ({vid_id}), using embed")
                vid_id = embed_vid

        # Check if already in cache
        needs_fetch = vid_id not in cache
        iso_date, human_date = fetch_upload_date(vid_id, cache)

        if iso_date:
            date_results[vid_id] = (iso_date, human_date, href)
            print(f"    Date: {human_date} ({iso_date})")
        else:
            print(f"    SKIPPED: Could not determine date")

        # Rate limit only if we actually fetched (not from cache)
        if needs_fetch and i < len(undated_posts):
            fetch_count += 1
            if fetch_count % 5 == 0:
                save_cache(cache)  # Periodic save
            time.sleep(1)

    # Save cache after all fetches
    save_cache(cache)
    print()

    # Build mappings
    # video_id -> human_date for index.html updates
    vid_to_human = {vid: human for vid, (iso, human, href) in date_results.items()}
    # filename -> iso_date for sitemap updates
    file_to_iso = {href: iso for vid, (iso, human, href) in date_results.items()}
    # filename -> (iso_date, human_date) for post updates
    file_to_dates = {href: (iso, human) for vid, (iso, human, href) in date_results.items()}

    # Update index.html
    print("[3/5] Updating blog/index.html...")
    updated_index = update_index_html(index_html, vid_to_human)
    with open(INDEX_FILE, "w", encoding="utf-8") as f:
        f.write(updated_index)
    print()

    # Update individual blog posts
    print("[4/5] Updating individual blog posts...")
    for href, (iso_date, human_date) in file_to_dates.items():
        post_path = BLOG_DIR / href
        if post_path.exists():
            print(f"  Processing {href}...")
            update_blog_post(post_path, iso_date, human_date)
        else:
            print(f"  WARNING: Post file not found: {href}")
    print()

    # Update sitemap.xml
    print("[5/5] Updating sitemap.xml...")
    with open(SITEMAP_FILE, "r", encoding="utf-8") as f:
        sitemap_html = f.read()
    updated_sitemap = update_sitemap(sitemap_html, file_to_iso)
    with open(SITEMAP_FILE, "w", encoding="utf-8") as f:
        f.write(updated_sitemap)
    print()

    # Summary
    print("=" * 60)
    print("DONE!")
    print(f"  Posts processed: {len(date_results)}")
    print(f"  Posts skipped (no date found): {len(undated_posts) - len(date_results)}")
    print(f"  Cache entries: {len(cache)}")
    print("=" * 60)


if __name__ == "__main__":
    main()
