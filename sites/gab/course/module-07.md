# Module 7 — Git & GitHub: Pushing Your Site

Alright, your website looks great on your computer. But right now it's just files on your laptop. Nobody else can see it. Time to change that.

This module is about getting your code onto GitHub — which is the step before making it live on the internet. I know "Git" and "GitHub" sound intimidating if you've never used them. They're not. I'll explain exactly what they are and walk you through every step.

## What Is Git?

Git is version control. That's a fancy way of saying it keeps a history of every change you make to your files.

Think of it like Google Docs version history. You know how in Google Docs you can see every edit anyone ever made and go back to an older version? Git does that for your code files. Every time you "commit" (save a snapshot), Git remembers exactly what changed.

Why does this matter? Because if you break something, you can always go back. You'll never lose your work. And when you're making changes to a live website, that safety net is worth everything.

Git lives on your computer. It's already installed if you followed the setup in Module 2.

## What Is GitHub?

GitHub is where your code lives online. If Git is like Google Docs version history, GitHub is like Google Drive — it stores your files in the cloud so they're not just on your laptop.

GitHub is also what we'll use to host your website for free (that's the GitHub Pages part, coming in the next module). For now, we just need to get your files up there.

You should already have a GitHub account from Module 2. If not, go to **github.com** and sign up. It's free.

## Step 1: Initialize Git in Your Project

Open your terminal and navigate to your project folder. If you've been using Claude Code, you're probably already there. If not:

```
cd ~/my-bakery-website
```

Now initialize Git:

```
git init
```

You should see something like:

```
Initialized empty Git repository in /Users/you/my-bakery-website/.git/
```

That's it. Git is now tracking this folder. It created a hidden `.git` folder where it stores all the version history. Don't touch that folder — just let it do its thing.

## Step 2: Create a .gitignore File

There are some files you don't want to upload to GitHub — system files, editor files, stuff like that. A `.gitignore` file tells Git to ignore them.

Tell Claude:

```
Create a .gitignore file for a static website project
```

Claude will create a file that ignores things like `.DS_Store` (Mac junk files), editor settings folders, and other stuff that doesn't belong in your repo. This keeps your GitHub repository clean.

## Step 3: Stage Your Files

"Staging" means telling Git which files you want to include in your next snapshot. To stage everything:

```
git add .
```

The dot means "everything in this folder." This tells Git: "I want to save all of these files in the next commit."

You can check what's staged by running:

```
git status
```

You'll see a list of files in green — those are staged and ready to go. If something's in red, it hasn't been staged yet.

## Step 4: Make Your First Commit

A commit is a snapshot. It saves the current state of all your staged files with a message describing what changed. Your first one:

```
git commit -m "Initial website build"
```

The `-m` flag lets you add a message. Keep commit messages short and descriptive. "Initial website build" is perfect for the first one.

You'll see output showing how many files were committed. Something like:

```
 15 files changed, 847 insertions(+)
 create mode 100644 index.html
 create mode 100644 styles.css
 ...
```

Your code is now saved in Git's history. Even if you delete everything, Git remembers this moment.

## Step 5: Create a Repository on GitHub

Now we need a place on GitHub to put this code.

1. Go to **github.com** and log in
2. Click the **+** button in the top right corner → **New repository**
3. Name it something like `my-bakery-website` (use hyphens, no spaces)
4. Leave the description blank or add a short one
5. Keep it **Public** (required for free GitHub Pages hosting)
6. **Do NOT** check "Add a README file"
7. **Do NOT** add a .gitignore (you already made one)
8. **Do NOT** choose a license
9. Click **Create repository**


After creating it, GitHub shows you a page with setup instructions. You'll see a section called "...or push an existing repository from the command line." That's exactly what we're doing.

## Step 6: Connect Your Local Project to GitHub and Push

Back in your terminal, run these commands. Replace `YOUR-USERNAME` with your actual GitHub username:

```
git remote add origin https://github.com/YOUR-USERNAME/my-bakery-website.git
git branch -M main
git push -u origin main
```

Here's what each command does:

- `git remote add origin` — tells your local Git where the GitHub repository is
- `git branch -M main` — makes sure your branch is called "main" (standard naming)
- `git push -u origin main` — uploads everything to GitHub

The first time you push, GitHub may ask you to authenticate. If you get a login prompt in the terminal or a browser window pops up asking you to authorize, go ahead and log in. This is normal.

You'll see output that ends with something like:

```
To https://github.com/YOUR-USERNAME/my-bakery-website.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

That means it worked.

## Verify It's on GitHub

Go back to your browser. Refresh the GitHub repository page. You should now see all your files listed — `index.html`, `styles.css`, your `images` folder, everything.


That's your code, living in the cloud. If your laptop dies tomorrow, your website is safe.

## Common Errors and How to Fix Them

**"fatal: remote origin already exists"**

You already added a remote. No big deal. Remove it and add again:

```
git remote remove origin
git remote add origin https://github.com/YOUR-USERNAME/my-bakery-website.git
```

**Authentication failed / permission denied**

GitHub stopped supporting password authentication. You need to use a personal access token or set up SSH. The easiest fix:

1. Go to github.com → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate a new token with "repo" scope
3. Use that token as your password when Git asks

Or just use the GitHub CLI (`gh`). If you have it installed, run:

```
gh auth login
```

Follow the prompts. It sets up authentication properly and you won't have to think about it again.

**"error: failed to push some refs"**

This usually means the remote has something your local doesn't (like if you accidentally initialized with a README). Fix it:

```
git pull origin main --allow-unrelated-histories
git push -u origin main
```

## Pro Tip: Let Claude Handle Git

Here's the truth — once you get comfortable with this, you can just tell Claude Code to do the Git stuff for you:

```
Push my code to GitHub
```

```
Commit all my changes with the message "Add menu section" and push to GitHub
```

Claude knows Git. It'll run the right commands. But I wanted you to understand what's happening under the hood first. When something goes wrong (and it will eventually), you'll know what the error means and how to think about it.

Your code is on GitHub. Next step: turning it into a live website. That's Module 8, and it takes about two minutes.
