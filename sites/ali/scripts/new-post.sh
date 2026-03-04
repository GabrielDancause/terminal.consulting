#!/bin/bash
# ============================================================
# new-post.sh — Generate a new blog post from a YouTube video
# ============================================================
# Usage: ./scripts/new-post.sh
#
# This script:
# 1. Fetches the YouTube RSS feed for Ali Imperiale's channel
# 2. Shows recent videos that don't have blog posts yet
# 3. Lets you pick a video
# 4. Generates the HTML blog post file from a template
# 5. Updates blog/index.html with the new card
# 6. Updates sitemap.xml with the new URL
#
# After running, you still need to:
# - Edit the generated blog post to write the actual article content
# - git add, commit, and push
# ============================================================

set -e

SITE_DIR="$(cd "$(dirname "$0")/.." && pwd)"
BLOG_DIR="$SITE_DIR/blog"
FEED_URL="https://www.youtube.com/feeds/videos.xml?channel_id=UC8CSKrb0Pp2HNp5Ri6zSC1Q"
SITEMAP="$SITE_DIR/sitemap.xml"
BLOG_INDEX="$BLOG_DIR/index.html"

echo ""
echo "🎬 Ali Imperiale — New Blog Post Generator"
echo "============================================"
echo ""

# --- Step 1: Fetch RSS feed ---
echo "Fetching YouTube RSS feed..."
FEED=$(curl -s "$FEED_URL")

if [ -z "$FEED" ]; then
  echo "❌ Failed to fetch RSS feed. Check your internet connection."
  exit 1
fi

# --- Step 2: Parse videos from feed ---
# Extract video IDs, titles, dates, and descriptions
# We filter out shorts (videos with very short/empty descriptions)

echo ""
echo "Recent videos without blog posts:"
echo "-----------------------------------"

VIDEO_COUNT=0
declare -a VIDEO_IDS
declare -a VIDEO_TITLES
declare -a VIDEO_DATES
declare -a VIDEO_DESCS

while IFS= read -r line; do
  if echo "$line" | grep -q '<yt:videoId>'; then
    CURRENT_ID=$(echo "$line" | sed 's/.*<yt:videoId>\(.*\)<\/yt:videoId>.*/\1/')
  fi
  if echo "$line" | grep -q '<published>' && [ -n "$CURRENT_ID" ]; then
    CURRENT_DATE=$(echo "$line" | sed 's/.*<published>\(.*\)<\/published>.*/\1/' | cut -c1-10)
  fi
  if echo "$line" | grep -q '<media:title>'; then
    CURRENT_TITLE=$(echo "$line" | sed 's/.*<media:title>\(.*\)<\/media:title>.*/\1/')
  fi
  if echo "$line" | grep -q '<media:description>'; then
    CURRENT_DESC=$(echo "$line" | sed 's/.*<media:description>\(.*\)/\1/' | head -c 200)

    # Check if description is substantial (content video, not a short)
    DESC_LEN=${#CURRENT_DESC}
    if [ "$DESC_LEN" -gt 100 ] && [ -n "$CURRENT_ID" ]; then
      # Check if blog post already exists
      SLUG=$(echo "$CURRENT_TITLE" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9 ]//g' | sed 's/  */ /g' | sed 's/ /-/g' | cut -c1-60)

      # Check against existing blog files
      EXISTING=false
      for f in "$BLOG_DIR"/*.html; do
        [ "$f" = "$BLOG_DIR/index.html" ] && continue
        if grep -q "$CURRENT_ID" "$f" 2>/dev/null; then
          EXISTING=true
          break
        fi
      done

      if [ "$EXISTING" = false ]; then
        VIDEO_COUNT=$((VIDEO_COUNT + 1))
        VIDEO_IDS[$VIDEO_COUNT]="$CURRENT_ID"
        VIDEO_TITLES[$VIDEO_COUNT]="$CURRENT_TITLE"
        VIDEO_DATES[$VIDEO_COUNT]="$CURRENT_DATE"
        VIDEO_DESCS[$VIDEO_COUNT]="$CURRENT_DESC"
        echo "  [$VIDEO_COUNT] ($CURRENT_DATE) $CURRENT_TITLE"
      fi
    fi
    CURRENT_ID=""
    CURRENT_TITLE=""
    CURRENT_DATE=""
    CURRENT_DESC=""
  fi
done <<< "$FEED"

if [ "$VIDEO_COUNT" -eq 0 ]; then
  echo ""
  echo "✅ All recent videos already have blog posts! Nothing to do."
  exit 0
fi

echo ""
read -p "Select a video number (1-$VIDEO_COUNT): " SELECTION

if [ -z "$SELECTION" ] || [ "$SELECTION" -lt 1 ] || [ "$SELECTION" -gt "$VIDEO_COUNT" ] 2>/dev/null; then
  echo "❌ Invalid selection."
  exit 1
fi

VIDEO_ID="${VIDEO_IDS[$SELECTION]}"
VIDEO_TITLE="${VIDEO_TITLES[$SELECTION]}"
VIDEO_DATE="${VIDEO_DATES[$SELECTION]}"

echo ""
echo "Selected: $VIDEO_TITLE"
echo "Video ID: $VIDEO_ID"
echo "Date:     $VIDEO_DATE"

# --- Step 3: Generate filename slug ---
read -p "Enter a filename slug (e.g., my-new-post): " SLUG

if [ -z "$SLUG" ]; then
  # Auto-generate from title
  SLUG=$(echo "$VIDEO_TITLE" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9 ]//g' | sed 's/  */ /g' | sed 's/ /-/g' | cut -c1-60 | sed 's/-$//')
  echo "Auto-generated slug: $SLUG"
fi

FILENAME="$SLUG.html"
FILEPATH="$BLOG_DIR/$FILENAME"

if [ -f "$FILEPATH" ]; then
  echo "❌ File already exists: $FILEPATH"
  exit 1
fi

# --- Step 4: Format the date for display ---
YEAR=$(echo "$VIDEO_DATE" | cut -c1-4)
MONTH=$(echo "$VIDEO_DATE" | cut -c6-7)
DAY=$(echo "$VIDEO_DATE" | cut -c9-10)

case $MONTH in
  01) MONTH_NAME="January" ;;
  02) MONTH_NAME="February" ;;
  03) MONTH_NAME="March" ;;
  04) MONTH_NAME="April" ;;
  05) MONTH_NAME="May" ;;
  06) MONTH_NAME="June" ;;
  07) MONTH_NAME="July" ;;
  08) MONTH_NAME="August" ;;
  09) MONTH_NAME="September" ;;
  10) MONTH_NAME="October" ;;
  11) MONTH_NAME="November" ;;
  12) MONTH_NAME="December" ;;
esac

# Remove leading zero from day
DISPLAY_DAY=$(echo "$DAY" | sed 's/^0//')
DISPLAY_DATE="$MONTH_NAME $DISPLAY_DAY, $YEAR"

# --- Step 5: Ask for article details ---
echo ""
read -p "Enter a short meta description (1-2 sentences): " META_DESC
read -p "Enter article subtitle (shown below title): " SUBTITLE

# --- Step 6: Generate the blog post HTML ---
echo ""
echo "Generating blog post: $FILEPATH"

# Escape special characters for HTML
HTML_TITLE=$(echo "$VIDEO_TITLE" | sed 's/&/\&amp;/g; s/</\&lt;/g; s/>/\&gt;/g; s/"/\&quot;/g')

cat > "$FILEPATH" << HEREDOC
<!DOCTYPE html>
<html lang="en">
<head>
<script src="../consent.js" defer></script>
<script src="../email-capture.js" defer></script>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${HTML_TITLE} | Ali Imperiale</title>
  <meta name="description" content="${META_DESC}">
  <meta property="og:title" content="${HTML_TITLE}">
  <meta property="og:description" content="${META_DESC}">
  <meta property="og:type" content="article">
  <meta property="og:url" content="https://aliimperiale.com/blog/${FILENAME}">
  <meta property="og:image" content="https://i3.ytimg.com/vi/${VIDEO_ID}/maxresdefault.jpg">
  <meta property="og:image:width" content="1280">
  <meta property="og:image:height" content="720">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${HTML_TITLE}">
  <meta name="twitter:image" content="https://i3.ytimg.com/vi/${VIDEO_ID}/maxresdefault.jpg">
  <link rel="canonical" href="https://aliimperiale.com/blog/${FILENAME}">
  <link rel="icon" type="image/png" href="../favicon.png">
  <link rel="apple-touch-icon" href="../apple-touch-icon.png">
  <meta property="article:published_time" content="${VIDEO_DATE}">
  <meta property="article:author" content="Ali Imperiale">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet">
  <style>
    @font-face {
      font-family: 'New Standard';
      src: url('../fonts/NewStandard-Regular.woff2') format('woff2');
      font-weight: 400;
      font-style: normal;
      font-display: swap;
    }

    @font-face {
      font-family: 'The Bloomington';
      src: url('../fonts/TheBloomington-Script.woff2') format('woff2');
      font-weight: 400;
      font-style: normal;
      font-display: swap;
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Montserrat', sans-serif;
      background-color: #FAF8EB;
      color: #2E3E24;
      min-height: 100vh;
      line-height: 1.7;
    }

    /* Navigation */
    .nav {
      background-color: #2E3E24;
      padding: 16px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .nav-logo {
      height: 36px;
      opacity: 0.95;
    }

    .nav-links {
      display: flex;
      gap: 24px;
      list-style: none;
    }

    .nav-links a {
      color: #C6C8BB;
      text-decoration: none;
      font-size: 0.88rem;
      font-weight: 500;
      letter-spacing: 0.02em;
      transition: color 0.15s ease;
    }

    .nav-links a:hover {
      color: #FAF8EB;
    }

    /* Article Header */
    .article-header {
      background-color: #2E3E24;
      color: #FAF8EB;
      text-align: center;
      padding: 32px 20px 60px;
      position: relative;
    }

    .article-header::after {
      content: '';
      position: absolute;
      bottom: -1px;
      left: 0;
      right: 0;
      height: 30px;
      background: #FAF8EB;
      border-radius: 30px 30px 0 0;
    }

    .article-date {
      font-size: 0.8rem;
      color: #AD9846;
      font-weight: 500;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      margin-bottom: 12px;
    }

    .article-header h1 {
      font-family: 'New Standard', Georgia, serif;
      font-size: 2rem;
      font-weight: 400;
      line-height: 1.3;
      max-width: 600px;
      margin: 0 auto;
      color: #FAF8EB;
    }

    .article-subtitle {
      font-size: 0.95rem;
      color: #C6C8BB;
      margin-top: 14px;
      max-width: 500px;
      margin-left: auto;
      margin-right: auto;
      line-height: 1.6;
    }

    /* Article Body */
    .article-container {
      max-width: 720px;
      margin: 0 auto;
      padding: 10px 20px 0;
    }

    .article-body p {
      font-size: 0.95rem;
      line-height: 1.85;
      color: #2E3E24;
      margin-bottom: 20px;
    }

    .article-body h2 {
      font-family: 'New Standard', Georgia, serif;
      font-size: 1.4rem;
      font-weight: 400;
      color: #2E3E24;
      margin-top: 36px;
      margin-bottom: 16px;
      line-height: 1.35;
    }

    .article-body h3 {
      font-family: 'New Standard', Georgia, serif;
      font-size: 1.15rem;
      font-weight: 400;
      color: #422626;
      margin-top: 28px;
      margin-bottom: 12px;
    }

    .article-body em {
      font-style: italic;
    }

    .article-body strong {
      font-weight: 600;
      color: #2E3E24;
    }

    .article-body a {
      color: #AD9846;
      text-decoration: underline;
      text-underline-offset: 2px;
    }

    .article-body a:hover {
      color: #2E3E24;
    }

    .article-body ul {
      margin-bottom: 20px;
      padding-left: 24px;
    }

    .article-body ul li {
      font-size: 0.95rem;
      line-height: 1.85;
      margin-bottom: 6px;
    }

    /* Pull Quote */
    .pull-quote {
      border-left: 3px solid #AD9846;
      padding: 16px 0 16px 24px;
      margin: 32px 0;
      font-family: 'New Standard', Georgia, serif;
      font-size: 1.1rem;
      color: #422626;
      line-height: 1.65;
    }

    /* Video Embed */
    .video-section {
      margin: 36px 0;
    }

    .video-embed {
      position: relative;
      width: 100%;
      padding-bottom: 56.25%;
      height: 0;
      border-radius: 14px;
      overflow: hidden;
      box-shadow: 0 4px 16px rgba(46, 62, 36, 0.1);
    }

    .video-embed iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: 0;
    }

    .video-caption {
      text-align: center;
      font-size: 0.82rem;
      color: #AD9846;
      margin-top: 12px;
      font-weight: 500;
    }

    /* CTA Section */
    .cta-section {
      background: #ffffff;
      border-radius: 18px;
      padding: 32px 28px;
      margin: 44px 0 20px;
      text-align: center;
      box-shadow: 0 1px 4px rgba(46, 62, 36, 0.06);
      border: 1px solid rgba(46, 62, 36, 0.06);
    }

    .cta-section .cta-heading {
      font-family: 'The Bloomington', cursive;
      font-size: 2rem;
      font-weight: 400;
      color: #2E3E24;
      margin-bottom: 10px;
    }

    .cta-section p {
      font-size: 0.92rem;
      color: #555549;
      line-height: 1.7;
      margin-bottom: 20px;
    }

    .cta-btn {
      display: inline-block;
      padding: 14px 32px;
      background: #2E3E24;
      color: #FAF8EB;
      text-decoration: none;
      border-radius: 10px;
      font-weight: 600;
      font-size: 0.9rem;
      letter-spacing: 0.01em;
      transition: background 0.15s ease, transform 0.15s ease;
    }

    .cta-btn:hover {
      background: #3a5030;
      transform: translateY(-1px);
    }

    /* Divider */
    .divider {
      width: 40px;
      height: 2px;
      background: #AD9846;
      margin: 44px auto 0;
      border-radius: 1px;
    }

    /* Footer */
    .footer {
      padding: 36px 20px 48px;
      text-align: center;
      font-size: 0.78rem;
      color: #7a7a6e;
    }

    .footer a {
      color: #AD9846;
      text-decoration: none;
    }

    .footer a:hover {
      text-decoration: underline;
    }

    /* Responsive */
    @media (max-width: 480px) {
      .nav {
        padding: 14px 16px;
      }

      .nav-logo {
        height: 30px;
      }

      .nav-links {
        gap: 16px;
      }

      .nav-links a {
        font-size: 0.82rem;
      }

      .article-header {
        padding: 24px 16px 52px;
      }

      .article-header h1 {
        font-size: 1.55rem;
      }

      .article-subtitle {
        font-size: 0.88rem;
      }

      .article-container {
        padding: 10px 16px 0;
      }

      .pull-quote {
        padding-left: 18px;
        font-size: 1rem;
      }

      .cta-section {
        padding: 26px 20px;
      }

      .cta-section .cta-heading {
        font-size: 1.7rem;
      }
    }
  </style>
</head>
<body>
<a href="#main-content" class="skip-link" style="position:absolute;left:-9999px;top:auto;width:1px;height:1px;overflow:hidden;z-index:10000;padding:8px 16px;background:#2E3E24;color:#FAF8EB;font-family:Montserrat,sans-serif;font-size:0.9rem;text-decoration:none;border-radius:0 0 8px 0" onfocus="this.style.cssText='position:fixed;left:0;top:0;width:auto;height:auto;overflow:visible;z-index:10000;padding:8px 16px;background:#2E3E24;color:#FAF8EB;font-family:Montserrat,sans-serif;font-size:0.9rem;text-decoration:none;border-radius:0 0 8px 0'" onblur="this.style.cssText='position:absolute;left:-9999px;top:auto;width:1px;height:1px;overflow:hidden'">Skip to content</a>

  <!-- Navigation -->
  <nav class="nav">
    <a href="/">
      <img class="nav-logo" src="../logo-green.webp" alt="Ali Imperiale" height="36">
    </a>
    <ul class="nav-links">
      <li><a href="/">Home</a></li>
      <li><a href="/blog/">Blog</a></li>
    </ul>
  </nav>

  <!-- Article Header -->
  <header class="article-header">
    <p class="article-date">${DISPLAY_DATE}</p>
    <h1>${HTML_TITLE}</h1>
    <p class="article-subtitle">${SUBTITLE}</p>
  </header>

  <!-- Article Content -->
  <main class="article-container" id="main-content">
    <article class="article-body">

      <!-- ============================================ -->
      <!-- WRITE YOUR ARTICLE HERE                      -->
      <!-- Use <p>, <h2>, <h3>, <ul>, <em>, <strong>   -->
      <!-- Use <div class="pull-quote"> for quotes      -->
      <!-- Aim for 600-800 words in Ali's voice:        -->
      <!--   conversational, warm, judgment-free         -->
      <!-- ============================================ -->

      <p>TODO: Write article content here.</p>

    </article>

    <!-- Video Embed -->
    <div class="video-section">
      <div class="video-embed">
        <iframe src="https://www.youtube.com/embed/${VIDEO_ID}" title="${HTML_TITLE}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>
      </div>
      <p class="video-caption">Watch the full video on YouTube</p>
    </div>

    <!-- Email Capture Form -->
    <div id="email-capture-form"
         data-post-slug="${SLUG}"
         data-pdf-url=""
         data-pdf-name="">
    </div>

    <!-- CTA Section -->
    <div class="cta-section">
      <p class="cta-heading">Want more honest chats?</p>
      <p>I post new videos every week about sex, relationships, and all the stuff we're secretly curious about. Subscribe so you don't miss any of it &mdash; and come hang out with me in the comments.</p>
      <a href="https://www.youtube.com/@aliimperiale?sub_confirmation=1" target="_blank" rel="noopener" class="cta-btn">Subscribe on YouTube &rarr;</a>
    </div>

    <div class="divider"></div>
  </main>

  <!-- Footer -->
  <footer class="footer">
    <p>&copy; 2026 Ali Imperiale &middot; <a href="mailto:ali@aliimperiale.com">ali@aliimperiale.com</a></p>
  </footer>

</body>
</html>
HEREDOC

echo "✅ Blog post created: $FILEPATH"

# --- Step 7: Add card to blog/index.html ---
echo ""
echo "Adding card to blog index..."

# Create the new card HTML
CARD_HTML="    <a href=\"${FILENAME}\" class=\"blog-card\">\\
      <img class=\"thumb\" src=\"https://i3.ytimg.com/vi/${VIDEO_ID}/mqdefault.jpg\" alt=\"\" width=\"200\" height=\"134\" loading=\"lazy\">\\
      <div class=\"info\">\\
        <div class=\"card-date\">${DISPLAY_DATE}</div>\\
        <div class=\"card-title\">${HTML_TITLE}</div>\\
        <div class=\"card-excerpt\">${META_DESC}</div>\\
      </div>\\
    </a>\\
"

# Insert at the top of the blog-grid (after the opening div)
sed -i '' "/<div class=\"blog-grid\">/a\\
\\
${CARD_HTML}" "$BLOG_INDEX"

echo "✅ Card added to blog/index.html"

# --- Step 8: Update sitemap.xml ---
echo ""
echo "Updating sitemap.xml..."

# Add new URL entry before </urlset>
NEW_SITEMAP_ENTRY="  <url>\\
    <loc>https://aliimperiale.com/blog/${FILENAME}</loc>\\
    <lastmod>${VIDEO_DATE}</lastmod>\\
    <changefreq>monthly</changefreq>\\
    <priority>0.7</priority>\\
  </url>"

sed -i '' "/<\/urlset>/i\\
${NEW_SITEMAP_ENTRY}" "$SITEMAP"

# Update lastmod for blog index and homepage
TODAY=$(date +%Y-%m-%d)
sed -i '' "s|<loc>https://aliimperiale.com/</loc>|<loc>https://aliimperiale.com/</loc>|" "$SITEMAP"

echo "✅ sitemap.xml updated"

# --- Step 9: Summary ---
echo ""
echo "============================================"
echo "🎉 Done! New blog post scaffolded."
echo ""
echo "File: $FILEPATH"
echo ""
echo "Next steps:"
echo "  1. Edit the article content in $FILENAME"
echo "     (replace the TODO placeholder with ~600-800 words)"
echo "  2. Optionally update the homepage blog preview"
echo "     (if this should be one of the 3 featured posts)"
echo "  3. git add . && git commit && git push"
echo ""
echo "💡 Tip: You can also ask Claude Code to write the"
echo "   article for you based on the YouTube video!"
echo "============================================"
