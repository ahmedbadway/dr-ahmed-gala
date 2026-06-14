import { Star } from '@phosphor-icons/react'
import { handleImageError } from '../utils/imageHelper'
import { useLang } from '../context/languageStore'
import { useReveal } from '../utils/useReveal'

export default function Hero() {
  const ref = useReveal()
  const { t, dict } = useLang()

  return (
    <section className="bg-[#f9f7f4] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div ref={ref}>
            <p className="text-[#c9a87c] text-sm font-semibold tracking-widest uppercase mb-4">
              {t('hero.badge')}
            </p>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl leading-tight mb-4">
              <span className="block font-bold text-[rgb(45,52,54)]">{t('hero.title1')}</span>
              <span className="block font-light italic text-[rgb(45,52,54)]">{t('hero.title2')}</span>
              <span className="block font-bold text-[rgb(45,52,54)]">{t('hero.title3')}</span>
              <span className="block font-bold text-[#2d5a4e]">{t('hero.title4')}</span>
            </h1>
            <p className="text-[rgb(100,115,120)] text-lg leading-relaxed mb-8 max-w-xl">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#contact"
                className="bg-[#2d5a4e] text-white font-semibold px-7 py-3.5 rounded-lg hover:bg-[#234840] transition-colors duration-200 shadow-md"
              >
                {t('hero.cta1')}
              </a>
              <a
                href="#services"
                className="border border-[#2d5a4e] text-[#2d5a4e] font-semibold px-7 py-3.5 rounded-lg hover:bg-[#2d5a4e] hover:text-white transition-colors duration-200"
              >
                {t('hero.cta2')}
              </a>
            </div>

            {/* Stats row */}
            <div className="flex gap-10 mt-12 pt-8 border-t border-gray-200">
              {dict.hero.stats.map((s) => (
                <div key={s.label}>
                  <p className="text-2xl font-bold text-[#2d5a4e]">{s.num}</p>
                  <p className="text-sm text-gray-500 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right image */}
          <div className="relative">
            <div className="absolute -top-6 -right-6 w-72 h-72 bg-[#2d5a4e]/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-[#c9a87c]/20 rounded-full blur-2xl"></div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={`${import.meta.env.BASE_URL}images/team/doctor.jpeg`}
                alt="Dr. Ahmed Galal — Aesthetic Dermatologist & Expert Injector"
                onError={(e) => handleImageError(e, 'Dr. Ahmed Galal')}
                className="w-full h-full object-cover"
              />
              {/* Floating badge */}
              <div className="absolute bottom-6 left-6 bg-white rounded-xl px-4 py-3 shadow-lg">
                <p className="text-xs text-gray-500 font-medium">{t('hero.specialistLabel')}</p>
                <p className="text-sm font-bold text-[#2d5a4e]">{t('hero.doctorName')}</p>
                <p className="text-xs text-gray-400">{t('hero.doctorRole')}</p>
              </div>
              {/* Floating rating */}
              <div className="absolute top-6 right-6 bg-white rounded-xl px-3 py-2 shadow-lg flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} weight="fill" className="text-yellow-400 w-3.5 h-3.5" />
                ))}
                <span className="text-xs font-semibold text-gray-700 ms-1">5.0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
