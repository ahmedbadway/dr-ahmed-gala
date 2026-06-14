import { Stethoscope, Syringe, Leaf, ClipboardText, Dna, PaintBrush, Plant } from '@phosphor-icons/react'
import { useLang } from '../context/languageStore'
import { useReveal } from '../utils/useReveal'

const reasonIcons = [Stethoscope, Syringe, Leaf, ClipboardText]
const pillarIcons = [Dna, PaintBrush, Plant]

export default function Excellence() {
  const ref = useReveal({ threshold: 0.1 })
  const { t, dict } = useLang()

  return (
    <section id="philosophy" className="bg-[#f9f7f4] py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Philosophy quote */}
        <div className="text-center mb-16">
          <p className="text-[#c9a87c] text-xs font-bold tracking-widest uppercase mb-4">
            {t('excellence.eyebrow')}
          </p>
          <blockquote className="text-2xl lg:text-3xl font-light italic text-[rgb(45,52,54)] max-w-3xl mx-auto leading-relaxed mb-3">
            "{t('excellence.quote')}"
          </blockquote>
          <p className="text-[#2d5a4e] font-semibold text-sm">{t('excellence.quoteAuthor')}</p>
        </div>

        <div
          ref={ref}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {dict.excellence.reasons.map((r, i) => {
            const Icon = reasonIcons[i]
            return (
              <div
                key={r.title}
                className="card-hover bg-white rounded-2xl p-7 shadow-sm border border-gray-100 text-center"
              >
                <div className="w-16 h-16 bg-[#f0f7f4] rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <Icon className="w-8 h-8 text-[#2d5a4e]" weight="duotone" />
                </div>
                <h3 className="font-bold text-[rgb(45,52,54)] mb-3">{r.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{r.desc}</p>
              </div>
            )
          })}
        </div>

        {/* Philosophy 3 pillars */}
        <div className="mt-16 grid sm:grid-cols-3 gap-6">
          {dict.excellence.pillars.map((p, i) => {
            const Icon = pillarIcons[i]
            return (
              <div key={p.title} className="flex items-start gap-4 bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <div className="w-12 h-12 bg-[#2d5a4e]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-[#2d5a4e]" weight="duotone" />
                </div>
                <div>
                  <p className="font-bold text-[rgb(45,52,54)] mb-1">{p.title}</p>
                  <p className="text-gray-500 text-sm">{p.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
