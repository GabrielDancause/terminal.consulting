# Module 6 — Images, Favicons & Polish

Your site works. It looks decent. Now we're going to make it look *professional*. This is where we add images, get a favicon (that little icon in the browser tab), and do the final polish that makes the difference between "some website" and "wow, that looks legit."

This is also where a lot of people waste hours tweaking things that don't matter. I'll tell you when to stop.

## Optimizing Images Before You Add Them

First rule: don't upload giant images straight from your phone. Your iPhone takes 4MB photos. Nobody needs to download a 4MB image to see a picture of your storefront. It makes your site slow, and slow sites lose visitors.

Here's my rule of thumb:

- **Photos** (food, your shop, people): Use `.jpg` format. Keep each image under **500KB**. Aim for 300KB or less.
- **Logos and icons**: Use `.png` format (supports transparency) or `.svg` (scales perfectly at any size).
- **Dimensions**: Most images on a website don't need to be wider than 1200-1600 pixels. That hero image on your homepage? 1600px wide is plenty. A thumbnail? 400px is fine.

How to compress images for free:

- **TinyPNG** (tinypng.com) — drag and drop, it compresses your images. Works for JPG too despite the name.
- **Squoosh** (squoosh.app) — Google's free tool. More control over quality settings.
- **On Mac**: Preview can resize and export images. Open the image, go to Tools → Adjust Size.

Compress first, then add to your project. Every time. No exceptions.

## Where to Get Images

If you have your own photos, use them. Real photos of your actual business beat stock photos every time. Even imperfect phone photos feel more authentic.

If you need stock photos:

- **Unsplash** (unsplash.com) — free, high quality, no attribution required
- **Pexels** (pexels.com) — same deal, free and no attribution

Download what you need, compress them, and drop them into an `images` folder in your project.

To create the folder and organize your images, tell Claude:

```
Create an images folder in my project and organize my image files into it
```

## Adding Images with Claude

Once your images are in the `images` folder, you just tell Claude where to use them. Be specific:

```
Add my logo at images/logo.png to the navigation bar, sized so it's about 40px tall
```

```
Use images/hero.jpg as a full-width hero background image on the homepage with a dark overlay so the white text is readable
```

```
Add images/bread-sourdough.jpg, images/bread-rye.jpg, and images/bread-wheat.jpg to the menu section as product photos in a 3-column grid
```

Claude handles the HTML and CSS — the sizing, the responsive behavior, all of it. Just describe what you want and where you want it.

**Tip:** If an image looks stretched or cropped weirdly, tell Claude:

```
The bread photos look stretched. Make them maintain their aspect ratio and crop to fill the card area evenly
```

It'll use CSS `object-fit: cover` or similar techniques. You don't need to know the technical details. Just describe the problem.

## Creating a Favicon

A favicon is that tiny icon that shows up in the browser tab next to your page title. Without one, you get a generic blank icon. It looks unfinished.

The easiest approach — ask Claude to make you one:

```
Create a favicon for the site using the first letter of the bakery name in a circle with the primary brand color
```

Claude will generate an SVG favicon and add the right HTML to your pages. SVG favicons are great because they scale perfectly and you don't need multiple sizes.

If you want something fancier, use **favicon.io** — you can generate favicons from text, an image, or an emoji. Download the package it gives you, drop the files in your project root, and tell Claude:

```
Add the favicon files I downloaded to the site. The files are favicon.ico, favicon-16x16.png, favicon-32x32.png, and apple-touch-icon.png in the root directory
```


## Open Graph Images for Social Sharing

When someone shares your link on Facebook, iMessage, LinkedIn, or Slack, it shows a preview card with an image and description. Without an Open Graph image, it either shows nothing or grabs some random image from your site. Not great.

Tell Claude:

```
Create an og-image that shows the bakery name and tagline, sized 1200x630, and add the Open Graph meta tags to all pages
```

Claude will create an image (usually as an SVG or HTML that you can screenshot) and add the proper `<meta>` tags. Now when someone shares your link, it looks intentional and professional.

## Final Polish Prompts

Here's my go-to list of polish prompts. Run through these one at a time:

```
Add smooth scroll behavior to all anchor links
```

This makes it so clicking a navigation link scrolls smoothly to the section instead of jumping instantly.

```
Add subtle fade-in animations as sections come into view when scrolling
```

Sections gently appear as you scroll down. Don't overdo it — subtle is the key word here. If Claude goes too far, say "make the animations more subtle and faster."

```
Make sure all images have descriptive alt text for accessibility
```

Alt text is important. It helps visually impaired users, and it's good for SEO. Claude will add meaningful descriptions to every image.

```
Add a loading state for the page so there's no flash of unstyled content
```

This prevents that ugly moment where the page loads text before the fonts and styles are ready.

## Checking Your Site on Mobile

Your site needs to look good on phones. Here's how to check without owning every device:

1. Open your site in Chrome
2. Right-click anywhere → **Inspect** (or press `Cmd+Option+I` on Mac, `Ctrl+Shift+I` on Windows)
3. Click the little phone/tablet icon in the top-left of the dev tools panel
4. Choose different devices from the dropdown: iPhone SE, iPhone 14, iPad, Galaxy S8, whatever


Scroll through the whole site in a few different phone sizes. If something looks off:

```
On mobile, the menu items overlap the logo. Fix the mobile navigation so everything fits
```

```
The hero text is too big on small phones. Make it smaller on screens under 400px wide
```

Be specific about what's wrong. Claude will fix it.

## The "Good Enough" Checkpoint

Here's something I learned the hard way: you can polish forever. There is always one more thing to tweak. One more animation. One more font pairing to try.

Stop when you hit these marks:

- The site loads fast and looks clean
- It works on mobile
- All the information is correct
- You have a favicon
- Images are optimized

That's it. Ship it. A live website that's 90% perfect is infinitely better than a perfect website that's still on your laptop.

You can always come back and polish more later. But first, let's get this thing live on the internet. That's the next module.
