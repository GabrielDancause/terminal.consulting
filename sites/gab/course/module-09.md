# Module 9 — Custom Domain & SEO

Your site is live. It works. But the URL is `your-username.github.io/my-bakery-website`. That's fine for showing friends, but if this is a real business, you want `goldencrust.com` or `yourbusiness.com`. A custom domain makes you look legit.

The domain costs about $12/year. That's the only cost in this entire setup. Everything else — hosting, SSL certificate, deployment — stays free.

We're also going to set up basic SEO so Google can find you. No black magic, just the fundamentals that actually matter.

## Why Get a Custom Domain

Three reasons:

1. **Professionalism.** `goldencrust.com` vs `jsmith42.github.io/my-bakery-website` — which one do you trust more?
2. **Branding.** People remember short, clean URLs. You can put it on business cards, signs, menus.
3. **It's yours.** If you ever move away from GitHub Pages (unlikely, but still), your domain goes with you. The URL never changes for your customers.

## Where to Buy a Domain

I've used a few registrars. Here's my honest take:

- **Cloudflare Registrar** (cloudflare.com) — my top pick. They charge wholesale prices (no markup) and their DNS is fast. A `.com` is usually around $10-11/year.
- **Namecheap** (namecheap.com) — solid option, been around forever. Good prices, easy to use.
- **Porkbun** (porkbun.com) — cheap, clean interface, no upselling BS.

Avoid GoDaddy. Their prices look good the first year then spike, and they upsell you on everything.

**Step 1:** Go to your chosen registrar, search for your domain, and buy it. Pick a `.com` if it's available. If not, `.ca`, `.co`, or `.shop` work fine depending on your business. The registration process is straightforward — pick your domain, pay, done.

## Connecting Your Domain to GitHub Pages

Now we link your new domain to your GitHub Pages site. There are two sides to this: telling GitHub about your domain, and telling your domain where to point.

### Step 2: Tell GitHub About Your Domain

1. Go to your GitHub repository
2. Click **Settings** → **Pages**
3. Under **"Custom domain"**, type your domain (e.g., `goldencrust.com`)
4. Click **Save**

GitHub will automatically create a file called `CNAME` in your repository with your domain name in it. You might see a warning that says "DNS check in progress" — that's normal. We haven't set up the DNS yet.

### Step 3: Set Up DNS at Your Registrar

Now go to your domain registrar's website and find the **DNS settings** for your domain. This is usually under "DNS Management," "DNS Records," or "Advanced DNS."

You need to add these records:

**A Records** — these point your domain to GitHub's servers. Add four of them:

| Type | Name | Value |
|------|------|-------|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |

The `@` means "the root domain" (e.g., `goldencrust.com` without any prefix).

**CNAME Record** — this makes the `www` version work too:

| Type | Name | Value |
|------|------|-------|
| CNAME | www | YOUR-USERNAME.github.io |

Replace `YOUR-USERNAME` with your actual GitHub username. Don't include the repository name here — just `username.github.io`.


**Tip:** If there are existing A records or CNAME records for `@` or `www`, delete them first. You don't want conflicting records.

### Step 4: Wait for DNS Propagation

DNS changes don't happen instantly. The internet needs time to spread the word about where your domain now points. This can take anywhere from 5 minutes to 24 hours. Usually it's under an hour.

You can check if it's working by just visiting your domain in the browser. If you see your site — you're done. If you see a "can't reach this site" error, give it more time.

To check propagation status, you can use **dnschecker.org** — type in your domain and see if the records have updated globally.

### Step 5: Enable HTTPS

Once DNS has propagated (you'll see a green checkmark next to your custom domain in GitHub Pages settings), do this:

1. Go back to **Settings → Pages** in your GitHub repository
2. Check the box that says **"Enforce HTTPS"**

If the checkbox is greyed out, DNS hasn't fully propagated yet. Wait a bit and try again.

HTTPS gives you the lock icon in the browser. It means your site is secure. GitHub provides the SSL certificate for free — you don't have to do anything except check that box.

Your site is now live at `https://goldencrust.com`. Professional URL, secure connection, free hosting. Not bad for $12/year.

## SEO Basics: Getting Found on Google

SEO (Search Engine Optimization) sounds complex. Agencies charge thousands for it. But for a small business website, the basics take 10 minutes and Claude does the work.

### Meta Tags

Tell Claude:

```
Add proper meta title and description tags to all pages. The bakery is called Golden Crust Bakery, located in Montreal. Use relevant keywords naturally.
```

Claude will add `<title>` tags and `<meta name="description">` tags to each page. These are what show up in Google search results — the blue link text and the description underneath.

### Open Graph Tags

You already set up the OG image in Module 6. Make sure all pages have the full set:

```
Add Open Graph tags for social media sharing to all pages, including og:title, og:description, og:image, and og:url
```

### Robots.txt

```
Add a robots.txt file that allows all search engines to crawl the site
```

This file tells search engine bots they're welcome to index your site. Without it, they'll still probably crawl you, but it's good practice.

### Sitemap

```
Create a sitemap.xml file that lists all pages on the site
```

A sitemap is like a table of contents for Google. It tells search engines exactly what pages exist and helps them index your site faster.

### Structured Data (JSON-LD)

This is the one most people skip, but it's incredibly powerful for local businesses:

```
Add structured data using JSON-LD for a local business. Include the business name, address, phone number, opening hours, and type of business. The bakery is at 123 Rue Saint-Laurent, Montreal, QC, open Monday to Saturday 7am to 6pm, phone 514-555-0123
```

Structured data helps Google understand your business and can get you those nice rich results in search — with your hours, phone number, and address showing right in the search results.

### Submit to Google Search Console

Last step: tell Google your site exists.

1. Go to **search.google.com/search-console**
2. Click **Add Property**
3. Choose **URL prefix** and enter your domain (e.g., `https://goldencrust.com`)
4. Verify ownership — Google gives you a few options. The easiest is downloading an HTML verification file and adding it to your repo, or adding a DNS TXT record
5. Once verified, go to **Sitemaps** in the left sidebar
6. Submit your sitemap URL: `https://goldencrust.com/sitemap.xml`

Google will start crawling and indexing your site within a few days. It won't be on page one of Google instantly — that takes time and depends on many factors. But you've laid all the right groundwork.

## What You've Got Now

Let's take stock. You now have:

- A professional website built with AI
- Free hosting on GitHub Pages
- A custom domain with SSL (the lock icon)
- Proper SEO meta tags, structured data, and a sitemap
- Social sharing previews that look great

Total monthly cost: $0. Total annual cost: about $12 for the domain.

Compare that to the $180-$540/year people pay for Squarespace or Wix, or the $2,000+ they pay a developer. You did this yourself.

Next up: how to make changes and keep your site updated going forward. Because a website isn't something you build once and forget about — it should grow with your business.
