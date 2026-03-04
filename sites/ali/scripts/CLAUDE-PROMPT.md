# How to Generate a New Blog Post with Claude Code

## Quick Workflow

When Ali publishes a new YouTube video, follow these steps:

### Option A: Fully Automated (Recommended)
Just tell Claude Code:

```
Ali published a new YouTube video. Check the RSS feed, create a blog post for any new videos that don't have posts yet, and deploy.
```

Claude will:
1. Fetch the RSS feed from `https://www.youtube.com/feeds/videos.xml?channel_id=UC8CSKrb0Pp2HNp5Ri6zSC1Q`
2. Compare against existing blog posts in `/blog/`
3. Create the HTML file using the established template
4. Write a 600-800 word article in Ali's voice
5. Add a card to `blog/index.html`
6. Update `sitemap.xml`
7. Update the homepage blog preview if needed
8. Commit and push to deploy

### Option B: Step by Step
1. Run `./scripts/new-post.sh` to scaffold the HTML template
2. Tell Claude Code: "Write the article content for blog/[filename].html based on the YouTube video"
3. Review and commit

## Writing Style Guide for Ali's Blog Posts

- **Voice**: Conversational, warm, relatable, judgment-free
- **Tone**: Like talking to a friend over wine — honest, playful, sometimes vulnerable
- **Length**: 600-800 words per post
- **Structure**:
  - Opening hook that connects to a universal experience
  - 3-5 sections with h2 headings
  - 1 pull quote (use `<div class="pull-quote">`)
  - Closing that invites engagement / points to the video
- **Ali's phrases**: "Let's talk about it", "No judgment here", "Here's the thing", "I get asked about this all the time"
- **Never**: preachy, clinical, or shaming
- **Always**: inclusive, sex-positive, educational but approachable

## Template Reference

Blog posts use the same template as existing posts (see any file in `/blog/`).
Key elements: brand fonts (Bloomington, New Standard, Montserrat), brand colors (#2E3E24, #FAF8EB, #AD9846, #422626, #C6C8BB), embedded YouTube video, CTA to subscribe.

## Files to Update for Each New Post

1. `blog/[slug].html` — The new blog post
2. `blog/index.html` — Add card at top of `.blog-grid`
3. `sitemap.xml` — Add new `<url>` entry
4. `index.html` — Optionally update the 3 blog preview cards (newest posts)
