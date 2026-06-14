import { useState, useRef, useEffect } from 'react'
import { useLang } from '../context/LanguageContext'

const categoriesMeta = [
  {
    labelKey: 'faq_cat1',
    questions: [
      { qKey: 'faq_q1', aKey: 'faq_a1' },
      { qKey: 'faq_q2', aKey: 'faq_a2' },
      { qKey: 'faq_q3', aKey: 'faq_a3' },
      { qKey: 'faq_q4', aKey: 'faq_a4' },
      { qKey: 'faq_q5', aKey: 'faq_a5' },
      { qKey: 'faq_q6', aKey: 'faq_a6' },
    ],
  },
  {
    labelKey: 'faq_cat2',
    questions: [
      { qKey: 'faq_q7', aKey: 'faq_a7' },
      { qKey: 'faq_q8', aKey: 'faq_a8' },
      { qKey: 'faq_q9', aKey: 'faq_a9' },
    ],
  },
]

function AccordionItem({ question, answer, isOpen, onToggle }) {
  const bodyRef = useRef(null)

  return (
    <div className="border-b border-gray-200 last:border-0">
      <button onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left gap-4 group"
        aria-expanded={isOpen}>
        <span className="text-[rgb(45,52,54)] font-semibold text-sm sm:text-base leading-snug group-hover:text-[#2d5a4e] transition-colors">
          {question}
        </span>
        <span className="flex-shrink-0 w-7 h-7 rounded-full border-2 border-[#2d5a4e] flex items-center justify-center text-[#2d5a4e] font-bold text-lg transition-transform duration-300"
          style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}>
          +
        </span>
      </button>
      <div ref={bodyRef} style={{ maxHeight: isOpen ? bodyRef.current?.scrollHeight + 'px' : '0px', overflow: 'hidden', transition: 'max-height 0.35s ease' }}>
        <p className="text-gray-500 text-sm leading-relaxed pb-5 pr-10">{answer}</p>
      </div>
    </div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)
  const sectionRef = useRef(null)
  const { t } = useLang()

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('fade-in-up') },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="faq" className="bg-[#f9f7f4] py-20 lg:py-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        <div ref={sectionRef} style={{ opacity: 0 }} className="text-center mb-14">
          <p className="text-[#c9a87c] text-xs font-bold tracking-widest uppercase mb-3">{t('faq_badge')}</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-[rgb(45,52,54)] mb-4">{t('faq_title')}</h2>
          <p className="text-gray-500 max-w-md mx-auto text-sm">{t('faq_subtitle')}</p>
        </div>

        {categoriesMeta.map((cat, ci) => (
          <div key={ci} className="mb-8">
            <p className="text-xs font-bold tracking-widest uppercase text-[#2d5a4e] mb-4">{t(cat.labelKey)}</p>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-6">
              {cat.questions.map((item, qi) => {
                const key = `${ci}-${qi}`
                return (
                  <AccordionItem
                    key={key}
                    question={t(item.qKey)}
                    answer={t(item.aKey)}
                    isOpen={openIndex === key}
                    onToggle={() => setOpenIndex(openIndex === key ? null : key)}
                  />
                )
              })}
            </div>
          </div>
        ))}

        <div className="mt-12 bg-[#2d5a4e] rounded-2xl p-8 text-center text-white">
          <h3 className="text-xl font-bold mb-2">{t('still_questions')}</h3>
          <p className="text-green-200 text-sm mb-6">{t('faq_cta_sub')}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="tel:00201113337472"
              className="inline-flex items-center justify-center gap-2 bg-white text-[#2d5a4e] font-semibold px-6 py-3 rounded-full text-sm hover:bg-green-50 transition-colors">
              <span>📞</span> {t('faq_call')}
            </a>
            <a href="https://wa.me/201113337472" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-semibold px-6 py-3 rounded-full text-sm hover:bg-[#1ebe5d] transition-colors">
              <span>💬</span> WhatsApp
            </a>
            <a href="https://instagram.com/drahmedgalal.g" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white font-semibold px-6 py-3 rounded-full text-sm hover:opacity-90 transition-opacity">
              <span>📸</span> Instagram
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
