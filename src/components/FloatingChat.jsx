import { useState } from 'react'

export default function FloatingChat() {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-6 z-50 flex flex-col items-end gap-3" style={{ right: '1.5rem', left: 'auto' }} dir="ltr">
      {/* Popup */}
      {open && (
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 w-52 flex flex-col gap-2 animate-[fadeInUp_0.2s_ease-out]">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Contact Us</p>
          <a
            href="tel:+201113337472"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#f9f7f4] hover:bg-[#eef5f2] transition-colors text-[rgb(45,52,54)] font-medium text-sm"
          >
            <span className="text-base">📞</span> Call Now
          </a>
          <a
            href="https://wa.me/201113337472"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#f9f7f4] hover:bg-[#eef5f2] transition-colors text-[rgb(45,52,54)] font-medium text-sm"
          >
            <span className="text-base">📱</span> WhatsApp
          </a>
          <a
            href="https://instagram.com/drahmedgalal.g"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#f9f7f4] hover:bg-[#eef5f2] transition-colors text-[rgb(45,52,54)] font-medium text-sm"
          >
            <span className="text-base">📸</span> Instagram
          </a>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close chat menu' : 'Open chat menu'}
        className="w-14 h-14 rounded-full bg-[#2d5a4e] text-white text-2xl shadow-lg hover:bg-[#234a3e] transition-colors flex items-center justify-center"
        style={{ transition: 'transform 0.2s ease', transform: open ? 'rotate(90deg)' : 'rotate(0deg)' }}
      >
        {open ? '✕' : '💬'}
      </button>
    </div>
  )
}
