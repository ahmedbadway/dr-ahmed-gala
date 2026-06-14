import { useEffect, useRef } from 'react'
import { useLang } from '../context/LanguageContext'

const testimonialsMeta = [
  { nameKey: 'test1_name', roleKey: 'test1_role', textKey: 'test1_text', stars: 5, avatar: 'https://placehold.co/80x80/d4e8e0/2d5a4e?text=SM' },
  { nameKey: 'test2_name', roleKey: 'test2_role', textKey: 'test2_text', stars: 5, avatar: 'https://placehold.co/80x80/e8d4e0/5a2d4e?text=MK' },
  { nameKey: 'test3_name', roleKey: 'test3_role', textKey: 'test3_text', stars: 5, avatar: 'https://placehold.co/80x80/d4dce8/2d405a?text=OR' },
  { nameKey: 'test4_name', roleKey: 'test4_role', textKey: 'test4_text', stars: 5, avatar: 'https://placehold.co/80x80/e8e0d4/5a4e2d?text=NS' },
]

function Stars({ count }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="text-yellow-400 text-sm">★</span>
      ))}
    </div>
  )
}

export default function Testimonials() {
  const ref = useRef(null)
  const { t } = useLang()

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('fade-in-up') },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="bg-white py-20 lg:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-[#c9a87c] text-xs font-bold tracking-widest uppercase mb-3">{t('test_badge')}</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-[rgb(45,52,54)] mb-4">
            {t('test_title1')}{' '}
            <span className="text-[#2d5a4e] italic">{t('test_title2')}</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">{t('test_subtitle')}</p>
        </div>

        <div ref={ref} style={{ opacity: 0, scrollbarWidth: 'none' }}
          className="flex gap-5 overflow-x-auto pb-4 md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible">
          {testimonialsMeta.map((item) => (
            <div key={item.nameKey}
              className="card-hover bg-[#f9f7f4] rounded-2xl p-6 shadow-sm border border-gray-100 flex-shrink-0 w-72 md:w-auto flex flex-col gap-4">
              <Stars count={item.stars} />
              <p className="text-gray-600 text-sm leading-relaxed flex-1">"{t(item.textKey)}"</p>
              <div className="flex items-center gap-3 pt-3 border-t border-gray-200">
                <img src={item.avatar} alt={t(item.nameKey)} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="font-bold text-sm text-[rgb(45,52,54)]">{t(item.nameKey)}</p>
                  <p className="text-xs text-gray-400">{t(item.roleKey)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
