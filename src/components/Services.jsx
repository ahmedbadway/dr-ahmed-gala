import { useEffect, useState } from 'react'
import { handleImageError } from '../utils/imageHelper'
import { useLang } from '../context/languageStore'
import { useReveal } from '../utils/useReveal'

const BASE = import.meta.env.BASE_URL

const services = [
  {
    title: 'Advanced Fillers & Contouring',
    img: `${BASE}images/services/fillers.png`,
    emoji: '💉',
    desc: 'Precision facial sculpting and volume restoration using premium hyaluronic acid and collagen stimulators, tailored to your facial anatomy.',
    details: [
      'Cheek & jawline contouring',
      'Nasolabial fold correction',
      'Under-eye (tear trough) filler',
      'Non-surgical rhinoplasty',
      'Chin augmentation',
    ],
  },
  {
    title: 'Botox Techniques',
    img: `${BASE}images/services/antiaging.png`,
    emoji: '✨',
    desc: 'Expert neurotoxin application for natural, non-frozen results. Targeting dynamic wrinkles while preserving full facial expression.',
    details: [
      'Forehead & frown lines',
      'Crow\'s feet treatment',
      'Brow lift & shaping',
      'Masseter slimming (jaw Botox)',
      'Lip flip & gummy smile correction',
    ],
  },
  {
    title: 'Bio-stimulators',
    img: `${BASE}images/services/skin.jpg`,
    emoji: '🌱',
    desc: 'Collagen regeneration treatments that stimulate your skin\'s own healing response for long-term structural improvement and anti-aging.',
    details: [
      'Sculptra (poly-L-lactic acid)',
      'Radiesse (calcium hydroxyapatite)',
      'Gradual, natural-looking results',
      'Long-lasting effect (12–24 months)',
      'Full-face or targeted application',
    ],
  },
  {
    title: 'Skin Boosters & Mesotherapy',
    img: `${BASE}images/services/facial.jpg`,
    emoji: '💧',
    desc: 'Deep hydration and skin quality enhancement through micro-injection of vitamins, minerals, and hyaluronic acid directly into the skin.',
    details: [
      'Profhilo & Juvederm Volite',
      'Vitamin & antioxidant cocktails',
      'Deep skin hydration',
      'Pore minimising & glow boost',
      'Face, neck, hands & décolletage',
    ],
  },
  {
    title: 'Comprehensive Skin Treatments',
    img: `${BASE}images/services/skin2.jpg`,
    emoji: '🔬',
    desc: 'Medical-grade skincare and rejuvenation protocols combining laser, chemical peels, and microneedling for transformative skin results.',
    details: [
      'Laser resurfacing & pigmentation',
      'Chemical peels (superficial to deep)',
      'Microneedling with PRP',
      'Acne & post-acne scar revision',
      'Personalised medical skincare plan',
    ],
  },
  {
    title: 'Hair & Scalp Treatments',
    img: `${BASE}images/services/hair.JPG`,
    emoji: '💆',
    desc: 'Advanced solutions for hair thinning and loss, combining PRP therapy, mesotherapy, and medical protocols for visible regrowth.',
    details: [
      'PRP (Platelet-Rich Plasma) therapy',
      'Scalp mesotherapy',
      'Hair loss diagnosis & blood tests',
      'Topical & oral treatment plans',
      'Maintenance & follow-up sessions',
    ],
  },
]

function Modal({ service, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Panel */}
      <div
        className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div className="relative h-52 overflow-hidden rounded-t-2xl">
          <img
            src={service.img}
            alt={service.title}
            onError={(e) => handleImageError(e, service.title)}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-gray-700 hover:bg-white transition-colors font-bold text-lg leading-none"
            aria-label="Close"
          >
            ×
          </button>
          <div className="absolute bottom-4 left-5 flex items-center gap-2">
            <span className="text-2xl">{service.emoji}</span>
            <h3 className="text-white font-bold text-lg leading-tight">{service.title}</h3>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-600 leading-relaxed mb-5">{service.desc}</p>

          <div className="mb-6">
            <p className="text-xs font-bold text-[#c9a87c] uppercase tracking-widest mb-3">
              What's Included
            </p>
            <ul className="space-y-2">
              {service.details.map((d) => (
                <li key={d} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="text-[#2d5a4e] font-bold mt-0.5">✓</span>
                  {d}
                </li>
              ))}
            </ul>
          </div>

          <a
            href="#contact"
            onClick={onClose}
            className="block w-full bg-[#2d5a4e] text-white font-semibold py-3.5 rounded-xl text-center hover:bg-[#234840] transition-colors duration-200"
          >
            Book Consultation
          </a>
        </div>
      </div>
    </div>
  )
}

function ServiceCard({ service, onClick }) {
  const ref = useReveal({ threshold: 0.1 })

  return (
    <div
      ref={ref}
      onClick={onClick}
      className="card-hover bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer group"
    >
      <div className="relative overflow-hidden h-44">
        <img
          src={service.img}
          alt={service.title}
          onError={(e) => handleImageError(e, service.title)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="absolute bottom-2 right-2 bg-white/90 rounded-full px-2 py-0.5 text-xs font-semibold text-[#2d5a4e] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          View details →
        </div>
      </div>
      <div className="p-4 flex items-center gap-3">
        <span className="text-xl">{service.emoji}</span>
        <p className="font-semibold text-sm text-[rgb(45,52,54)] leading-tight">{service.title}</p>
      </div>
    </div>
  )
}

export default function Services() {
  const [selected, setSelected] = useState(null)
  const { t } = useLang()

  return (
    <section id="services" className="bg-[#f9f7f4] py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-[#c9a87c] text-xs font-bold tracking-widest uppercase mb-3">
            Our Expertise
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-[rgb(45,52,54)] mb-4">
            {t('services_title')}
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Click any service to learn more. Comprehensive aesthetic treatments designed to enhance
            your natural beauty and confidence.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5">
          {services.map((s) => (
            <ServiceCard key={s.title} service={s} onClick={() => setSelected(s)} />
          ))}
        </div>
      </div>

      {selected && <Modal service={selected} onClose={() => setSelected(null)} />}
    </section>
  )
}
