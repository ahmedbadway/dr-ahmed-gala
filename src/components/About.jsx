import { useEffect, useRef } from 'react'
import { handleImageError } from '../utils/imageHelper'
import { useLang } from '../context/LanguageContext'

export default function About() {
  const ref = useRef(null)
  const { t } = useLang()

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('fade-in-up') },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const features = [
    { icon: '🏆', titleKey: 'about_f1_title', descKey: 'about_f1_desc' },
    { icon: '💉', titleKey: 'about_f2_title', descKey: 'about_f2_desc' },
    { icon: '🌿', titleKey: 'about_f3_title', descKey: 'about_f3_desc' },
    { icon: '🔬', titleKey: 'about_f4_title', descKey: 'about_f4_desc' },
  ]

  return (
    <section id="about" className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} style={{ opacity: 0 }} className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Doctor photo */}
          <div className="relative">
            <div className="absolute -bottom-4 -left-4 w-full h-full bg-[#2d5a4e]/8 rounded-2xl" />
            <img
              src={`${import.meta.env.BASE_URL}images/team/doctor2.jpeg`}
              alt="Dr. Ahmed Galal"
              onError={(e) => handleImageError(e, 'Dr. Ahmed Galal')}
              className="relative rounded-2xl shadow-xl w-full object-cover"
            />
            <div className="absolute -right-4 top-8 bg-[#2d5a4e] text-white rounded-xl p-4 shadow-lg">
              <p className="text-2xl font-bold">5+</p>
              <p className="text-xs font-medium opacity-90">{t('about_years1')}</p>
              <p className="text-xs font-medium opacity-90">{t('about_years2')}</p>
            </div>
            <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-xl px-5 py-4 shadow-lg">
              <p className="font-bold text-[rgb(45,52,54)]">{t('about_title')}</p>
              <p className="text-sm text-[#2d5a4e] font-medium">{t('about_subtitle')}</p>
              <p className="text-xs text-gray-400 mt-0.5">{t('about_stats_line')}</p>
            </div>
          </div>

          {/* Bio */}
          <div>
            <p className="text-[#c9a87c] text-xs font-bold tracking-widest uppercase mb-3">
              {t('about_badge')}
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-[rgb(45,52,54)] leading-tight mb-6">
              {t('about_headline')}{' '}
              <span className="text-[#2d5a4e] italic">{t('about_headline2')}</span>
            </h2>
            <p className="text-gray-600 leading-relaxed mb-5">{t('about_p1')}</p>
            <p className="text-gray-600 leading-relaxed mb-8">{t('about_p2')}</p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {features.map((f) => (
                <div key={f.titleKey} className="flex items-start gap-3 p-4 bg-[#f9f7f4] rounded-xl">
                  <span className="text-xl">{f.icon}</span>
                  <div>
                    <p className="text-sm font-semibold text-[rgb(45,52,54)]">{t(f.titleKey)}</p>
                    <p className="text-xs text-gray-500">{t(f.descKey)}</p>
                  </div>
                </div>
              ))}
            </div>

            <a href="#contact" className="inline-flex items-center gap-2 bg-[#2d5a4e] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#234840] transition-colors duration-200">
              {t('about_cta')}
              <span>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
