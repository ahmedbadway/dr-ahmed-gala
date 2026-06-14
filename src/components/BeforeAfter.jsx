import { useEffect, useRef } from 'react'
import { handleImageError } from '../utils/imageHelper'
import { useLang } from '../context/LanguageContext'

const BASE = import.meta.env.BASE_URL

const groupsMeta = [
  { titleKey: 'ba_g1', folder: 'lip-fillers', images: ['lip_1.jpeg','lip_2.jpeg','lip_3.jpeg'] },
  { titleKey: 'ba_g2', folder: 'full-face',   images: ['face_1.jpg','face_2.jpg','face_3.jpg'] },
  { titleKey: 'ba_g3', folder: 'skin',         images: ['skin_1.jpg','skin_2.jpg','skin_3.jpg'] },
  { titleKey: 'ba_g4', folder: 'hair',         images: ['hair_1.jpg','hair_2.jpg','hair_3.jpg'] },
]

function TreatmentGroup({ group, t }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('fade-in-up') },
      { threshold: 0.08 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} style={{ opacity: 0 }} className="mb-14">
      <h3 className="text-xl font-bold text-[rgb(45,52,54)] mb-5 flex items-center gap-3">
        <span className="w-8 h-0.5 bg-[#c9a87c] inline-block" />
        {t(group.titleKey)}
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {group.images.map((img) => (
          <div key={img} className="overflow-hidden rounded-xl shadow-sm border border-gray-100 bg-white card-hover aspect-[4/5]">
            <img
              src={`${BASE}images/before-after/${group.folder}/${img}`}
              alt={t(group.titleKey)}
              onError={(e) => handleImageError(e, t(group.titleKey))}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function BeforeAfter() {
  const { t } = useLang()

  return (
    <section id="gallery" className="bg-[#f9f7f4] py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-[#c9a87c] text-xs font-bold tracking-widest uppercase mb-3">{t('ba_badge')}</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-[rgb(45,52,54)] mb-4">
            {t('ba_title1')}{' '}
            <span className="text-[#2d5a4e]">{t('ba_title2')}</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">{t('ba_subtitle')}</p>
        </div>
        {groupsMeta.map((group) => (
          <TreatmentGroup key={group.folder} group={group} t={t} />
        ))}
      </div>
    </section>
  )
}
