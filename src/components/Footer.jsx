import { useLang } from '../context/LanguageContext'

function InstagramIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="ig-radial" cx="30%" cy="107%" r="120%">
          <stop offset="0%" stopColor="#fdf497"/>
          <stop offset="5%" stopColor="#fdf497"/>
          <stop offset="45%" stopColor="#fd5949"/>
          <stop offset="60%" stopColor="#d6249f"/>
          <stop offset="90%" stopColor="#285AEB"/>
        </radialGradient>
      </defs>
      <rect width="40" height="40" rx="10" fill="url(#ig-radial)"/>
      <rect x="10" y="10" width="20" height="20" rx="5.5" stroke="white" strokeWidth="2" fill="none"/>
      <circle cx="20" cy="20" r="5" stroke="white" strokeWidth="2" fill="none"/>
      <circle cx="26.5" cy="13.5" r="1.5" fill="white"/>
    </svg>
  )
}

function TikTokIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="10" fill="#010101"/>
      <path d="M26.5 13.2c-1.2-.9-2-2.2-2.2-3.7h-2.8v12.8c0 1.4-1.1 2.5-2.5 2.5s-2.5-1.1-2.5-2.5 1.1-2.5 2.5-2.5c.3 0 .5 0 .7.1V17c-.2 0-.5-.1-.7-.1-2.9 0-5.3 2.4-5.3 5.3s2.4 5.3 5.3 5.3 5.3-2.4 5.3-5.3v-6.8c1.1.7 2.4 1.1 3.7 1.1V13c-.5 0-1-.2-1.5-.5v.7z" fill="white"/>
      <path d="M28.7 11.2c.3.7.7 1.4 1.3 1.9v2.4c-1.3 0-2.6-.4-3.7-1.1v6.8c0 2.9-2.4 5.3-5.3 5.3s-5.3-2.4-5.3-5.3 2.4-5.3 5.3-5.3c.2 0 .5 0 .7.1v2.9c-.2-.1-.5-.1-.7-.1-1.4 0-2.5 1.1-2.5 2.5s1.1 2.5 2.5 2.5 2.5-1.1 2.5-2.5V9.5h2.8c.1.6.3 1.2.5 1.7h1.9z" fill="#69C9D0"/>
    </svg>
  )
}

export default function Footer() {
  const { t } = useLang()

  const footerLinks = {
    [t('footer_treat_h')]: [
      t('treat_opt1'), t('treat_opt2'), t('treat_opt3'),
      t('treat_opt4'), t('treat_opt5'), t('treat_opt6'),
    ],
    [t('footer_links_h')]: [
      t('footer_lnk_about'), t('footer_lnk_svc'),
      t('footer_lnk_phil'),  t('footer_lnk_con'),
    ],
  }

  return (
    <footer className="bg-[rgb(45,52,54)] text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-5" dir="ltr">
              <div className="w-9 h-9 rounded-full bg-[#2d5a4e] flex items-center justify-center">
                <span className="text-white font-bold text-sm">AG</span>
              </div>
              <span className="font-bold text-white text-lg">Dr. Ahmed Galal</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs mb-2">{t('footer_tagline')}</p>
            <p className="text-gray-500 text-xs mb-6">{t('footer_location')}</p>
            <div className="flex items-center gap-4" dir="ltr">
              <a href="https://instagram.com/drahmedgalal.g" target="_blank" rel="noopener noreferrer"
                title="Instagram @drahmedgalal.g"
                className="hover:scale-110 transition-transform duration-200 block">
                <InstagramIcon />
              </a>
              <a href="https://tiktok.com/@drahmedgalal_g" target="_blank" rel="noopener noreferrer"
                title="TikTok @drahmedgalal_g"
                className="hover:scale-110 transition-transform duration-200 block">
                <TikTokIcon />
              </a>
              <a href="tel:+20111333472"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-lg hover:bg-[#2d5a4e] hover:scale-110 transition-all duration-200"
                title="+20 111 333 7472">
                📞
              </a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-bold text-white text-sm mb-5">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-400 text-sm hover:text-white transition-colors duration-200">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} Dr. Ahmed Galal. {t('footer_copy')}
          </p>
          <p className="text-gray-600 text-xs" dir="ltr">
            galal.ahmedamer@gmail.com · +20 111 333 7472
          </p>
        </div>
      </div>
    </footer>
  )
}
