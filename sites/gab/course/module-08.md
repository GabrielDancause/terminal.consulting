# Module 8 — Going Live with GitHub Pages

This is it. The moment your website goes from "files on a screen" to "live on the internet." And it's going to take you about two minutes.

No hosting company. No server setup. No credit card. Just a few clicks in GitHub's settings, and anyone in the world can visit your site. This is the part that made me fall in love with this whole approach.

## Step 1: Go to Your Repository on GitHub

Open your browser and go to your GitHub repository. It should be at:

```
https://github.com/YOUR-USERNAME/my-bakery-website
```

You should see all your files there from the previous module. If you don't see your files, go back to Module 7 and make sure the push was successful.

## Step 2: Open the Pages Settings

1. Click **Settings** in the top menu bar of your repository (the gear icon, far right)
2. In the left sidebar, scroll down and click **Pages**

This is the GitHub Pages configuration page. This is where the magic happens.


## Step 3: Configure the Source

Under **"Build and deployment"**, you'll see a **Source** dropdown.

1. Select **"Deploy from a branch"**
2. Under **Branch**, select **"main"**
3. Leave the folder as **"/ (root)"**
4. Click **Save**


That's all the configuration you need. GitHub now knows to take the files on your `main` branch and serve them as a website.

## Step 4: Wait for the Build

GitHub needs a minute or two to build and deploy your site. You'll see a message at the top of the Pages settings that says something like "Your site is being deployed."

You can watch the progress by going to the **Actions** tab in your repository. You'll see a workflow running — it's GitHub building your site. When the green checkmark appears, you're live.

Don't refresh frantically. Give it a solid 1-2 minutes. Go grab a coffee or something.

## Step 5: Visit Your Live Site

Once the deployment finishes, go back to **Settings → Pages**. You'll see a green box with your URL:

```
Your site is live at https://YOUR-USERNAME.github.io/my-bakery-website/
```

Click that link.


That's your website. On the internet. Right now. Anyone with that link can see it.

Take a second to appreciate this. You built a website from scratch using AI, pushed it to the cloud, and it's live on the internet. No hosting bill. No monthly subscription. No middleman.

## Troubleshooting

**Site not showing up?**

- Go to the **Actions** tab and check if the build failed (you'll see a red X instead of a green checkmark). Click on it to see what went wrong.
- Make sure your main file is called `index.html` (not `home.html` or `main.html`). GitHub Pages looks for `index.html` as the homepage.
- Make sure you selected the right branch ("main") and folder ("/ root") in the settings.

**Getting a 404 page?**

- Double-check that `index.html` is in the root of your repository, not inside a subfolder.
- Wait a few more minutes — sometimes the first deployment is slow.

**CSS or images not loading?**

- Check your file paths. If your CSS file is at `styles.css`, your HTML should reference `styles.css`, not `/styles.css` (the leading slash can cause issues on project pages).
- Tell Claude: "My CSS and images aren't loading on GitHub Pages. Fix the file paths to work with a project site hosted at /my-bakery-website/"

**Still stuck?**

Tell Claude about the error:

```
My GitHub Pages site is showing a 404. My repo is at github.com/myuser/my-bakery-website. The index.html is in the root. What could be wrong?
```

Claude can help you debug it.

## You Just Did It

Let that sink in. You have a live website on the internet. Free hosting. No BS.

Here's what I want you to do right now: copy that URL and text it to someone. A friend, a business partner, your mom — whoever. Send them the link and say "I just built this."

That URL is yours. It works on any phone, any computer, anywhere in the world. And it'll keep working as long as GitHub exists (they're owned by Microsoft — they're not going anywhere).

In the next module, I'll show you how to connect a custom domain (like `goldencrust.com` instead of the github.io URL) and set up basic SEO so people can actually find you on Google. But even without that — you have a live, professional website right now.

No web developer. No agency. No monthly bill. Just you and Claude Code.
