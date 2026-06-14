import { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'
import { useLang } from '../context/languageStore'
import { useReveal } from '../utils/useReveal'

const EMAILJS_SERVICE  = 'ahmedbooks'
const EMAILJS_TEMPLATE = 'template_u81hvqb'
const EMAILJS_KEY      = 'ju5jjkSKHDueNCnrd'

const treatments = [
  'Advanced Fillers & Contouring',
  'Botox Techniques',
  'Bio-stimulators',
  'Skin Boosters & Mesotherapy',
  'Comprehensive Skin Treatments',
  'Hair & Scalp Treatments',
]

export default function Contact() {
  const [form, setForm]           = useState({ name: '', phone: '', email: '', treatment: '', message: '' })
  const [status, setStatus]       = useState('idle') // idle | sending | success | error
  const formRef = useRef(null)
  const sectionRef = useReveal({ threshold: 0.1 })
  const { t } = useLang()

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
            Get in Touch
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-[rgb(45,52,54)] mb-4">
            {t('contact_title')}
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Reach out directly or fill the form below — Dr. Galal's team will confirm your
            appointment promptly.
          </p>
        </div>

        <div ref={sectionRef} className="grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <div className="bg-[#f9f7f4] rounded-2xl p-8 border border-gray-100">
            {status === 'success' ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="text-xl font-bold text-[#2d5a4e] mb-2">Message Sent!</h3>
                <p className="text-gray-500">
                  Thank you! We'll contact you shortly.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-6 text-sm text-[#2d5a4e] underline"
                >
                  Send another request
                </button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2d5a4e]/30 focus:border-[#2d5a4e] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+20 111 333 7472"
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2d5a4e]/30 focus:border-[#2d5a4e] transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2d5a4e]/30 focus:border-[#2d5a4e] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Select Treatment</label>
                  <select
                    name="treatment"
                    value={form.treatment}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2d5a4e]/30 focus:border-[#2d5a4e] transition-all text-gray-600"
                  >
                    <option value="">Select a treatment...</option>
                    {treatments.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Message / Notes</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell us about your concerns or questions..."
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2d5a4e]/30 focus:border-[#2d5a4e] transition-all resize-none"
                  />
                </div>

                {status === 'error' && (
                  <p className="text-red-500 text-sm text-center">
                    Something went wrong. Please call us directly at +20 111 333 7472.
                  </p>
                )}

                <div className="flex items-center gap-4 pt-2">
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="flex-1 bg-[#2d5a4e] text-white font-semibold py-3.5 rounded-xl hover:bg-[#234840] transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === 'sending' ? 'Sending…' : 'Book Consultation'}
                  </button>
                  <a
                    href="tel:+201113337472"
                    className="flex-1 border border-[#2d5a4e] text-[#2d5a4e] font-semibold py-3.5 rounded-xl text-center hover:bg-[#f0f7f4] transition-colors duration-200 text-sm"
                  >
                    📞 Call Now
                  </a>
                </div>
              </form>
            )}
          </div>

          {/* Contact info */}
          <div className="flex flex-col gap-6">
            <div>
              <h3 className="font-bold text-xl text-[rgb(45,52,54)] mb-2">Contact Dr. Galal's Clinic</h3>
              <p className="text-gray-500 text-sm">
                Two clinic locations in Cairo. Call or message directly — or fill the form and we'll
                reach you within 24 hours.
              </p>
            </div>

            {[
              {
                icon: '📍',
                title: 'Sheikh Zayed Clinic',
                lines: ['Izar Plaza Mall', 'Palm Hills, Sheikh Zayed, Cairo', '📅 Wed: 3 PM – 8 PM'],
              },
              {
                icon: '📍',
                title: 'New Cairo Clinic',
                lines: ['Concord Plaza Mall', '90th Street, New Cairo, Cairo', '📅 Mon: 5–9 PM · Tue: 1–8 PM'],
              },
              {
                icon: '📞',
                title: 'Phone / WhatsApp',
                lines: ['+20 111 333 7472'],
              },
              {
                icon: '✉️',
                title: 'Email',
                lines: ['galal.ahmedamer@gmail.com'],
              },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-4 p-5 bg-[#f9f7f4] rounded-xl border border-gray-100">
                <div className="w-10 h-10 bg-[#2d5a4e] rounded-xl flex items-center justify-center text-lg flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <p className="font-semibold text-sm text-[rgb(45,52,54)] mb-1">{item.title}</p>
                  {item.lines.map((line) => (
                    <p key={line} className="text-gray-500 text-sm">{line}</p>
                  ))}
                </div>
              </div>
            ))}

            {/* Social */}
            <div className="flex items-center gap-3 mt-2">
              <p className="text-sm font-semibold text-gray-600">Follow:</p>
              <a
                href="https://instagram.com/drahmedgalal.g"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium text-[#2d5a4e] bg-[#f0f7f4] px-3 py-1.5 rounded-lg hover:bg-[#d4e8e0] transition-colors"
              >
                📸 @drahmedgalal.g
              </a>
              <a
                href="https://tiktok.com/@drahmedgalal_g"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium text-[#2d5a4e] bg-[#f0f7f4] px-3 py-1.5 rounded-lg hover:bg-[#d4e8e0] transition-colors"
              >
                🎵 @drahmedgalal_g
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
