import { useEffect, useRef } from 'react'
import { useLang } from '../context/LanguageContext'

const reasonsMeta = [
  { icon: '👨‍⚕️', titleKey: 'exc_r1_title', descKey: 'exc_r1_desc' },
  { icon: '💉',   titleKey: 'exc_r2_title', descKey: 'exc_r2_desc' },
  { icon: '🌿',   titleKey: 'exc_r3_title', descKey: 'exc_r3_desc' },
  { icon: '📋',   titleKey: 'exc_r4_title', descKey: 'exc_r4_desc' },
]

const pillarsMeta = [
  { icon: '🧬', titleKey: 'exc_p1_title', descKey: 'exc_p1_desc' },
  { icon: '🎨', titleKey: 'exc_p2_title', descKey: 'exc_p2_desc' },
  { icon: '🌱', titleKey: 'exc_p3_title', descKey: 'exc_p3_desc' },
]

export default function Excellence() {
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
    <section id="philosophy" className="bg-[#f9f7f4] py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-[#c9a87c] text-xs font-bold tracking-widest uppercase mb-4">{t('exc_badge')}</p>
          <blockquote className="text-2xl lg:text-3xl font-light italic text-[rgb(45,52,54)] max-w-3xl mx-auto leading-relaxed mb-3">
            "{t('exc_quote')}"
          </blockquote>
          <p className="text-[#2d5a4e] font-semibold text-sm">{t('exc_by')}</p>
        </div>

        <div ref={ref} style={{ opacity: 0 }} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasonsMeta.map((r) => (
            <div key={r.titleKey} className="card-hover bg-white rounded-2xl p-7 shadow-sm border border-gray-100 text-center">
              <div className="w-16 h-16 bg-[#f0f7f4] rounded-2xl flex items-center justify-center text-3xl mx-auto mb-5">
                {r.icon}
              </div>
              <h3 className="font-bold text-[rgb(45,52,54)] mb-3">{t(r.titleKey)}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{t(r.descKey)}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid sm:grid-cols-3 gap-6">
          {pillarsMeta.map((p) => (
            <div key={p.titleKey} className="flex items-start gap-4 bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <div className="w-12 h-12 bg-[#2d5a4e]/10 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                {p.icon}
              </div>
              <div>
                <p className="font-bold text-[rgb(45,52,54)] mb-1">{t(p.titleKey)}</p>
                <p className="text-gray-500 text-sm">{t(p.descKey)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
