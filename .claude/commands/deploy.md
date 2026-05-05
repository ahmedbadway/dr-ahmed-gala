---
description: Build and deploy the site to GitHub Pages
---

Deploy the Dr. Ahmed Gala clinic site to GitHub Pages.

Steps to follow:

1. **Check for uncommitted changes** — run `git status`. If there are unstaged changes, warn the user before proceeding.

2. **Run lint check**:
```
npm run lint
```
Fix any errors before deploying. Warnings are acceptable.

3. **Build and deploy**:
```
npm run deploy
```
This runs `vite build` then `gh-pages -d dist` automatically.

4. **Verify deployment**:
- Deployment pushes to the `gh-pages` branch
- Live URL: https://ggtxk9bkbf-glitch.github.io/dr-ahmed-gala/
- GitHub Pages may take 1–3 minutes to update after deploy

**Important reminders:**
- The `base` in `vite.config.js` must stay as `/dr-ahmed-gala/` — do NOT change it
- Images use `getImageUrl()` which prepends `import.meta.env.BASE_URL` — required for GitHub Pages
- EmailJS keys are hardcoded in `Contact.jsx` — do not expose them in public repos
