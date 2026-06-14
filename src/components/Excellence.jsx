import { useReveal } from '../utils/useReveal'

const reasons = [
  {
    icon: '👨‍⚕️',
    title: 'Medical Expertise',
    desc: 'Board-certified dermatologist with advanced training in aesthetic medicine and injectable techniques from leading institutions worldwide.',
  },
  {
    icon: '💉',
    title: 'Advanced Injection Techniques',
    desc: 'Mastery of cutting-edge injection methods including micro-cannula techniques, layering protocols, and precision placement for optimal results.',
  },
  {
    icon: '🌿',
    title: 'Natural, Non-Overdone Results',
    desc: 'A philosophy of subtle enhancement that preserves your unique features and facial character — never overcorrected, always harmonious.',
  },
  {
    icon: '📋',
    title: 'Patient-Specific Treatment Plans',
    desc: 'Comprehensive consultations and fully customized protocols designed around your unique anatomy, goals, and aesthetic vision.',
  },
]

export default function Excellence() {
  const ref = useReveal({ threshold: 0.1 })

  return (
    <section id="philosophy" className="bg-[#f9f7f4] py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Philosophy quote */}
        <div className="text-center mb-16">
          <p className="text-[#c9a87c] text-xs font-bold tracking-widest uppercase mb-4">
            Why Choose Dr. Galal
          </p>
          <blockquote className="text-2xl lg:text-3xl font-light italic text-[rgb(45,52,54)] max-w-3xl mx-auto leading-relaxed mb-3">
            "The goal is not to change your face. The goal is to improve skin quality, balance,
            and confidence."
          </blockquote>
          <p className="text-[#2d5a4e] font-semibold text-sm">— Dr. Ahmed Galal</p>
        </div>

        <div
          ref={ref}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {reasons.map((r) => (
            <div
              key={r.title}
              className="card-hover bg-white rounded-2xl p-7 shadow-sm border border-gray-100 text-center"
            >
              <div className="w-16 h-16 bg-[#f0f7f4] rounded-2xl flex items-center justify-center text-3xl mx-auto mb-5">
                {r.icon}
              </div>
              <h3 className="font-bold text-[rgb(45,52,54)] mb-3">{r.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>

        {/* Philosophy 3 pillars */}
        <div className="mt-16 grid sm:grid-cols-3 gap-6">
          {[
            { icon: '🧬', title: 'Medical Integrity', desc: 'Evidence-based treatments, safety first, honest guidance' },
            { icon: '🎨', title: 'Artistic Precision', desc: 'Facial harmony, natural balance, individualized approach' },
            { icon: '🌱', title: 'Long-term Vision', desc: 'Sustainable results, skin health, aging gracefully' },
          ].map((p) => (
            <div key={p.title} className="flex items-start gap-4 bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <div className="w-12 h-12 bg-[#2d5a4e]/10 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                {p.icon}
              </div>
              <div>
                <p className="font-bold text-[rgb(45,52,54)] mb-1">{p.title}</p>
                <p className="text-gray-500 text-sm">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
