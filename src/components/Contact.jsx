import { useState, useEffect, useRef } from 'react'
import emailjs from '@emailjs/browser'
import { useLang } from '../context/LanguageContext'

const EMAILJS_SERVICE  = 'ahmedbooks'
const EMAILJS_TEMPLATE = 'template_u81hvqb'
const EMAILJS_KEY      = 'ju5jjkSKHDueNCnrd'

const treatmentKeys = ['treat_opt1','treat_opt2','treat_opt3','treat_opt4','treat_opt5','treat_opt6']

const clinicInfo = [
  {
    icon: '📍', titleKey: 'contact_c1_title',
    lines: ['Izar Plaza Mall', 'Palm Hills, Sheikh Zayed, Cairo', '📅 Wed: 3 PM – 8 PM'],
  },
  {
    icon: '📍', titleKey: 'contact_c2_title',
    lines: ['Concord Plaza Mall', '90th Street, New Cairo, Cairo', '📅 Mon: 5–9 PM · Tue: 1–8 PM'],
  },
  {
    icon: '📞', titleKey: 'contact_phone_title',
    lines: ['+20 111 333 7472'],
  },
  {
    icon: '✉️', titleKey: 'contact_email_title',
    lines: ['galal.ahmedamer@gmail.com'],
  },
]

export default function Contact() {
  const [form, setForm]     = useState({ name: '', phone: '', email: '', treatment: '', message: '' })
  const [status, setStatus] = useState('idle')
  const formRef    = useRef(null)
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

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await emailjs.send(EMAILJS_SERVICE, EMAILJS_TEMPLATE, { ...form }, EMAILJS_KEY)
      setStatus('success')
      setForm({ name: '', phone: '', email: '', treatment: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  const inputCls = "w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2d5a4e]/30 focus:border-[#2d5a4e] transition-all"

  return (
    <section id="contact" className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-[#c9a87c] text-xs font-bold tracking-widest uppercase mb-3">{t('contact_badge')}</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-[rgb(45,52,54)] mb-4">{t('contact_title')}</h2>
          <p className="text-gray-500 max-w-xl mx-auto">{t('contact_subtitle')}</p>
        </div>

        <div ref={sectionRef} style={{ opacity: 0 }} className="grid lg:grid-cols-2 gap-12">

          {/* Form */}
          <div className="bg-[#f9f7f4] rounded-2xl p-8 border border-gray-100">
            {status === 'success' ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="text-xl font-bold text-[#2d5a4e] mb-2">{t('contact_success_h')}</h3>
                <p className="text-gray-500">{t('contact_success_p')}</p>
                <button onClick={() => setStatus('idle')} className="mt-6 text-sm text-[#2d5a4e] underline">
                  {t('contact_btn_again')}
                </button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">{t('contact_lbl_name')}</label>
                    <input type="text" name="name" required value={form.name} onChange={handleChange}
                      placeholder={t('contact_ph_name')} className={inputCls} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">{t('contact_lbl_phone')}</label>
                    <input type="tel" name="phone" required value={form.phone} onChange={handleChange}
                      placeholder={t('contact_ph_phone')} className={inputCls} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">{t('contact_lbl_email')}</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange}
                    placeholder={t('contact_ph_email')} className={inputCls} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">{t('contact_lbl_treat')}</label>
                  <select name="treatment" value={form.treatment} onChange={handleChange}
                    className={`${inputCls} text-gray-600`}>
                    <option value="">{t('contact_ph_treat')}</option>
                    {treatmentKeys.map((key) => (
                      <option key={key} value={t(key)}>{t(key)}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">{t('contact_lbl_msg')}</label>
                  <textarea name="message" value={form.message} onChange={handleChange} rows={4}
                    placeholder={t('contact_ph_msg')}
                    className={`${inputCls} resize-none`} />
                </div>

                {status === 'error' && (
                  <p className="text-red-500 text-sm text-center">{t('contact_error')}</p>
                )}

                <div className="flex items-center gap-4 pt-2">
                  <button type="submit" disabled={status === 'sending'}
                    className="flex-1 bg-[#2d5a4e] text-white font-semibold py-3.5 rounded-xl hover:bg-[#234840] transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed">
                    {status === 'sending' ? t('contact_sending') : t('contact_btn_book')}
                  </button>
                  <a href="tel:+20111333472"
                    className="flex-1 border border-[#2d5a4e] text-[#2d5a4e] font-semibold py-3.5 rounded-xl text-center hover:bg-[#f0f7f4] transition-colors duration-200 text-sm">
                    {t('contact_btn_call')}
                  </a>
                </div>
              </form>
            )}
          </div>

          {/* Contact info */}
          <div className="flex flex-col gap-6">
            <div>
              <h3 className="font-bold text-xl text-[rgb(45,52,54)] mb-2">{t('contact_info_h')}</h3>
              <p className="text-gray-500 text-sm">{t('contact_info_p')}</p>
            </div>

            {clinicInfo.map((item) => (
              <div key={item.titleKey} className="flex items-start gap-4 p-5 bg-[#f9f7f4] rounded-xl border border-gray-100">
                <div className="w-10 h-10 bg-[#2d5a4e] rounded-xl flex items-center justify-center text-lg flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <p className="font-semibold text-sm text-[rgb(45,52,54)] mb-1">{t(item.titleKey)}</p>
                  {item.lines.map((line) => (
                    <p key={line} className="text-gray-500 text-sm">{line}</p>
                  ))}
                </div>
              </div>
            ))}

            <div className="flex items-center gap-3 mt-2">
              <p className="text-sm font-semibold text-gray-600">{t('contact_follow')}</p>
              <a href="https://instagram.com/drahmedgalal.g" target="_blank" rel="noopener noreferrer"
                className="text-xs font-medium text-[#2d5a4e] bg-[#f0f7f4] px-3 py-1.5 rounded-lg hover:bg-[#d4e8e0] transition-colors">
                📸 @drahmedgalal.g
              </a>
              <a href="https://tiktok.com/@drahmedgalal_g" target="_blank" rel="noopener noreferrer"
                className="text-xs font-medium text-[#2d5a4e] bg-[#f0f7f4] px-3 py-1.5 rounded-lg hover:bg-[#d4e8e0] transition-colors">
                🎵 @drahmedgalal_g
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
