#!/usr/bin/env bash
# setup.sh — Dr. Ahmed Gala Clinic
# تثبيت المشروع + إنشاء الـ 3 skills لـ Claude Code

set -e

GREEN='\033[0;32m'
GOLD='\033[0;33m'
CYAN='\033[0;36m'
RESET='\033[0m'

print() { echo -e "${CYAN}▶ $1${RESET}"; }
ok()    { echo -e "${GREEN}✔ $1${RESET}"; }
head()  { echo -e "\n${GOLD}━━━ $1 ━━━${RESET}"; }

head "Dr. Ahmed Gala — Project Setup"

# ── 1. تثبيت الاعتماديات ─────────────────────────────────────────
head "Installing dependencies"
print "Running npm install..."
npm install
ok "Dependencies installed"

# ── 2. إنشاء مجلد Claude skills ──────────────────────────────────
head "Setting up Claude Code skills"
mkdir -p .claude/commands
ok "Created .claude/commands/"

# ── Skill 1: dev ─────────────────────────────────────────────────
cat > .claude/commands/dev.md << 'EOF'
---
description: Start the development server for Dr. Ahmed Gala clinic site
---

Start the Vite development server for this project.

Run this command:
```
npm run dev
```

The dev server will be available at http://localhost:5173/dr-ahmed-gala/

Remind the user:
- The base path `/dr-ahmed-gala/` is required (set in vite.config.js)
- Hot module replacement (HMR) is enabled — changes reflect instantly
- Arabic/RTL mode can be toggled via the language switcher in the header
EOF
ok "Skill 1 created: /dev — Start development server"

# ── Skill 2: translate ───────────────────────────────────────────
cat > .claude/commands/translate.md << 'EOF'
---
description: Add or update a translation key in both English and Arabic
---

The user wants to add or update a translation key in `src/translations.js`.

1. Read the current `src/translations.js` file
2. Ask the user (if not provided):
   - The translation **key** (camelCase, e.g. `heroTagline`)
   - The **English** text
   - The **Arabic** text
3. Add the key to both `en` and `ar` objects in `translations.js`
4. Show a usage example:

```jsx
import { useLang } from '../context/LanguageContext'

const { t } = useLang()
// Then use:
<p>{t('yourKey')}</p>
```

5. Remind the user: Arabic text should be right-to-left compatible — the layout switches automatically when `lang === 'ar'`.

After editing, verify `translations.js` has matching keys in both `en` and `ar` — missing keys will render as `undefined`.
EOF
ok "Skill 2 created: /translate — Add/update translation keys"

# ── Skill 3: deploy ──────────────────────────────────────────────
cat > .claude/commands/deploy.md << 'EOF'
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
EOF
ok "Skill 3 created: /deploy — Build & deploy to GitHub Pages"

# ── 3. ملخص ──────────────────────────────────────────────────────
head "Setup complete"
echo ""
echo -e "  ${GREEN}Available Claude Code skills:${RESET}"
echo -e "  ${GOLD}/dev${RESET}        — Start Vite development server"
echo -e "  ${GOLD}/translate${RESET}  — Add/update translation keys (EN + AR)"
echo -e "  ${GOLD}/deploy${RESET}     — Build & deploy to GitHub Pages"
echo ""
echo -e "  ${GREEN}Quick start:${RESET}"
echo -e "  ${CYAN}npm run dev${RESET}  →  http://localhost:5173/dr-ahmed-gala/"
echo ""
ok "Dr. Ahmed Gala project is ready!"
