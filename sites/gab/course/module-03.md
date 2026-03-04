# Module 3 — Your First Prompt: Building the Homepage

This is where it gets fun. You're about to go from a blank folder to a full website in about five minutes. I still remember the first time I did this — I literally said "no way" out loud when I saw the result. Let's go.

## Create Your Project Folder

Open your terminal. Navigate to wherever you want to keep your project. I like using the Desktop because it's easy to find, but anywhere works.

```
mkdir my-website && cd my-website
```

That creates a folder called `my-website` and moves you inside it. If you type `ls` right now, you'll see nothing — it's an empty folder. Not for long.

## Launch Claude Code

Type:

```
claude
```


You should see the Claude Code prompt. You're now talking directly to an AI that can write code and create files for you, right in this folder. Whatever files it creates will show up in your `my-website` folder.

## The Golden Prompt

Here's the thing about Claude Code — the better you describe what you want, the better the result. But you don't need to write an essay. You need to be **specific about the things that matter** and let Claude handle the rest.

Here's what a great first prompt includes:

1. **What kind of business** (bakery, hotel, consulting firm, gym, etc.)
2. **The business name and location**
3. **What sections you want** (hero, about, services, testimonials, contact)
4. **Color preferences** (even vague ones like "warm" or "modern and dark" help)
5. **That it should be mobile-responsive**
6. **What files to create**

Let me show you with an example. Say you're building a site for a bakery called "Golden Crust Bakery" in Montreal. Here's the prompt:

```
Build me a professional one-page website for a bakery called "Golden Crust Bakery" in Montreal. It should have: a hero section with a big headline and a short tagline, an about section telling the bakery's story, a menu section showcasing 6 items with names, descriptions, and prices, a testimonials section with 3 customer reviews, and a contact section with the address (456 Saint-Laurent Blvd, Montreal), phone number (514-555-0123), and business hours (Mon-Sat 7am-7pm, Sun 8am-5pm). Use a warm color scheme — think cream backgrounds, golden accents, and dark brown text. Make it mobile-responsive. Use modern, clean typography. Create index.html and styles.css files.
```

Type that into Claude Code (or adapt it to your own business) and press Enter.


## What Claude Generates

Claude Code will start working. You'll see it creating files — usually `index.html` and `styles.css`. It might take 30 seconds to a minute. When it's done, you'll have a complete website in your folder.

Let's look at what you got. Type `ls` in a new terminal window (or after exiting Claude with `/exit`):

```
index.html
styles.css
```

Two files. That's your entire website. `index.html` is the content and structure. `styles.css` is the design — colors, fonts, spacing, layout.

## Preview Your Site

Now let's see what it looks like. You have two options:

### Option A: Just Open the File (Easiest)

On Mac:
```
open index.html
```

On Windows:
```
start index.html
```

This opens your website in your default browser. That's it. You're looking at your website.


### Option B: Use a Local Server (Better)

If Option A works fine, skip this. But if things look weird (images not loading, for example), you can run a quick local server:

```
npx serve
```

It'll give you a URL like `http://localhost:3000`. Open that in your browser. This simulates how your site will actually work when it's live.

## How to Iterate

Here's where the real power is. Your first result will be good, maybe even great. But you'll want to tweak things. That's the process: **prompt, preview, adjust, repeat.**

Go back to Claude Code (type `claude` if you exited) and start making requests:

### Make something bigger or smaller
```
Make the hero section taller — it should take up the full viewport height. Make the main headline bigger, around 4rem.
```

### Change colors
```
The gold accent color is too bright. Make it more of a muted, warm gold. Something like #C9A96E.
```

### Change text
```
Change the about section text to: "Golden Crust Bakery has been serving Montreal since 1987. What started as a small family operation has grown into a neighborhood staple, but our commitment to handmade, fresh-baked goods hasn't changed."
```

### Add animations
```
Add a subtle fade-in animation to each section as the user scrolls down the page.
```

### Fix something that looks off
```
On mobile, the menu items are overlapping. Fix the spacing so each item has proper margin between them.
```


Every time you make a change, save and refresh your browser (or it might refresh automatically with `npx serve`). Check if you like it. If not, tell Claude what to adjust.

## The Iteration Loop

This is how I build every single website:

1. **Prompt** — Tell Claude what you want
2. **Preview** — Open the site in your browser
3. **Look at it on your phone** — Resize the browser window to check mobile (or actually open it on your phone if you're using `npx serve` and you're on the same Wi-Fi)
4. **Adjust** — Tell Claude what to change
5. **Repeat** — Until you're happy

I usually go through 10-20 iterations before I'm satisfied. That's normal. The whole point is that each iteration takes seconds, not hours.

## Tips for Writing Good Prompts

After building a bunch of sites, here are the things I've learned about getting good results:

**Be specific about what you see, not what you want technically.**
- Bad: "Add a CSS grid with 3 columns and gap of 2rem"
- Good: "Make the menu items display in a 3-column grid with space between them"

You don't need to know CSS terminology. Describe what you want visually, like you're talking to a human designer.

**Reference real websites you like.**
```
I want the hero section to feel like the Apple homepage — big, clean, lots of white space, one strong headline centered on the page.
```

Claude knows what popular websites look like. Use that.

**Give context about your brand.**
```
This is a high-end bakery, not a casual corner shop. The design should feel elegant and upscale — think dark backgrounds, serif fonts, minimal layout.
```

The more Claude understands the vibe, the better the result.

**One change at a time.**
When you're iterating, don't ask for 10 changes at once. Ask for one or two. Check the result. Then ask for more. It's faster and you catch issues early.

**If something looks broken, describe what's wrong.**
```
The testimonial cards are overlapping on mobile. They should stack vertically with space between them.
```

Don't try to diagnose the technical problem. Just describe what you see and what you expect.

**Use "like" comparisons.**
```
Make the buttons look like the ones on Stripe's website — rounded corners, solid color, with a subtle hover effect.
```

## What If the First Result Isn't Great?

It happens. Sometimes Claude misunderstands your vision. Here's what to do:

**Start over with a better prompt.** If the whole thing is off, don't try to fix it piece by piece. Delete the files and write a more detailed prompt. Now that you've seen one result, you have a better idea of what to ask for.

```
rm index.html styles.css
```

Then go back to Claude and try again with a refined prompt.

**Use screenshots as reference.** If you see a website you love, describe it in detail:
```
Build a website that looks like this: dark background, white text, sans-serif font, large hero image that covers the full screen, minimal navigation at the top with just the logo on the left and 3 links on the right.
```

**Be patient with yourself.** Your first website won't be perfect, and that's fine. My first one wasn't either. The point is that the iteration cycle is so fast that you can experiment without any risk. Hate it? Delete it and start over. It takes five minutes.

You now have a homepage. Let's make it look exactly the way you want.
