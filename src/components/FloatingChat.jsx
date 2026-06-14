import { useState } from 'react'
import { Phone, WhatsappLogo, InstagramLogo, X, ChatCircleDots } from '@phosphor-icons/react'
import { useLang } from '../context/languageStore'

export default function FloatingChat() {
  const [open, setOpen] = useState(false)
  const { t } = useLang()

  return (
    <div className="fixed bottom-6 z-50 flex flex-col items-end gap-3" style={{ right: '1.5rem', left: 'auto' }} dir="ltr">
      {/* Popup */}
      {open && (
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 w-52 flex flex-col gap-2 animate-[fadeInUp_0.2s_ease-out]">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{t('floatingChat.contactUs')}</p>
          <a
            href="tel:+201113337472"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#f9f7f4] hover:bg-[#eef5f2] transition-colors text-[rgb(45,52,54)] font-medium text-sm"
          >
            <Phone weight="fill" className="w-4 h-4 text-[#2d5a4e]" /> {t('floatingChat.callNow')}
          </a>
          <a
            href="https://wa.me/201113337472"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#f9f7f4] hover:bg-[#eef5f2] transition-colors text-[rgb(45,52,54)] font-medium text-sm"
          >
            <WhatsappLogo weight="fill" className="w-4 h-4 text-[#2d5a4e]" /> {t('floatingChat.whatsapp')}
          </a>
          <a
            href="https://instagram.com/drahmedgalal.g"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#f9f7f4] hover:bg-[#eef5f2] transition-colors text-[rgb(45,52,54)] font-medium text-sm"
          >
            <InstagramLogo weight="fill" className="w-4 h-4 text-[#2d5a4e]" /> {t('floatingChat.instagram')}
          </a>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close chat menu' : 'Open chat menu'}
        className="w-14 h-14 rounded-full bg-[#2d5a4e] text-white shadow-lg hover:bg-[#234a3e] transition-colors flex items-center justify-center"
        style={{ transition: 'transform 0.2s ease', transform: open ? 'rotate(90deg)' : 'rotate(0deg)' }}
      >
        {open ? <X weight="bold" className="w-6 h-6" /> : <ChatCircleDots weight="fill" className="w-6 h-6" />}
      </button>
    </div>
  )
}
