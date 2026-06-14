import { Star } from '@phosphor-icons/react'
import { useLang } from '../context/languageStore'
import { useReveal } from '../utils/useReveal'

const avatars = [
  'https://placehold.co/80x80/d4e8e0/2d5a4e?text=SM',
  'https://placehold.co/80x80/e8d4e0/5a2d4e?text=MK',
  'https://placehold.co/80x80/d4dce8/2d405a?text=OR',
  'https://placehold.co/80x80/e8e0d4/5a4e2d?text=NS',
]

function Stars({ count }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} weight="fill" className="text-yellow-400 w-3.5 h-3.5" />
      ))}
    </div>
  )
}

export default function Testimonials() {
  const ref = useReveal({ threshold: 0.1 })
  const { t, dict } = useLang()
  const testimonials = dict.testimonials.items.map((item, i) => ({ ...item, stars: 5, avatar: avatars[i] }))

  return (
    <section className="bg-white py-20 lg:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-[#c9a87c] text-xs font-bold tracking-widest uppercase mb-3">
            {t('testimonials.eyebrow')}
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-[rgb(45,52,54)] mb-4">
            {t('testimonials.heading1')}{' '}
            <span className="text-[#2d5a4e] italic">{t('testimonials.heading2')}</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            {t('testimonials.subtitle')}
          </p>
        </div>

        {/* Horizontal scroll on mobile, grid on desktop */}
        <div
          ref={ref}
          style={{ scrollbarWidth: 'none' }}
          className="flex gap-5 overflow-x-auto pb-4 md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible"
        >
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="card-hover bg-[#f9f7f4] rounded-2xl p-6 shadow-sm border border-gray-100 flex-shrink-0 w-72 md:w-auto flex flex-col gap-4"
            >
              <Stars count={t.stars} />
              <p className="text-gray-600 text-sm leading-relaxed flex-1">"{t.text}"</p>
              <div className="flex items-center gap-3 pt-3 border-t border-gray-200">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="font-bold text-sm text-[rgb(45,52,54)]">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
