import { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'
import { CheckCircle, Phone, MapPin, EnvelopeSimple, InstagramLogo, TiktokLogo, Clock } from '@phosphor-icons/react'
import { useLang } from '../context/languageStore'
import { useReveal } from '../utils/useReveal'

const EMAILJS_SERVICE  = 'ahmedbooks'
const EMAILJS_TEMPLATE = 'template_u81hvqb'
const EMAILJS_KEY      = 'ju5jjkSKHDueNCnrd'

const infoIcons = [MapPin, MapPin, Phone, EnvelopeSimple]

export default function Contact() {
  const [form, setForm]           = useState({ name: '', phone: '', email: '', treatment: '', message: '' })
  const [status, setStatus]       = useState('idle') // idle | sending | success | error
  const formRef = useRef(null)
  const sectionRef = useReveal({ threshold: 0.1 })
  const { t, dict } = useLang()
  const treatments = dict.services.items.map((s) => s.title)
  const c = dict.contact

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    const templateParams = {
      name:      form.name,
      phone:     form.phone,
      email:     form.email,
      treatment: form.treatment,
      message:   form.message,
    }

    try {
      await emailjs.send(
        EMAILJS_SERVICE,
        EMAILJS_TEMPLATE,
        templateParams,
        EMAILJS_KEY
      )
      setStatus('success')
      setForm({ name: '', phone: '', email: '', treatment: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-[#c9a87c] text-xs font-bold tracking-widest uppercase mb-3">
            {t('contact.eyebrow')}
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-[rgb(45,52,54)] mb-4">
            {t('contact.title')}
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        <div ref={sectionRef} className="grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <div className="bg-[#f9f7f4] rounded-2xl p-8 border border-gray-100">
            {status === 'success' ? (
              <div className="text-center py-12">
                <CheckCircle weight="fill" className="w-12 h-12 text-[#2d5a4e] mx-auto mb-4" />
                <h3 className="text-xl font-bold text-[#2d5a4e] mb-2">{c.form.successTitle}</h3>
                <p className="text-gray-500">
                  {c.form.successDesc}
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-6 text-sm text-[#2d5a4e] underline"
                >
                  {c.form.sendAnother}
                </button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">{c.form.nameLabel}</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder={c.form.namePlaceholder}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2d5a4e]/30 focus:border-[#2d5a4e] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">{c.form.phoneLabel}</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={form.phone}
                      onChange={handleChange}
                      placeholder={c.form.phonePlaceholder}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2d5a4e]/30 focus:border-[#2d5a4e] transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">{c.form.emailLabel}</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder={c.form.emailPlaceholder}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2d5a4e]/30 focus:border-[#2d5a4e] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">{c.form.treatmentLabel}</label>
                  <select
                    name="treatment"
                    value={form.treatment}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2d5a4e]/30 focus:border-[#2d5a4e] transition-all text-gray-600"
                  >
                    <option value="">{c.form.treatmentPlaceholder}</option>
                    {treatments.map((tr) => (
                      <option key={tr} value={tr}>{tr}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">{c.form.messageLabel}</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder={c.form.messagePlaceholder}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2d5a4e]/30 focus:border-[#2d5a4e] transition-all resize-none"
                  />
                </div>

                {status === 'error' && (
                  <p className="text-red-500 text-sm text-center">
                    {c.form.errorMsg}
                  </p>
                )}

                <div className="flex items-center gap-4 pt-2">
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="flex-1 bg-[#2d5a4e] text-white font-semibold py-3.5 rounded-xl hover:bg-[#234840] transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === 'sending' ? c.form.submitSending : c.form.submitIdle}
                  </button>
                  <a
                    href="tel:+201113337472"
                    className="flex-1 border border-[#2d5a4e] text-[#2d5a4e] font-semibold py-3.5 rounded-xl text-center hover:bg-[#f0f7f4] transition-colors duration-200 text-sm flex items-center justify-center gap-2"
                  >
                    <Phone weight="fill" className="w-4 h-4" /> {c.form.callNow}
                  </a>
                </div>
              </form>
            )}
          </div>

          {/* Contact info */}
          <div className="flex flex-col gap-6">
            <div>
              <h3 className="font-bold text-xl text-[rgb(45,52,54)] mb-2">{c.info.heading}</h3>
              <p className="text-gray-500 text-sm">
                {c.info.desc}
              </p>
            </div>

            {c.info.items.map((item, idx) => {
              const Icon = infoIcons[idx]
              return (
                <div key={item.title} className="flex items-start gap-4 p-5 bg-[#f9f7f4] rounded-xl border border-gray-100">
                  <div className="w-10 h-10 bg-[#2d5a4e] rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon weight="fill" className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-[rgb(45,52,54)] mb-1">{item.title}</p>
                    {item.lines.map((line, li) => (
                      <p key={line} className="text-gray-500 text-sm flex items-center gap-1.5">
                        {idx < 2 && li === item.lines.length - 1 && <Clock className="w-3.5 h-3.5 flex-shrink-0" />}
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              )
            })}

            {/* Social */}
            <div className="flex items-center gap-3 mt-2">
              <p className="text-sm font-semibold text-gray-600">{c.follow}</p>
              <a
                href="https://instagram.com/drahmedgalal.g"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium text-[#2d5a4e] bg-[#f0f7f4] px-3 py-1.5 rounded-lg hover:bg-[#d4e8e0] transition-colors flex items-center gap-1.5"
              >
                <InstagramLogo weight="fill" className="w-3.5 h-3.5" /> @drahmedgalal.g
              </a>
              <a
                href="https://tiktok.com/@drahmedgalal_g"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium text-[#2d5a4e] bg-[#f0f7f4] px-3 py-1.5 rounded-lg hover:bg-[#d4e8e0] transition-colors flex items-center gap-1.5"
              >
                <TiktokLogo weight="fill" className="w-3.5 h-3.5" /> @drahmedgalal_g
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
