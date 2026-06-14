import { useState } from 'react'
import { Phone, WhatsappLogo, InstagramLogo } from '@phosphor-icons/react'
import { useLang } from '../context/languageStore'
import { useReveal } from '../utils/useReveal'

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
  const { t, dict } = useLang()
  const categories = dict.faq.categories

  return (
    <section className="bg-[#f9f7f4] py-20 lg:py-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={sectionRef}
          className="text-center mb-14"
        >
          <p className="text-[#c9a87c] text-xs font-bold tracking-widest uppercase mb-3">
            {t('faq.eyebrow')}
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-[rgb(45,52,54)] mb-4">
            {t('faq.title')}
          </h2>
          <p className="text-gray-500 max-w-md mx-auto text-sm">
            {t('faq.subtitle')}
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
          <h3 className="text-xl font-bold mb-2">{t('faq.stillQuestions')}</h3>
          <p className="text-green-200 text-sm mb-6">
            {t('faq.stillDesc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="tel:+201113337472"
              className="inline-flex items-center justify-center gap-2 bg-white text-[#2d5a4e] font-semibold px-6 py-3 rounded-full text-sm hover:bg-green-50 transition-colors"
            >
              <Phone weight="fill" className="w-4 h-4" /> {t('faq.ctaCall')}
            </a>
            <a
              href="https://wa.me/201113337472"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-semibold px-6 py-3 rounded-full text-sm hover:bg-[#1ebe5d] transition-colors"
            >
              <WhatsappLogo weight="fill" className="w-4 h-4" /> {t('faq.ctaWhatsapp')}
            </a>
            <a
              href="https://instagram.com/drahmedgalal.g"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white font-semibold px-6 py-3 rounded-full text-sm hover:opacity-90 transition-opacity"
            >
              <InstagramLogo weight="fill" className="w-4 h-4" /> {t('faq.ctaInstagram')}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
