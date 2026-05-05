# CLAUDE.md — Dr. Ahmed Gala Clinic Landing Page

## نظرة عامة / Overview

موقع Landing Page احترافي لعيادة د. أحمد جلال، متخصصة في الطب التجميلي والعناية بالبشرة في القاهرة.  
Professional landing page for Dr. Ahmed Gala Clinic — aesthetic medicine & skincare, Cairo, Egypt.

**Live URL**: `https://ggtxk9bkbf-glitch.github.io/dr-ahmed-gala/`  
**Stack**: React 19 + Vite + Tailwind CSS 3.4 + EmailJS  
**Deployment**: GitHub Pages (`gh-pages` branch)

---

## التقنيات / Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 (JSX, hooks, context) |
| Build tool | Vite 6 |
| Styling | Tailwind CSS 3.4 + custom tokens |
| Email | `@emailjs/browser` |
| Deploy | `gh-pages` → GitHub Pages |
| Fonts | Plus Jakarta Sans (EN) / Cairo (AR) |

---

## بنية المشروع / Project Structure

```
dr-ahmed-gala/
├── index.html                  # Entry HTML — SEO meta, font imports
├── vite.config.js              # base: '/dr-ahmed-gala/'
├── tailwind.config.js          # Custom colors & font
├── src/
│   ├── main.jsx                # React 19 root render
│   ├── App.jsx                 # Root — wraps all 11 sections
│   ├── index.css               # Global styles, animations, RTL fixes
│   ├── translations.js         # i18n strings (en + ar)
│   ├── context/
│   │   └── LanguageContext.jsx # lang state, setLang, t(), RTL toggle
│   ├── utils/
│   │   └── imageHelper.js      # getImageUrl(), handleImageError()
│   └── components/
│       ├── Header.jsx          # Sticky frosted header, nav, lang switcher
│       ├── Hero.jsx            # Headline, doctor photo, stats badges
│       ├── About.jsx           # Doctor bio, credentials grid
│       ├── Services.jsx        # 6 service cards + detail modal
│       ├── WhyChoose.jsx       # 3-tab feature switcher
│       ├── Excellence.jsx      # 4-column strengths grid
│       ├── Testimonials.jsx    # Patient reviews carousel
│       ├── BeforeAfter.jsx     # Before/after split comparison
│       ├── FAQ.jsx             # 2-category accordion (11 Q&As)
│       ├── Contact.jsx         # Form + clinic info + EmailJS
│       ├── Footer.jsx          # Links, socials, brand
│       └── FloatingChat.jsx    # Fixed floating Call/WhatsApp/IG button
└── public/
    ├── favicon.svg
    ├── icons.svg
    └── images/
        ├── team/               # doctor.jpeg, doctor2.jpeg
        ├── services/           # 8 treatment photos
        └── before-after/       # 12 before/after images (4 categories)
```

---

## Design Tokens (Tailwind)

```js
colors: {
  primary: '#2d5a4e',   // Deep green — brand primary
  accent:  '#c9a87c',   // Gold — CTAs & highlights
  cream:   '#f9f7f4',   // Background
  dark:    'rgb(45 52 54)' // Body text
}
font: {
  sans: ['Plus Jakarta Sans', 'sans-serif']  // EN
  // Arabic: 'Cairo' (set dynamically via JS)
}
```

---

## المكونات والأقسام / Sections & Components

| # | Component | المحتوى |
|---|-----------|---------|
| 1 | `Header` | Sticky nav + language dropdown (EN/AR) + CTA + hamburger |
| 2 | `Hero` | Headline, subtext, doctor photo, floating stat badges |
| 3 | `About` | Doctor credentials, bio, qualification cards |
| 4 | `Services` | 6 treatments: Fillers, Anti-aging, Skincare, Facial, Hair, Laser |
| 5 | `WhyChoose` | 3 tabs: Advanced Treatments / Expert Team / Results |
| 6 | `Excellence` | 4 clinic strengths in icon grid |
| 7 | `Testimonials` | Patient review cards with star ratings |
| 8 | `BeforeAfter` | Before/after comparison: Full Face, Hair, Lip Fillers, Skin |
| 9 | `FAQ` | Accordion: Aesthetic Medicine (6 Q) + General Skin (5 Q) |
| 10 | `Contact` | Form (name/phone/email/treatment/msg) + 2 clinic locations |
| 11 | `Footer` | Brand links, socials (IG, TikTok) |
| — | `FloatingChat` | Fixed bottom-right: Call, WhatsApp, Instagram |

---

## نظام الترجمة / i18n System

- **File**: `src/translations.js` — object with `en` and `ar` keys
- **Context**: `src/context/LanguageContext.jsx`
  - `useLang()` hook → `{ lang, setLang, t }`
  - `t('key')` → returns translated string
  - Language change triggers: `document.dir = 'rtl'/'ltr'`, font-family swap
- **Supported languages**: English (`en`), Arabic (`ar`)
- **RTL**: Handled via `dir` attribute on `<html>` + Tailwind RTL utilities

**Adding a new translation key:**
```js
// translations.js
export const translations = {
  en: { myNewKey: 'English text' },
  ar: { myNewKey: 'النص العربي' }
}
// Usage in component:
const { t } = useLang()
<p>{t('myNewKey')}</p>
```

---

## الصور / Images

All images live under `public/images/`. Reference them via `getImageUrl()`:

```jsx
import { getImageUrl, handleImageError } from '../utils/imageHelper'
<img src={getImageUrl('/images/services/fillers.png')}
     onError={(e) => handleImageError(e, 'Fillers')} />
```

`getImageUrl` prepends `import.meta.env.BASE_URL` automatically (needed for GitHub Pages subdirectory).

---

## نموذج التواصل / Contact Form — EmailJS

| Config | Value |
|--------|-------|
| Service ID | `ahmedbooks` |
| Template ID | `template_u81hvqb` |
| Public Key | `ju5jjkSKHDueNCnrd` |

Fields sent: `from_name`, `phone`, `from_email`, `treatment`, `message`.

---

## معلومات العيادة / Clinic Info

| | |
|--|--|
| Phone / WhatsApp | +20 111 333 7472 |
| Email | galal.ahmedamer@gmail.com |
| Instagram | @drahmedgalal.g |
| TikTok | @drahmedgalal_g |
| **Sheikh Zayed** | Izar Plaza, Palm Hills — Wed 3–8 PM |
| **New Cairo** | Concord Plaza, 90th St — Mon 5–9 PM, Tue 1–8 PM |

---

## أوامر التطوير / Dev Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server → http://localhost:5173/dr-ahmed-gala/
npm run build        # Production build → dist/
npm run preview      # Preview production build locally
npm run lint         # ESLint check
npm run deploy       # Build + deploy to GitHub Pages
```

---

## أنماط مهمة / Key Patterns

### Scroll Animations
```jsx
// IntersectionObserver pattern used in every section
useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('fade-in-up')),
    { threshold: 0.1 }
  )
  if (ref.current) observer.observe(ref.current)
  return () => observer.disconnect()
}, [])
```

### Adding a New Component
1. Create `src/components/MySection.jsx`
2. Import and use `useLang()` for translations
3. Add translation keys to `translations.js`
4. Import in `App.jsx` and add to JSX in correct order
5. Wrap content div with `ref` and `IntersectionObserver` for fade-in

### Modal Pattern (see `Services.jsx`)
- State: `const [selected, setSelected] = useState(null)`
- Backdrop click + Escape key both close the modal
- Portal-style fixed overlay with `z-50`

---

## GitHub Actions / Deployment

Deployment is manual via `npm run deploy` (runs `gh-pages -d dist`).  
The `vite.config.js` base path **must** remain `/dr-ahmed-gala/` for GitHub Pages to work.  
Do **not** change `base` without updating the GitHub Pages settings.

---

## ملاحظات للمطور / Developer Notes

- **No TypeScript** — pure JSX throughout
- **No router** — single-page, scroll-based navigation
- **No state management library** — React Context only
- **CSS animations** defined in `index.css` (`fadeInUp`, `card-hover`)
- **Mobile menu** state lives in `Header.jsx` (local `useState`)
- **Image fallback**: `placeholder.co` used when images fail to load
- **`[dir="rtl"]`** selectors in `index.css` fix floating elements for Arabic
