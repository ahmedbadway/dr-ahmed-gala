import { useReveal } from '../utils/useReveal'

const testimonials = [
  {
    name: 'Sarah M.',
    role: 'Facial Aesthetics Patient',
    text: 'Dr. Galal completely transformed my skin. The anti-aging treatment was virtually painless and the results were visible within days. Absolutely the most professional clinic I have ever visited.',
    stars: 5,
    avatar: 'https://placehold.co/80x80/d4e8e0/2d5a4e?text=SM',
  },
  {
    name: 'Mona K.',
    role: 'Skin Rejuvenation Patient',
    text: 'Best clinic in Cairo without question. The team is kind, the environment is pristine, and my results far exceeded my expectations. I finally feel confident in my skin again.',
    stars: 5,
    avatar: 'https://placehold.co/80x80/e8d4e0/5a2d4e?text=MK',
  },
  {
    name: 'Omar R.',
    role: 'Hair Restoration Patient',
    text: 'The hair restoration treatment has been life-changing. After just three PRP sessions my hair is noticeably thicker and fuller. I highly recommend Dr. Galal to anyone experiencing hair loss.',
    stars: 5,
    avatar: 'https://placehold.co/80x80/d4dce8/2d405a?text=OR',
  },
  {
    name: 'Nadia S.',
    role: 'Fillers & Botox Patient',
    text: 'I was nervous about fillers but Dr. Galal put me completely at ease. The result looks incredibly natural — exactly what I wanted. I will not go anywhere else now.',
    stars: 5,
    avatar: 'https://placehold.co/80x80/e8e0d4/5a4e2d?text=NS',
  },
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
  const ref = useReveal({ threshold: 0.1 })

  return (
    <section className="bg-white py-20 lg:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-[#c9a87c] text-xs font-bold tracking-widest uppercase mb-3">
            Patient Stories
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-[rgb(45,52,54)] mb-4">
            Real Results from{' '}
            <span className="text-[#2d5a4e] italic">Real Patients</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Hear directly from our patients about their experience at Dr. Ahmed Galal Clinic.
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
