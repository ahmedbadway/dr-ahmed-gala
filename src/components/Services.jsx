import { useEffect, useRef, useState } from 'react'
import { handleImageError } from '../utils/imageHelper'
import { useLang } from '../context/LanguageContext'

const BASE = import.meta.env.BASE_URL

const servicesMeta = [
  { img: `${BASE}images/services/fillers.png`,   emoji: '💉', titleKey: 'svc1_title', descKey: 'svc1_desc',
    details: ['Cheek & jawline contouring','Nasolabial fold correction','Under-eye (tear trough) filler','Non-surgical rhinoplasty','Chin augmentation'] },
  { img: `${BASE}images/services/antiaging.png`, emoji: '✨', titleKey: 'svc2_title', descKey: 'svc2_desc',
    details: ['Forehead & frown lines','Crow\'s feet treatment','Brow lift & shaping','Masseter slimming (jaw Botox)','Lip flip & gummy smile correction'] },
  { img: `${BASE}images/services/skin.jpg`,      emoji: '🌱', titleKey: 'svc3_title', descKey: 'svc3_desc',
    details: ['Sculptra (poly-L-lactic acid)','Radiesse (calcium hydroxyapatite)','Gradual, natural-looking results','Long-lasting effect (12–24 months)','Full-face or targeted application'] },
  { img: `${BASE}images/services/facial.jpg`,    emoji: '💧', titleKey: 'svc4_title', descKey: 'svc4_desc',
    details: ['Profhilo & Juvederm Volite','Vitamin & antioxidant cocktails','Deep skin hydration','Pore minimising & glow boost','Face, neck, hands & décolletage'] },
  { img: `${BASE}images/services/skin2.jpg`,     emoji: '🔬', titleKey: 'svc5_title', descKey: 'svc5_desc',
    details: ['Laser resurfacing & pigmentation','Chemical peels (superficial to deep)','Microneedling with PRP','Acne & post-acne scar revision','Personalised medical skincare plan'] },
  { img: `${BASE}images/services/hair.png`,      emoji: '💆', titleKey: 'svc6_title', descKey: 'svc6_desc',
    details: ['PRP (Platelet-Rich Plasma) therapy','Scalp mesotherapy','Hair loss diagnosis & blood tests','Topical & oral treatment plans','Maintenance & follow-up sessions'] },
]

function Modal({ service, onClose, t }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="relative h-52 overflow-hidden rounded-t-2xl">
          <img src={service.img} alt={t(service.titleKey)} onError={(e) => handleImageError(e, t(service.titleKey))} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-gray-700 hover:bg-white font-bold text-lg leading-none" aria-label="Close">×</button>
          <div className="absolute bottom-4 left-5 flex items-center gap-2">
            <span className="text-2xl">{service.emoji}</span>
            <h3 className="text-white font-bold text-lg leading-tight">{t(service.titleKey)}</h3>
          </div>
        </div>
        <div className="p-6">
          <p className="text-gray-600 leading-relaxed mb-5">{t(service.descKey)}</p>
          <div className="mb-6">
            <p className="text-xs font-bold text-[#c9a87c] uppercase tracking-widest mb-3">{t('services_included')}</p>
            <ul className="space-y-2">
              {service.details.map((d) => (
                <li key={d} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="text-[#2d5a4e] font-bold mt-0.5">✓</span>{d}
                </li>
              ))}
            </ul>
          </div>
          <a href="#contact" onClick={onClose} className="block w-full bg-[#2d5a4e] text-white font-semibold py-3.5 rounded-xl text-center hover:bg-[#234840] transition-colors duration-200">
            {t('services_book')}
          </a>
        </div>
      </div>
    </div>
  )
}

function ServiceCard({ service, onClick, t }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('fade-in-up') },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} style={{ opacity: 0 }} onClick={onClick}
      className="card-hover bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer group">
      <div className="relative overflow-hidden h-44">
        <img src={service.img} alt={t(service.titleKey)} onError={(e) => handleImageError(e, t(service.titleKey))}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="absolute bottom-2 right-2 bg-white/90 rounded-full px-2 py-0.5 text-xs font-semibold text-[#2d5a4e] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          View details →
        </div>
      </div>
      <div className="p-4 flex items-center gap-3">
        <span className="text-xl">{service.emoji}</span>
        <p className="font-semibold text-sm text-[rgb(45,52,54)] leading-tight">{t(service.titleKey)}</p>
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
          <p className="text-[#c9a87c] text-xs font-bold tracking-widest uppercase mb-3">{t('services_badge')}</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-[rgb(45,52,54)] mb-4">{t('services_title')}</h2>
          <p className="text-gray-500 max-w-xl mx-auto">{t('services_subtitle')}</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {servicesMeta.map((s) => (
            <ServiceCard key={s.titleKey} service={s} onClick={() => setSelected(s)} t={t} />
          ))}
        </div>
      </div>
      {selected && <Modal service={selected} onClose={() => setSelected(null)} t={t} />}
    </section>
  )
}
