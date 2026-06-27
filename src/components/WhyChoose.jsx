import { useState } from 'react'
import { Syringe, Sparkle, Plant, Drop, Microscope, Star, Bandaids, HairDryer, Pill } from '@phosphor-icons/react'
import { useLang } from '../context/languageStore'
import { useReveal } from '../utils/useReveal'

const tabsMeta = [
  {
    labelKey: 'why_tab1',
    cards: [
      { Icon: Syringe, titleKey: 'why_i1_title', descKey: 'why_i1_desc', tagKey: 'why_popular' },
      { Icon: Sparkle, titleKey: 'why_i2_title', descKey: 'why_i2_desc', tagKey: 'why_popular' },
      { Icon: Plant,   titleKey: 'why_i3_title', descKey: 'why_i3_desc', tagKey: '' },
      { Icon: Drop,    titleKey: 'why_i4_title', descKey: 'why_i4_desc', tagKey: 'why_recommended' },
    ],
  },
  {
    labelKey: 'why_tab2',
    cards: [
      { Icon: Microscope, titleKey: 'why_s1_title', descKey: 'why_s1_desc', tagKey: 'why_popular' },
      { Icon: Star,       titleKey: 'why_s2_title', descKey: 'why_s2_desc', tagKey: '' },
      { Icon: Bandaids,   titleKey: 'why_s3_title', descKey: 'why_s3_desc', tagKey: 'why_recommended' },
    ],
  },
  {
    labelKey: 'why_tab3',
    cards: [
      { Icon: HairDryer, titleKey: 'why_h1_title', descKey: 'why_h1_desc', tagKey: 'why_popular' },
      { Icon: Pill,      titleKey: 'why_h2_title', descKey: 'why_h2_desc', tagKey: 'why_recommended' },
    ],
  },
]

const tagColors = {
  why_popular:     'bg-[#2d5a4e] text-white',
  why_recommended: 'bg-[#c9a87c] text-[rgb(45,52,54)]',
}

function ServiceCard({ card, t }) {
  const ref = useReveal({ threshold: 0.05 })

  return (
    <div ref={ref}
      className="card-hover bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col gap-3">
      <div className="w-12 h-12 bg-[#f0f7f4] rounded-xl flex items-center justify-center">
        <card.Icon className="w-6 h-6 text-[#2d5a4e]" weight="duotone" />
      </div>
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-bold text-[rgb(45,52,54)] text-sm leading-snug">{t(card.titleKey)}</h3>
        {card.tagKey && (
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${tagColors[card.tagKey] || 'bg-gray-100 text-gray-600'}`}>
            {t(card.tagKey)}
          </span>
        )}
      </div>
      <p className="text-gray-500 text-xs leading-relaxed flex-1">{t(card.descKey)}</p>
      <div className="pt-2 border-t border-gray-100">
        <a href="#contact" className="text-xs font-semibold text-[#2d5a4e] border border-[#2d5a4e] px-3 py-1.5 rounded-lg hover:bg-[#2d5a4e] hover:text-white transition-colors duration-200">
          {t('why_book_now')}
        </a>
      </div>
    </div>
  )
}

export default function WhyChoose() {
  const [activeTab, setActiveTab] = useState(0)
  const { t } = useLang()

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-[#836d51] text-xs font-bold tracking-widest uppercase mb-3">{t('why_badge')}</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-[rgb(45,52,54)] mb-4">{t('why_title')}</h2>
          <p className="text-gray-500 max-w-xl mx-auto">{t('why_subtitle')}</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {tabsMeta.map((tab, i) => (
            <button key={tab.labelKey} onClick={() => setActiveTab(i)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                activeTab === i ? 'bg-[#2d5a4e] text-white shadow-md' : 'bg-[#f0f7f4] text-[#2d5a4e] hover:bg-[#d4e8e0]'
              }`}>
              {t(tab.labelKey)}
            </button>
          ))}
        </div>

        <div key={activeTab} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {tabsMeta[activeTab].cards.map((card) => (
            <ServiceCard key={card.titleKey} card={card} t={t} />
          ))}
        </div>
      </div>
    </section>
  )
}
