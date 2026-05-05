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
