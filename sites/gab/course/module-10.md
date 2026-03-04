# Module 10 — Making Changes & Keeping It Updated

Your site is live. You have a custom domain. People can find you on Google. Now what?

Now you use it. And you change it. Your business isn't static — your website shouldn't be either. New menu items, updated hours, holiday closures, a new team member, a seasonal promotion. This stuff changes all the time.

The good news: updating your site is even easier than building it. Here's the workflow I use for all my business websites.

## The Update Workflow

Every time you want to change something on your site, it's the same five steps. Once you do it twice, it becomes muscle memory.

**1. Open your terminal and navigate to your project folder:**

```
cd ~/my-bakery-website
```

**2. Launch Claude Code:**

```
claude
```

**3. Tell Claude what to change.**

Be specific. Just say it in plain English:

```
Update the opening hours to show we're now open Sundays from 8am to 2pm
```

```
Add a new menu item called "Sourdough Loaf" priced at $8.50 in the breads section
```

```
Change the hero image to images/summer-storefront.jpg
```

```
Add a banner at the top of the homepage that says "Closed Dec 24-26 for the holidays"
```

Claude makes the changes. Preview them in your browser to make sure they look right (`open index.html` on Mac, or just refresh the page if it's already open).

**4. Push the update to GitHub:**

```
git add .
git commit -m "Update hours and add Sunday schedule"
git push
```

**5. Wait 1-2 minutes.** GitHub Pages automatically rebuilds your site. Refresh your live URL and the changes are there.

That's it. Five steps. Takes about three minutes total for most changes.

## Let Claude Handle the Git Part

If you don't want to remember git commands, just tell Claude:

```
Commit these changes with the message "Add sourdough loaf to menu" and push to GitHub
```

Claude runs `git add`, `git commit`, and `git push` for you. Same result, less typing. I do this all the time.

## Adding a Blog or News Section

At some point you might want to post updates — a new seasonal menu, an event you're hosting, a press feature. You don't need WordPress for this.

Tell Claude:

```
Add a blog section to the site. Create a blog listing page at blog.html and a sample blog post. Each post should be its own HTML page. Add a "News" link in the navigation.
```

Claude will set up a simple blog structure. When you want to write a new post:

```
Create a new blog post titled "Our New Summer Menu Is Here" with today's date. Write 2-3 paragraphs about the new seasonal items we're offering. Add it to the blog listing page.
```

You tell Claude what to write, it creates the page and updates the blog index. Push to GitHub, and it's live.

Is this as fancy as WordPress with categories and tags and comments? No. But for a small business posting occasional updates, it's perfect. And it's fast, simple, and doesn't require a database or plugins.

## Adding a Contact Form That Actually Works

Static sites (HTML/CSS) can't process form submissions on their own — there's no server to receive the data. But there's a dead-simple fix: **Formspree**.

Formspree (formspree.io) gives you a free form backend. Their free tier handles up to 50 submissions a month, which is plenty for most small businesses.

1. Go to **formspree.io** and create a free account
2. Create a new form — you'll get an endpoint URL like `https://formspree.io/f/xrgvalqz`
3. Tell Claude:

```
Wire the contact form to use Formspree with the action URL https://formspree.io/f/YOUR-FORM-ID
```

Claude updates your form's HTML to submit to Formspree. When someone fills out the form on your site, you get an email with their message. No server needed, no backend code, nothing to maintain.

Test it by submitting the form yourself after pushing the update. Check your email — the submission should show up.

## Adding Google Analytics

If you want to know how many people visit your site, where they come from, and what pages they look at, add Google Analytics. It's free.

1. Go to **analytics.google.com**
2. Create an account and a property for your website
3. Google gives you a tracking code (starts with `G-`)
4. Tell Claude:

```
Add Google Analytics with tracking ID G-XXXXXXXXXX to all pages
```

Claude adds the tracking script to every page. Push to GitHub. Within 24-48 hours, you'll start seeing visitor data in your Analytics dashboard.

Don't obsess over the numbers. Check it once a week or so. It's useful for knowing if people are actually finding you, and which pages they care about most.

## When to Consider Moving Beyond GitHub Pages

GitHub Pages is excellent for what it does. But there are things it can't do. You might outgrow it if you need:

- **E-commerce** — selling products with a cart and checkout. You'll need Shopify, or a platform like Snipcart that adds a cart to static sites.
- **User accounts** — if people need to log in, you need a backend. GitHub Pages can't do this.
- **A database** — storing data that changes dynamically (reservations, orders, inventory). Static sites don't have databases.
- **Server-side processing** — anything that needs to happen on a server before sending the page to the user.

For most small businesses — bakeries, restaurants, hotels, salons, contractors, freelancers, agencies — a static site on GitHub Pages is more than enough. I run a 60+ room hotel and my websites are all static sites. If your site is mainly about presenting information and letting people contact you, you're good.

If you do outgrow it, everything you've learned still applies. The HTML and CSS Claude wrote for you works anywhere. You can move to Netlify, Vercel, or a traditional host and just upload the same files.

## You Now Have a Skill Most People Pay Thousands For

I mean that literally. Businesses pay $2,000 to $10,000 for a professional website. They pay $200-$500/month for ongoing maintenance. They pay $50-$150/hour for developers to make changes.

You can now:

- Build a professional website from scratch in a couple of hours
- Host it for free
- Update it anytime in minutes
- Add features as you need them

That's a real, valuable skill. Use it.

## What to Build Next

Now that you know how this works, think about what else you could build:

- **A personal portfolio** — show off your work, your projects, your resume
- **A landing page** for a side project or product idea
- **A website for a friend's business** — do it as a favor, or charge for it. You now know how.
- **A simple documentation site** for something you want to teach
- **An event page** — wedding, conference, community gathering

Every new site is the same process: start Claude Code, describe what you want, polish it, push to GitHub, turn on Pages. The more you do it, the faster you get.

## Final Words

Here's what I believe: the best website is the one that's live.

Not the one that's perfectly designed. Not the one with the fanciest animations. Not the one you've been "meaning to get around to" for six months. The one that's actually on the internet, doing its job, right now.

You have that now. A real website, live on the internet, with your name on it.

If something isn't perfect, change it tomorrow. If you want to add something, add it next week. The site is a living thing — it grows with your business. That's the whole point.

You didn't need a computer science degree. You didn't need to hire anyone. You just needed to describe what you wanted and let the tools do the heavy lifting.

Go build something.

— Gab
