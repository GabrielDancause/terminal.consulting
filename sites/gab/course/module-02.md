# Module 2 — Setting Up Your Tools

This is the "boring but necessary" module. Setup takes about 20-30 minutes, and you only do it once. After this, you're free to build as many websites as you want. Follow each step in order — don't skip ahead.

## Step 1: Create a GitHub Account

Go to [github.com](https://github.com) and click **Sign up**.


Pick a username. This matters because your free website URL will be `yourusername.github.io`, so pick something professional. If your business is "Golden Crust Bakery," maybe use `goldencrustbakery` instead of `xXbaker_dude_99Xx`.

Enter your email, create a password, and follow the verification steps. GitHub will ask you a few questions about what you're using it for — you can skip most of those.


Once you're in, you'll see your GitHub dashboard. Don't worry about understanding anything here yet. We'll come back to this later.

## Step 2: Install Git

Git is the tool that lets your computer talk to GitHub. Think of it as the delivery truck that moves your website files from your computer to the internet.

### On Mac

Good news — Git is probably already on your Mac. But let's make sure. Open your **Terminal** app (press `Cmd + Space`, type "Terminal", hit Enter).


In the terminal, type this and press Enter:

```
git --version
```

If you see something like `git version 2.39.0`, you're good. Move to Step 3.

If you get a popup asking you to install "command line developer tools," click **Install**. This takes a few minutes. If nothing happens and you get an error, type this:

```
xcode-select --install
```

That will trigger the same installation. Wait for it to finish, then try `git --version` again.

### On Windows

Go to [git-scm.com](https://git-scm.com) and download the installer.


Run the installer. **Use all the default settings** — just keep clicking Next. Don't change anything unless you know what you're doing. The defaults are fine.

Once it's installed, open **Command Prompt** (press the Windows key, type "cmd", hit Enter) and type:

```
git --version
```

You should see a version number. If you do, you're good.

## Step 3: Install Node.js

Node.js is what lets you run Claude Code. You don't need to know what Node.js does — just install it.

Go to [nodejs.org](https://nodejs.org).


Download the **LTS** version (the one on the left — it says "Recommended For Most Users"). LTS stands for Long Term Support, meaning it's the stable, reliable version. Don't grab the "Current" version.

Run the installer. Again, **default settings for everything.** Just click through it.

When it's done, go back to your terminal and type:

```
node --version
```

You should see something like `v22.x.x`. Then type:

```
npm --version
```

You should see a version number here too. `npm` is the tool that comes with Node.js — it's what you'll use to install Claude Code in the next step.

If either of those commands don't work, close your terminal completely and open a new one. Sometimes the terminal needs a restart to pick up new installations.

## Step 4: Install Claude Code

Now the good stuff. In your terminal, type:

```
npm install -g @anthropic-ai/claude-code
```


The `-g` means "install this globally" — so you can use it from anywhere on your computer. This might take a minute. You'll see a bunch of text scrolling by. That's normal.

If you get a **permission error** on Mac, try:

```
sudo npm install -g @anthropic-ai/claude-code
```

It'll ask for your computer password (the one you use to log in). Type it — you won't see the characters appear, that's normal — and press Enter.

On Windows, if you get permission issues, close Command Prompt and reopen it by right-clicking and selecting **Run as administrator**.

Once it's done, verify it worked:

```
claude --version
```

You should see a version number. If you do, Claude Code is installed.

## Step 5: Open Your Terminal

If you haven't already, here's how to find your terminal:

### Mac
Press `Cmd + Space` to open Spotlight, type **Terminal**, press Enter. That's it. You'll use this app a lot, so you might want to keep it in your Dock — just right-click its icon in the Dock while it's open and select "Options > Keep in Dock."

### Windows
Press the **Windows key**, type **cmd** or **PowerShell**, press Enter. I recommend PowerShell — it's a bit more modern. Either works for what we're doing.


This black (or white) window is your terminal. It's where you'll type commands and talk to Claude Code. I know it looks intimidating if you've never used it. It's not. You need exactly three commands, and I'll teach you those in a minute.

## Step 6: Run Claude Code for the First Time

In your terminal, type:

```
claude
```

The first time you run it, Claude Code will ask you to authenticate. It'll open a browser window where you log in to your Anthropic account.


If you don't have an Anthropic account yet, create one at [console.anthropic.com](https://console.anthropic.com). You'll need to add a payment method for API usage — this is what powers Claude Code. The cost for building a website is minimal (we're talking a few dollars at most).

Follow the authentication steps. Once you're connected, you'll see Claude Code's prompt in your terminal — it looks something like:

```
claude >
```

That means it's ready. You can type things to it and it'll respond. Try it:

```
Say hello and tell me a fun fact about websites
```

If Claude responds, everything is working. Type `/exit` to quit Claude Code for now.

## Step 7: Verify Everything Works

Let's do a final check. Run these commands one by one:

```
git --version
```
```
node --version
```
```
npm --version
```
```
claude --version
```


If all four commands show version numbers, you're fully set up. If any of them fail, check the troubleshooting section below.

## Terminal Basics — The Only 3 Commands You Need

You don't need to become a terminal expert. You need three commands:

### `ls` — List what's here
Type `ls` and press Enter. It shows you all the files and folders in your current location. On Windows, use `dir` instead.

```
ls
```

### `cd` — Change directory (move to a folder)
Type `cd` followed by a folder name to move into that folder.

```
cd Documents
```

To go back up one level:

```
cd ..
```

To go to a specific folder directly:

```
cd ~/Desktop/my-website
```

### `mkdir` — Make a new folder
Type `mkdir` followed by the folder name you want to create.

```
mkdir my-website
```

That's it. `ls` to look around, `cd` to move, `mkdir` to create a folder. You now know enough terminal to build websites.

## Troubleshooting Common Issues

**"command not found: node"** or **"command not found: npm"**
Close your terminal and reopen it. If that doesn't work, reinstall Node.js from nodejs.org and make sure you go through the full installer.

**"EACCES: permission denied" when installing Claude Code**
On Mac, add `sudo` before the command. On Windows, run your terminal as administrator.

**"command not found: claude"**
The npm global install path might not be in your system PATH. Try closing and reopening terminal. If that doesn't help, on Mac run `npm config get prefix` — it'll show you something like `/usr/local`. Make sure `/usr/local/bin` is in your PATH.

**Git authentication issues**
When you first push to GitHub (we'll do this later), it might ask you to authenticate. GitHub now uses Personal Access Tokens instead of passwords. We'll handle this when we get to the deployment module.

**It all feels overwhelming**
That's normal. Every single person who's ever used a terminal for the first time felt the same way. I did too. The setup is the hardest part of this whole course, and you're almost through it. The building part is genuinely fun.

You're set up. Let's build something.
