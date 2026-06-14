import { useEffect, useState } from 'react'
import { Syringe, Sparkle, Plant, Drop, Microscope, HairDryer, Check, ArrowUpRight } from '@phosphor-icons/react'
import { handleImageError } from '../utils/imageHelper'
import { useLang } from '../context/languageStore'
import { useReveal } from '../utils/useReveal'

const BASE = import.meta.env.BASE_URL

const serviceMeta = [
  { img: `${BASE}images/services/fillers.png`, icon: Syringe },
  { img: `${BASE}images/services/antiaging.png`, icon: Sparkle },
  { img: `${BASE}images/services/skin.jpg`, icon: Plant },
  { img: `${BASE}images/services/facial.jpg`, icon: Drop },
  { img: `${BASE}images/services/skin2.jpg`, icon: Microscope },
  { img: `${BASE}images/services/hair.JPG`, icon: HairDryer },
]

function Modal({ service, onClose, t }) {
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
            <service.icon className="w-6 h-6 text-white" weight="duotone" />
            <h3 className="text-white font-bold text-lg leading-tight">{service.title}</h3>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-600 leading-relaxed mb-5">{service.desc}</p>

          <div className="mb-6">
            <p className="text-xs font-bold text-[#c9a87c] uppercase tracking-widest mb-3">
              {t('services.included')}
            </p>
            <ul className="space-y-2">
              {service.details.map((d) => (
                <li key={d} className="flex items-start gap-2 text-sm text-gray-600">
                  <Check className="text-[#2d5a4e] w-4 h-4 mt-0.5 flex-shrink-0" weight="bold" />
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
            {t('services.modalCta')}
          </a>
        </div>
      </div>
    </div>
  )
}

function ServiceCard({ service, onClick, t }) {
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
        <div className="absolute bottom-2 right-2 bg-white/90 rounded-full px-2 py-0.5 text-xs font-semibold text-[#2d5a4e] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-1">
          {t('services.viewDetails')} <ArrowUpRight className="w-3 h-3" />
        </div>
      </div>
      <div className="p-4 flex items-center gap-3">
        <service.icon className="w-5 h-5 text-[#2d5a4e]" weight="duotone" />
        <p className="font-semibold text-sm text-[rgb(45,52,54)] leading-tight">{service.title}</p>
      </div>
    </div>
  )
}

export default function Services() {
  const [selected, setSelected] = useState(null)
  const { t, dict } = useLang()

  const services = dict.services.items.map((item, i) => ({ ...item, ...serviceMeta[i] }))

  return (
    <section id="services" className="bg-[#f9f7f4] py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-[#c9a87c] text-xs font-bold tracking-widest uppercase mb-3">
            {t('services.eyebrow')}
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-[rgb(45,52,54)] mb-4">
            {t('services.title')}
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5">
          {services.map((s) => (
            <ServiceCard key={s.title} service={s} onClick={() => setSelected(s)} t={t} />
          ))}
        </div>
      </div>

      {selected && <Modal service={selected} onClose={() => setSelected(null)} t={t} />}
    </section>
  )
}
