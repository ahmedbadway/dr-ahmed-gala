import { useState } from 'react'
import { Syringe, Sparkle, Plant, Drop, Microscope, Star, Bandaids, Pill, HairDryer } from '@phosphor-icons/react'
import { useLang } from '../context/languageStore'
import { useReveal } from '../utils/useReveal'

const tabIcons = [
  [Syringe, Sparkle, Plant, Drop],
  [Microscope, Star, Bandaids],
  [HairDryer, Pill],
]

const tagColors = {
  Popular: 'bg-[#2d5a4e] text-white',
  Recommended: 'bg-[#c9a87c] text-white',
}

function ServiceCard({ card, Icon, tagLabel, bookNow }) {
  const ref = useReveal({ threshold: 0.05 })

  return (
    <div
      ref={ref}
      className="card-hover bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col gap-3"
    >
      <div className="w-12 h-12 bg-[#f0f7f4] rounded-xl flex items-center justify-center">
        <Icon className="w-6 h-6 text-[#2d5a4e]" weight="duotone" />
      </div>
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-bold text-[rgb(45,52,54)] text-sm leading-snug">{card.title}</h3>
        {card.tag && (
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${tagColors[card.tag] || 'bg-gray-100 text-gray-600'}`}>
            {tagLabel}
          </span>
        )}
      </div>
      <p className="text-gray-500 text-xs leading-relaxed flex-1">{card.desc}</p>
      <div className="pt-2 border-t border-gray-100">
        <a href="#contact" className="text-xs font-semibold text-[#2d5a4e] border border-[#2d5a4e] px-3 py-1.5 rounded-lg hover:bg-[#2d5a4e] hover:text-white transition-colors duration-200">
          {bookNow}
        </a>
      </div>
    </div>
  )
}

export default function WhyChoose() {
  const [activeTab, setActiveTab] = useState(0)
  const { t, dict } = useLang()
  const tabs = dict.whyChoose.tabs

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-[#c9a87c] text-xs font-bold tracking-widest uppercase mb-3">
            {t('whyChoose.eyebrow')}
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-[rgb(45,52,54)] mb-4">
            {t('whyChoose.heading1')}{' '}
            <span className="text-[#2d5a4e] italic">{t('whyChoose.heading2')}</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            {t('whyChoose.subtitle')}
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
          {tabs[activeTab].cards.map((card, i) => (
            <ServiceCard
              key={card.title}
              card={card}
              Icon={tabIcons[activeTab][i]}
              tagLabel={card.tag === 'Popular' ? t('whyChoose.tagPopular') : card.tag === 'Recommended' ? t('whyChoose.tagRecommended') : ''}
              bookNow={t('whyChoose.bookNow')}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
