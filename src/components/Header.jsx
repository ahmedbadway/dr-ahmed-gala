import { useState, useEffect, useRef } from 'react'
import { useLang } from '../context/LanguageContext'

const LANGS = [
  { code: 'en', flag: '🇬🇧', label: 'English' },
  { code: 'ar', flag: '🇪🇬', label: 'العربية' },
]

function LangDropdown({ lang, setLang, t }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div ref={ref} className="relative" dir="ltr">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Select language"
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg hover:bg-gray-100 transition-colors duration-200"
      >
        <span className="text-xl leading-none">{LANGS.find((l) => l.code === lang)?.flag}</span>
        <svg className={`w-3 h-3 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute top-full mt-2 end-0 w-44 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-xs font-bold text-gray-400 tracking-wide">{t('lang_choose')}</p>
          </div>
          {LANGS.map((l) => (
            <button
              key={l.code}
              onClick={() => { setLang(l.code); setOpen(false) }}
              className={`w-full flex items-center justify-between px-4 py-3 text-sm transition-colors duration-150 ${
                lang === l.code
                  ? 'bg-[#f0f7f4] text-[#2d5a4e] font-semibold'
                  : 'text-[rgb(45,52,54)] hover:bg-gray-50'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <span className="text-xl leading-none">{l.flag}</span>
                <span>{l.label}</span>
              </span>
              <span className="text-xs font-bold text-gray-400">{l.code.toUpperCase()}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { lang, setLang, t } = useLang()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { label: t('nav_about'),    href: '#about' },
    { label: t('nav_services'), href: '#services' },
    { label: t('nav_gallery'),  href: '#gallery' },
    { label: t('faq_title'),    href: '#faq' },
    { label: t('nav_contact'),  href: '#contact' },
  ]

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      borderBottomWidth: '1px', borderColor: 'rgb(243 244 246)',
      backgroundColor: 'rgb(248 250 249 / 0.9)',
      backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
      boxShadow: scrolled ? '0 2px 16px rgba(45,90,78,0.08)' : 'none',
      transition: 'box-shadow 0.3s',
    }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">

        {/* Logo — always LTR */}
        <a href="#" className="flex items-center gap-2 flex-shrink-0" dir="ltr">
          <img src={`${import.meta.env.BASE_URL}images/team/doctor.jpeg`} alt="Dr. Ahmed Galal" style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover', objectPosition: 'center 10%' }} />
          <span className="font-bold text-[#2d5a4e] text-lg tracking-tight">Dr. Ahmed Galal</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}
              className="text-sm font-medium text-[rgb(45,52,54)] hover:text-[#2d5a4e] transition-colors duration-200">
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop right controls — always LTR so switcher stays consistent */}
        <div className="hidden md:flex items-center gap-3" dir="ltr">
          <LangDropdown lang={lang} setLang={setLang} t={t} />
          <a href="tel:+20111333472" className="text-sm font-medium text-[#2d5a4e] hover:underline hidden lg:block">
            +20 111 333 7472
          </a>
          <a href="#contact" className="bg-[#2d5a4e] text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-[#234840] transition-colors duration-200">
            {t('nav_cta')}
          </a>
        </div>

        {/* Mobile controls */}
        <div className="md:hidden flex items-center gap-1" dir="ltr">
          <LangDropdown lang={lang} setLang={setLang} t={t} />
          <button className="p-2 rounded-lg hover:bg-gray-100" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            <div className="w-5 h-0.5 bg-[rgb(45,52,54)] mb-1.5" />
            <div className="w-5 h-0.5 bg-[rgb(45,52,54)] mb-1.5" />
            <div className="w-5 h-0.5 bg-[rgb(45,52,54)]" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pb-4">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
              className="block py-3 text-sm font-medium text-[rgb(45,52,54)] hover:text-[#2d5a4e] border-b border-gray-50">
              {link.label}
            </a>
          ))}
          <a href="#contact" onClick={() => setMenuOpen(false)}
            className="block mt-3 bg-[#2d5a4e] text-white text-sm font-semibold px-5 py-2.5 rounded-lg text-center">
            {t('nav_cta')}
          </a>
        </div>
      )}
    </header>
  )
}
