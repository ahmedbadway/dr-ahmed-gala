import { handleImageError } from '../utils/imageHelper'
import { useLang } from '../context/languageStore'
import { useReveal } from '../utils/useReveal'

export default function About() {
  const { t } = useLang()
  const ref = useReveal()

  return (
    <section id="about" className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Doctor photo */}
          <div className="relative">
            <div className="absolute -bottom-4 -left-4 w-full h-full bg-[#2d5a4e]/8 rounded-2xl"></div>
            <img
              src={`${import.meta.env.BASE_URL}images/team/doctor2.jpeg`}
              alt="Dr. Ahmed Galal — Aesthetic Dermatologist & Expert Injector"
              onError={(e) => handleImageError(e, 'Dr. Ahmed Galal')}
              className="relative rounded-2xl shadow-xl w-full object-cover"
            />
            {/* Experience badge */}
            <div className="absolute -right-4 top-8 bg-[#2d5a4e] text-white rounded-xl p-4 shadow-lg">
              <p className="text-2xl font-bold">5+</p>
              <p className="text-xs font-medium opacity-90">Years of</p>
              <p className="text-xs font-medium opacity-90">Excellence</p>
            </div>
            {/* Name plate */}
            <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-xl px-5 py-4 shadow-lg">
              <p className="font-bold text-[rgb(45,52,54)]">{t('about_title')}</p>
              <p className="text-sm text-[#2d5a4e] font-medium">{t('about_subtitle')}</p>
              <p className="text-xs text-gray-400 mt-0.5">5,000+ Patients · 98% Satisfaction Rate</p>
            </div>
          </div>

          {/* Bio text */}
          <div>
            <p className="text-[#c9a87c] text-xs font-bold tracking-widest uppercase mb-3">
              About Dr. Galal
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-[rgb(45,52,54)] leading-tight mb-6">
              Medical Precision.{' '}
              <span className="text-[#2d5a4e] italic">Natural Beauty.</span>
            </h2>
            <p className="text-gray-600 leading-relaxed mb-5">
              Dr Ahmed Galal is a highly experienced aesthetic dermatologist and advanced injector,
              known for delivering natural results, medical precision, and long-term skin quality
              improvement.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              With a focus on skin quality, safety, and long-term results, Dr Galal combines medical
              expertise with artistic vision to enhance natural beauty while maintaining facial harmony
              and individual character.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { icon: '🏆', title: 'Board Certified', desc: 'Dermatology & Aesthetic Medicine' },
                { icon: '💉', title: 'Expert Injector', desc: 'Advanced injectable techniques' },
                { icon: '🌿', title: 'Natural Results', desc: 'Facial harmony preserved' },
                { icon: '🔬', title: 'Medical Approach', desc: '100% evidence-based care' },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-3 p-4 bg-[#f9f7f4] rounded-xl">
                  <span className="text-xl">{item.icon}</span>
                  <div>
                    <p className="text-sm font-semibold text-[rgb(45,52,54)]">{item.title}</p>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-[#2d5a4e] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#234840] transition-colors duration-200"
            >
              Book a Consultation
              <span>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
