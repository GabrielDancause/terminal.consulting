# Terminal Consulting — Monorepo Migration Plan

## Goal
Consolidate all client sites into the terminal.consulting monorepo, make it private, and deploy via Cloudflare Pages.

---

## Current State

| Site | Repo | Visibility | Type |
|------|------|-----------|------|
| terminal.consulting | `terminal.consulting` | Public | Static (GitHub Pages) |
| gab.ae | `gab` | Public | Static (GitHub Pages) |
| aliimperiale.com | `aliimperiale` | Public | Static (GitHub Pages) |
| aubergedenosaieux.com | `aubergedenosaieux.com` | Public | Static (GitHub Pages) |

## Target State

One private monorepo (`terminal.consulting`) with this structure:

```
terminal.consulting/
├── sites/
│   ├── terminal/          ← terminal.consulting site
│   │   ├── index.html
│   │   ├── terminal.js
│   │   └── styles.css
│   ├── gab/               ← gab.ae site
│   │   ├── index.html
│   │   ├── blog/
│   │   ├── course/
│   │   └── ...
│   ├── ali/               ← aliimperiale.com site
│   │   ├── index.html
│   │   ├── blog/
│   │   ├── newsletter.html
│   │   └── ...
│   └── auberge/           ← aubergedenosaieux.com site
│       ├── index.html
│       ├── chambres.html
│       ├── en/
│       └── ...
├── .github/
│   └── workflows/
├── PLAN.md
├── CNAME (remove — no longer needed with Cloudflare)
└── ...
```

---

## Steps

### Phase 1: Restructure the monorepo

1. **Move terminal.consulting files into `sites/terminal/`**
   - Move `index.html`, `terminal.js`, `styles.css` into `sites/terminal/`
   - Remove `CNAME` (Cloudflare will handle the domain)

2. **Clone and import `gab` repo into `sites/gab/`**
   - Clone `GabrielDancause/gab`
   - Copy all files (except `.git/`) into `sites/gab/`
   - Remove its `CNAME` file

3. **Clone and import `aliimperiale` repo into `sites/ali/`**
   - Clone `GabrielDancause/aliimperiale`
   - Copy all files (except `.git/`) into `sites/ali/`
   - Remove its `CNAME` file

4. **Clone and import `aubergedenosaieux.com` repo into `sites/auberge/`**
   - Clone `GabrielDancause/aubergedenosaieux.com`
   - Copy all files (except `.git/`) into `sites/auberge/`

5. **Commit the restructured monorepo**

### Phase 2: Set up Cloudflare Pages

6. **Log into Cloudflare dashboard** (via browser remote control)
   - Connect Cloudflare Pages to the `terminal.consulting` GitHub repo

7. **Create 4 Cloudflare Pages projects:**
   - `terminal-consulting` → build directory: `sites/terminal` → custom domain: `terminal.consulting`
   - `gab-ae` → build directory: `sites/gab` → custom domain: `gab.ae`
   - `ali-imperiale` → build directory: `sites/ali` → custom domain: `aliimperiale.com`
   - `auberge` → build directory: `sites/auberge` → custom domain: `aubergedenosaieux.com`

8. **Update DNS for each domain**
   - Point each domain's DNS to Cloudflare Pages (CNAME records)
   - If domains are already on Cloudflare, this is just adding the Pages records

### Phase 3: Make repo private & clean up

9. **Verify all 4 sites are live on Cloudflare Pages**
   - Check each domain resolves and serves the correct site

10. **Disable GitHub Pages** on terminal.consulting repo

11. **Make the repo private**
    ```
    gh repo edit GabrielDancause/terminal.consulting --visibility private
    ```

12. **Archive old client repos** (don't delete — keep as backup)
    ```
    gh repo archive GabrielDancause/gab
    gh repo archive GabrielDancause/aliimperiale
    gh repo archive GabrielDancause/aubergedenosaieux.com
    ```

13. **Disable GitHub Pages on old repos**

### Phase 4: Verify & update issues

14. **Test all 4 sites** are working from Cloudflare
15. **Update GitHub issues** if any are affected by the migration
16. **Update memory files** with new project structure

---

## Risks & Notes

- **DNS propagation**: Domain changes can take up to 48h (usually minutes)
- **Git history**: Client repos' git history won't carry over (just files). If history matters, we can use `git subtree` instead of simple copy
- **Existing links**: Any hardcoded GitHub Pages URLs in client sites should be checked
- **Cloudflare free tier**: Supports 500 builds/month, unlimited bandwidth — more than enough
- **Jules access**: Once repo is private, grant Google Jules access via GitHub app settings

---

## Tools Needed

- **Claude Code CLI** — for repo restructuring (git, file ops)
- **Claude Code browser remote control** — for Cloudflare dashboard setup
- **gh CLI** — for repo visibility, archiving
- **Cloudflare account** — user must have one or create one
