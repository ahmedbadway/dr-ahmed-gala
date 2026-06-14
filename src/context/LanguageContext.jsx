import { useState, useEffect } from 'react'
import { translations } from '../translations'
import { LanguageContext } from './languageStore'

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en')

  useEffect(() => {
    const html = document.documentElement
    if (lang === 'ar') {
      html.dir = 'rtl'
      html.lang = 'ar'
      html.style.fontFamily = '"Cairo", sans-serif'
    } else {
      html.dir = 'ltr'
      html.lang = 'en'
      html.style.fontFamily = '"Plus Jakarta Sans", sans-serif'
    }
  }, [lang])

  const get = (obj, path) => path.split('.').reduce((acc, k) => acc?.[k], obj)

  const t = (key) => get(translations[lang], key) ?? get(translations.en, key) ?? key

  const dict = translations[lang] ?? translations.en

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, dict }}>
      {children}
    </LanguageContext.Provider>
  )
}
