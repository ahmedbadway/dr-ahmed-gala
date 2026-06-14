import { useState } from 'react'
import { useLang } from '../context/languageStore'
import { useReveal } from '../utils/useReveal'

const categories = [
  {
    label: 'Aesthetic Medicine',
    questions: [
      {
        q: 'What is the difference between Botox and Fillers?',
        a: 'Botox relaxes muscles to reduce wrinkles, while fillers add volume and contour facial features. Both are non-surgical and complementary treatments.',
      },
      {
        q: 'How long do fillers last?',
        a: 'Depending on the area and product used, fillers typically last 6-18 months. Lip fillers last 6-12 months, while cheek fillers can last up to 18 months.',
      },
      {
        q: 'Is the procedure painful?',
        a: 'Most treatments use topical anesthesia to minimize discomfort. Most patients describe the sensation as mild pressure rather than pain.',
      },
      {
        q: 'When will I see results?',
        a: 'Filler results are immediate. Botox takes 3-7 days to show full effect. Skin boosters show improvement over 2-4 weeks.',
      },
      {
        q: 'How many sessions do I need?',
        a: 'Most patients achieve their goals in 1-2 sessions. A personalized plan is created during your consultation with Dr. Ahmed Galal.',
      },
      {
        q: 'Is it safe?',
        a: 'All procedures are performed by Dr. Ahmed Galal using FDA-approved products and sterile medical-grade techniques.',
      },
    ],
  },
  {
    label: 'General Skin',
    questions: [
      {
        q: 'How do I know my skin type?',
        a: 'After cleansing, wait 2 hours. If your skin feels tight: Dry. Shiny all over: Oily. Shiny in T-zone only: Combination. Comfortable: Normal.',
      },
      {
        q: 'When should I start anti-aging treatments?',
        a: 'Prevention is key. Starting in your mid-20s with skin boosters and quality skincare can significantly slow the aging process.',
      },
      {
        q: 'How long does it take to see results from skin treatments?',
        a: 'On average 4-12 weeks for skin quality treatments. Injectable results can be seen immediately or within 7 days.',
      },
    ],
  },
]

function AccordionItem({ question, answer, isOpen, onToggle }) {
  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left gap-4 group"
        aria-expanded={isOpen}
      >
        <span className="text-[rgb(45,52,54)] font-semibold text-sm sm:text-base leading-snug group-hover:text-[#2d5a4e] transition-colors">
          {question}
        </span>
        <span
          className="flex-shrink-0 w-7 h-7 rounded-full border-2 border-[#2d5a4e] flex items-center justify-center text-[#2d5a4e] font-bold text-lg transition-transform duration-300"
          style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}
        >
          +
        </span>
      </button>
      <div
        style={{
          display: 'grid',
          gridTemplateRows: isOpen ? '1fr' : '0fr',
          transition: 'grid-template-rows 0.35s ease',
        }}
      >
        <div style={{ overflow: 'hidden' }}>
          <p className="text-gray-500 text-sm leading-relaxed pb-5 pr-10">{answer}</p>
        </div>
      </div>
    </div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)
  const sectionRef = useReveal({ threshold: 0.1 })
  const { t } = useLang()

  return (
    <section className="bg-[#f9f7f4] py-20 lg:py-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={sectionRef}
          className="text-center mb-14"
        >
          <p className="text-[#c9a87c] text-xs font-bold tracking-widest uppercase mb-3">
            Knowledge Base
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-[rgb(45,52,54)] mb-4">
            {t('faq_title')}
          </h2>
          <p className="text-gray-500 max-w-md mx-auto text-sm">
            {t('faq_subtitle')}
          </p>
        </div>

        {/* Accordion grouped by category */}
        {categories.map((cat, ci) => (
          <div key={ci} className="mb-8">
            <p className="text-xs font-bold tracking-widest uppercase text-[#2d5a4e] mb-4">
              {cat.label}
            </p>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-6">
              {cat.questions.map((item, qi) => {
                const key = `${ci}-${qi}`
                return (
                  <AccordionItem
                    key={key}
                    question={item.q}
                    answer={item.a}
                    isOpen={openIndex === key}
                    onToggle={() => setOpenIndex(openIndex === key ? null : key)}
                  />
                )
              })}
            </div>
          </div>
        ))}

        {/* Still have questions CTA */}
        <div className="mt-12 bg-[#2d5a4e] rounded-2xl p-8 text-center text-white">
          <h3 className="text-xl font-bold mb-2">{t('still_questions')}</h3>
          <p className="text-green-200 text-sm mb-6">
            Dr. Ahmed Galal is happy to answer any question before you book.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="tel:+201113337472"
              className="inline-flex items-center justify-center gap-2 bg-white text-[#2d5a4e] font-semibold px-6 py-3 rounded-full text-sm hover:bg-green-50 transition-colors"
            >
              <span>📞</span> Call Dr. Ahmed Galal
            </a>
            <a
              href="https://wa.me/201113337472"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-semibold px-6 py-3 rounded-full text-sm hover:bg-[#1ebe5d] transition-colors"
            >
              <span>💬</span> WhatsApp
            </a>
            <a
              href="https://instagram.com/drahmedgalal.g"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white font-semibold px-6 py-3 rounded-full text-sm hover:opacity-90 transition-opacity"
            >
              <span>📸</span> Instagram
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
