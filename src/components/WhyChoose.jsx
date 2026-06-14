import { useState } from 'react'
import { useReveal } from '../utils/useReveal'

const tabs = [
  {
    label: 'Injectables',
    cards: [
      {
        icon: '💉',
        title: 'Advanced Fillers & Contouring',
        desc: 'Precision facial sculpting and volume restoration using hyaluronic acid and collagen stimulators.',
        tag: 'Popular',
      },
      {
        icon: '✨',
        title: 'Botox Techniques',
        desc: 'Expert neurotoxin application for natural, non-frozen results. Forehead, brow lift, masseter, and more.',
        tag: 'Popular',
      },
      {
        icon: '🌱',
        title: 'Bio-stimulators',
        desc: 'Collagen regeneration treatments (Sculptra, Radiesse) for long-term skin quality improvement.',
        tag: '',
      },
      {
        icon: '💧',
        title: 'Skin Boosters & Mesotherapy',
        desc: 'Deep hydration and skin quality enhancement through micro-injection of vitamins and hyaluronic acid.',
        tag: 'Recommended',
      },
    ],
  },
  {
    label: 'Skin Treatments',
    cards: [
      {
        icon: '🔬',
        title: 'Comprehensive Skin Treatments',
        desc: 'Medical-grade skincare and rejuvenation protocols including chemical peels, laser, and microneedling.',
        tag: 'Popular',
      },
      {
        icon: '🌟',
        title: 'Pigmentation Correction',
        desc: 'Targeted laser and peel treatments to even skin tone, reduce dark spots and post-inflammatory marks.',
        tag: '',
      },
      {
        icon: '🩹',
        title: 'Acne Scar Revision',
        desc: 'Combination laser resurfacing and microneedling protocols for significant scar improvement.',
        tag: 'Recommended',
      },
    ],
  },
  {
    label: 'Hair & Scalp',
    cards: [
      {
        icon: '💆',
        title: 'Hair & Scalp Treatments',
        desc: 'Advanced solutions for hair health including PRP therapy, mesotherapy, and medical-grade scalp protocols.',
        tag: 'Popular',
      },
      {
        icon: '💊',
        title: 'Hair Loss Consultation',
        desc: 'Comprehensive diagnosis and fully personalised treatment plan for all types of hair loss conditions.',
        tag: 'Recommended',
      },
    ],
  },
]

const tagColors = {
  Popular: 'bg-[#2d5a4e] text-white',
  Recommended: 'bg-[#c9a87c] text-white',
}

function ServiceCard({ card }) {
  const ref = useReveal({ threshold: 0.05 })

  return (
    <div
      ref={ref}
      className="card-hover bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col gap-3"
    >
      <div className="w-12 h-12 bg-[#f0f7f4] rounded-xl flex items-center justify-center text-2xl">
        {card.icon}
      </div>
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-bold text-[rgb(45,52,54)] text-sm leading-snug">{card.title}</h3>
        {card.tag && (
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${tagColors[card.tag] || 'bg-gray-100 text-gray-600'}`}>
            {card.tag}
          </span>
        )}
      </div>
      <p className="text-gray-500 text-xs leading-relaxed flex-1">{card.desc}</p>
      <div className="pt-2 border-t border-gray-100">
        <a href="#contact" className="text-xs font-semibold text-[#2d5a4e] border border-[#2d5a4e] px-3 py-1.5 rounded-lg hover:bg-[#2d5a4e] hover:text-white transition-colors duration-200">
          Book Now
        </a>
      </div>
    </div>
  )
}

export default function WhyChoose() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-[#c9a87c] text-xs font-bold tracking-widest uppercase mb-3">
            Areas of Expertise
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-[rgb(45,52,54)] mb-4">
            Treatments by{' '}
            <span className="text-[#2d5a4e] italic">Dr. Ahmed Galal</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Every treatment is crafted with precision and designed around your goals — from first
            consultation to final result.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {tabs.map((tab, i) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(i)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                activeTab === i
                  ? 'bg-[#2d5a4e] text-white shadow-md'
                  : 'bg-[#f0f7f4] text-[#2d5a4e] hover:bg-[#d4e8e0]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Cards grid */}
        <div key={activeTab} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {tabs[activeTab].cards.map((card) => (
            <ServiceCard key={card.title} card={card} />
          ))}
        </div>
      </div>
    </section>
  )
}
