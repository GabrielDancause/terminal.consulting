# Module 5 — Adding Pages & Navigation

A one-page site works for some businesses, but most of the time you need more. An About page tells your story. A Contact page makes it easy for people to reach you. Maybe you need a Services page, a Gallery, or a Menu page. Let's add them.

## Why Multi-Page?

Think about the last time you checked out a business online. You probably clicked around — looked at the About page to see if they seemed legit, checked the Contact page for hours and location, maybe browsed their services. A single page that tries to cram everything in gets long and overwhelming.

Separate pages let you:
- Keep things organized and easy to find
- Give each topic room to breathe
- Look more professional and established
- Rank better in search engines (each page can target different keywords)

For the bakery example, we'll add two pages: About and Contact. The process is the same whether you're adding 2 pages or 20.

## Creating the About Page

Go back to Claude Code (type `claude` in your terminal while in your project folder) and give it this prompt:

```
Create an about.html page that matches the exact same design style as index.html — same fonts, colors, header, and footer. The page should have: a hero banner with the title "Our Story", a section about the bakery's history (founded in 1987 by Marie and Pierre Gagnon, started as a small family kitchen, grew into a neighborhood institution, still uses original recipes), a team section with 3 team members (Marie - Head Baker, Pierre - Pastry Chef, Sophie - Front of House) each with a placeholder image and short bio, and a "Our Values" section with 3 values (Fresh Daily, Local Ingredients, Family Recipes) each with an icon and description.
```


Claude will create `about.html` and it'll automatically use the same `styles.css` file, so the design will be consistent. If it creates a separate CSS file, tell it:

```
Make about.html use the same styles.css file as index.html. Don't create a separate stylesheet.
```

## Creating the Contact Page

Same process:

```
Create a contact.html page matching the same design as index.html. Include: a hero banner with the title "Get In Touch", a contact form with fields for name, email, phone (optional), and message with a submit button, the bakery's address (456 Saint-Laurent Blvd, Montreal, QC H2Y 2Z9) with a Google Maps embed showing that area of Montreal, the phone number (514-555-0123), email (hello@goldencrustbakery.com), business hours displayed in a clean table or list (Mon-Sat 7am-7pm, Sun 8am-5pm), and social media links for Instagram and Facebook.
```


**A note about the contact form:** The form Claude creates will look great, but it won't actually send emails by default — it's just HTML. For it to actually work, you'll need a form service. I'll cover that in a later module when we talk about going live. For now, it looks professional and the design is what matters.

## Adding Navigation to All Pages

Right now you have three pages but no way to get between them. Let's fix that:

```
Add a navigation bar to the top of all three pages (index.html, about.html, contact.html) with links to Home, About, and Contact. The nav should: have the bakery logo/name on the left and the links on the right, highlight the current page's link so users know where they are, be sticky (stay at the top when scrolling), collapse to a hamburger menu on mobile, and look exactly the same on all three pages.
```


This is one of the things Claude handles really well. It'll update all three files at once to add the same navigation, and it'll set the "active" state correctly on each page.

After Claude makes the changes, open each page in your browser and click through all the links. Make sure:

- Clicking "Home" goes to `index.html`
- Clicking "About" goes to `about.html`
- Clicking "Contact" goes to `contact.html`
- The current page is highlighted in the nav
- The nav looks the same on all three pages

If a link is broken, tell Claude:

```
The About link in the navigation isn't working. It should link to about.html. Fix it on all pages.
```

## Keeping the Design Consistent

The biggest risk with multi-page sites is pages that look slightly different — different spacing, slightly off colors, inconsistent fonts. Here's how to avoid that:

**Use one stylesheet.** All your pages should link to the same `styles.css`. If Claude creates separate stylesheets for each page, tell it to consolidate:

```
Merge all CSS into a single styles.css file and make all HTML pages reference it. Remove any duplicate or page-specific stylesheets.
```

**Copy the structure.** When you ask for a new page, always say "match the same design as index.html." This tells Claude to reuse the same patterns.

**Check side by side.** Open all your pages in different browser tabs and click through them. Do the headers line up? Is the spacing the same? Do the fonts match? If anything feels off:

```
The padding on the about.html sections doesn't match index.html. Make all section padding consistent across all pages — use 80px top and bottom on desktop.
```

## Adding a Footer to All Pages

A good footer ties the whole site together. It appears on every page and gives people quick access to important info:

```
Add a footer to all pages (index.html, about.html, contact.html) with: the bakery name and a one-line tagline, quick links to all pages (Home, About, Contact), the address, phone number, and email, social media icons linking to Instagram and Facebook (use # as placeholder links for now), a copyright line that says "2025 Golden Crust Bakery. All rights reserved.", and a small "back to top" arrow button. Use a dark background for the footer with light text.
```


Claude will update all three files. Check each page to make sure the footer appears and looks the same everywhere.

## Your File Structure at This Point

Let's take a look at what you've built. In your terminal (outside of Claude Code), type `ls`:

```
my-website/
  index.html
  about.html
  contact.html
  styles.css
  images/
    hero.jpg
    about.jpg
    croissant.jpg
    sourdough.jpg
    baguette.jpg
    eclair.jpg
    tart.jpg
    cake.jpg
```


That's your entire website. A few HTML files, one CSS file, and your images. Clean and simple. No database, no server, no framework, no 500MB of node_modules. Just files that a browser can read.

## Preview Everything

Before we move on, do a full review of your site:

1. **Open index.html** in your browser. Click every link. Scroll through the whole page.
2. **Open about.html.** Check that the design matches. Click the nav links.
3. **Open contact.html.** Try filling out the form (it won't send, but make sure the fields work). Check the map loads.
4. **Resize your browser** to phone-width and go through all three pages again. Check that:
   - The hamburger menu works
   - Text is readable without zooming
   - Images resize properly
   - Nothing overlaps or gets cut off


If you find issues, you know the drill — describe the problem to Claude and let it fix it.

```
On mobile, the team member cards on the about page are overlapping. Make them stack in a single column with 20px gap between them.
```

```
The Google Maps embed on the contact page is too tall on mobile. Limit its height to 250px on screens smaller than 768px.
```

## Adding More Pages (If You Need Them)

The process is identical for any additional pages. Here are some common ones:

**Services/Menu page:**
```
Create a services.html page matching the design of index.html. Include a detailed menu with categories (Breads, Pastries, Cakes, Drinks) — each category as a section with items listed as cards. Add it to the navigation on all pages.
```

**Gallery page:**
```
Create a gallery.html page with a masonry-style image gallery. Use all images from the images folder. Add a lightbox effect so clicking an image opens it larger. Add it to the navigation on all pages.
```

**FAQ page:**
```
Create an faq.html page with an accordion-style FAQ section — clicking a question reveals the answer. Include 8 common questions about the bakery (ordering, delivery, allergens, etc). Add it to the navigation on all pages.
```

Every time you add a page, remember to tell Claude to update the navigation on all existing pages too. The prompt "Add it to the navigation on all pages" at the end handles this.

## What You've Accomplished

Take a second to appreciate what you've done. You have a multi-page, professionally designed, mobile-responsive website. You built it by describing what you wanted in plain English. No code written by you, no templates, no drag-and-drop frustration.

In the next module, we'll put this thing on the internet for the world to see — for free.
