# Module 4 — Customizing the Design

Your homepage exists. It looks decent. Now we're going to make it look *yours*. This module is all about telling Claude Code exactly what to change — colors, fonts, images, layout — until the site matches your vision.

You don't need to know a thing about CSS or design theory. You just need to know what you like.

## Colors

Colors set the whole mood of your site. Here's how to change them:

```
Change the primary color to navy blue (#1B2A4A) and the accent color to coral (#FF6B6B). Keep the background white and use dark gray (#333) for body text.
```


If you don't know hex color codes (those # numbers), don't worry. You can just describe what you want:

```
I want a modern, dark color scheme. Dark charcoal background, white text, and electric blue for buttons and links.
```

Or even simpler:

```
Make the color scheme feel like a luxury hotel — dark, elegant, with gold accents.
```

Claude understands vibes. Use that.

**Tip:** Stick to 3-4 colors max. A primary color, an accent color, a background color, and a text color. More than that and things start looking messy.

## Fonts

Fonts make a bigger difference than most people think. A site with great fonts looks professional. A site with default fonts looks like a school project.

```
Use the font Playfair Display for all headings and Inter for body text. Import them from Google Fonts.
```


Some font combinations I like and have used on my own sites:

- **Elegant/luxury:** Playfair Display (headings) + Lato (body)
- **Modern/clean:** Montserrat (headings) + Open Sans (body)
- **Bold/startup:** Poppins (headings) + Inter (body)
- **Classic/editorial:** Merriweather (headings) + Source Sans Pro (body)
- **Minimal/tech:** Inter for everything

Don't know what to pick? Just tell Claude:

```
Pick a modern, professional font combination that works well for a bakery website. Something warm and inviting but still clean.
```

It'll choose something good. If you don't like it, ask it to try something else.

## Images

This is where your site goes from "nice template" to "this is clearly my business." Real photos of your business, your products, your team — they make all the difference.

### Setting Up Your Images

First, create an images folder. You can do this through Claude Code:

```
Create an images folder in the project.
```

Or in your terminal:

```
mkdir images
```

Now take the photos you want to use and drop them into that `images` folder. Use your file manager (Finder on Mac, File Explorer on Windows) — just drag and drop.


### Telling Claude to Use Your Images

Once your images are in the folder, tell Claude:

```
Use images/hero.jpg as the background image for the hero section. Make it cover the full section with a dark overlay so the white text is readable on top of it.
```

```
In the about section, add images/about.jpg as a side image next to the text, taking up about 40% of the width.
```

```
For each menu item, use the corresponding image from the images folder: images/croissant.jpg, images/sourdough.jpg, images/baguette.jpg, images/eclair.jpg, images/tart.jpg, images/cake.jpg.
```

**Tip on image sizes:** Before you add images, it helps to resize them. Huge photos straight from your phone (4000x3000 pixels, 5MB each) will make your site slow. Aim for:
- Hero/banner images: 1920px wide, under 500KB
- Product/content images: 800px wide, under 200KB

You can resize them for free at [squoosh.app](https://squoosh.app) or just ask Claude:

```
The images in the images folder are too large. Add responsive image handling and make sure they load efficiently. Use proper width and height attributes and add lazy loading to images below the fold.
```

### Using Placeholder Images During Development

If you don't have your photos ready yet, that's fine. You can start with placeholder images and swap them later:

```
Use placeholder images from picsum.photos for now. Use a food-related Unsplash image for the hero section.
```

Just remember to replace them with your real photos before you go live.

## Layout Changes

Layout is how things are arranged on the page. Columns, rows, spacing — that kind of thing.

```
Make the services section a 3-column grid instead of a single-column list. Each card should have an image on top, then the item name, description, and price.
```

```
Change the testimonials to a horizontal slider/carousel instead of stacked cards.
```

```
Put the about section text on the left and the image on the right, side by side. On mobile, stack them vertically with the image on top.
```


Don't overthink layout. Look at websites you admire and describe their layout to Claude. "I want a layout like [website]'s services section" works great.

## Spacing and Sizing

These small tweaks make a big difference in how polished your site feels:

```
Add more padding to each section — at least 80px top and bottom. The content feels too cramped right now.
```

```
Make the main headline bigger — around 56px on desktop, 36px on mobile.
```

```
Add more space between the menu item cards. Right now they feel too close together.
```

```
Make the contact section narrower — the text lines are too long and hard to read. Cap the content width at about 800px and center it.
```

**Tip:** When in doubt, add more white space. Beginners almost always make things too cramped. Generous spacing between sections makes a site look more professional and easier to read.

## Mobile Responsiveness

Your site needs to look good on phones. More than half of web traffic is mobile now. Claude usually handles this well by default, but here are common fixes:

```
Make sure the navigation collapses to a hamburger menu on mobile screens.
```

```
On mobile, the 3-column grid should become a single column.
```

```
The hero text is too big on mobile. Scale it down so it fits without line breaks on a phone screen.
```

**How to check mobile:** Resize your browser window to be narrow (like phone-width) and see how the site responds. Or right-click the page, click "Inspect," and toggle the device toolbar (the phone/tablet icon) to simulate different screen sizes.


## Dark Mode (Bonus)

This is one of those things that takes a developer hours but takes you one prompt:

```
Add a dark mode toggle button in the top-right corner of the navigation. When clicked, the site should switch to a dark background with light text. Remember the user's preference using localStorage so it persists when they come back.
```


Is it necessary? No. Is it cool and makes your site feel more polished? Absolutely. Up to you.

## Common Design Prompts Cheat Sheet

Here are prompts you can copy and modify. I use versions of these on basically every site I build:

**Hero Section:**
```
Make the hero section full-screen height with a background image, dark overlay, and centered white text.
```

**Buttons:**
```
Style all buttons with rounded corners, a solid background color, white text, and a subtle hover effect that darkens the color slightly.
```

**Cards:**
```
Add a subtle box shadow to all cards and a slight lift effect on hover.
```

**Navigation:**
```
Make the navigation bar sticky so it stays at the top when scrolling. Add a slight background blur effect.
```

**Smooth scrolling:**
```
Add smooth scrolling when clicking navigation links that go to sections on the same page.
```

**Section backgrounds:**
```
Alternate section backgrounds between white and a very light gray (#F8F9FA) to visually separate them.
```

**Typography:**
```
Increase the line-height of body text to 1.7 for better readability. Make paragraph text 18px.
```

**Social media icons:**
```
Add social media icons for Instagram, Facebook, and TikTok in the footer. Use simple SVG icons, not images.
```

**Back to top:**
```
Add a floating "back to top" button that appears when the user scrolls down past the hero section.
```

**Loading animation:**
```
Add a subtle fade-in animation to the page when it first loads.
```

**Gradient:**
```
Add a subtle gradient background to the hero section — from dark navy at the top to dark blue at the bottom.
```

**Image gallery:**
```
Create a photo gallery section with a masonry-style grid layout that looks good with images of different aspect ratios.
```

**Google Maps:**
```
Embed a Google Maps iframe showing the business location in the contact section.
```

**Scroll animations:**
```
Add fade-in-up animations to elements as they scroll into view. Keep them subtle — nothing flashy.
```

**Favicon:**
```
Create a simple SVG favicon using the first letter of the business name in the brand's primary color.
```

## When to Stop Tweaking

I'm going to tell you something I wish someone told me earlier: **good enough is good enough.** You can spend forever perfecting pixel spacing and color shades. At some point, you need to ship it.

Here's my rule: if a regular person (not a designer) would look at your site and say "that looks professional," you're done. Your customers care about your products and services. They don't care whether your heading is 48px or 52px.

Get it to 90%. Ship it. You can always come back and tweak later — that's the beauty of this setup. It takes 30 seconds to make a change and push it live.

Now let's add more pages to your site.
