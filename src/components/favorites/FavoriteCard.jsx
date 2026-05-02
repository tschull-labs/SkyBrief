const ACCENT_COLORS = [
  'bg-blue-500', 'bg-violet-500', 'bg-emerald-500',
  'bg-rose-500', 'bg-amber-500',
]

function getAccent(icao) {
  let n = 0
  for (let i = 0; i < icao.length; i++) n += icao.charCodeAt(i)
  return ACCENT_COLORS[n % ACCENT_COLORS.length]
}

export default function FavoriteCard({ icao, onSelect, onRemove }) {
  const accent = getAccent(icao)

  return (
    <div
      onClick={() => onSelect(icao)}
      className="glass-card flex items-center gap-3 cursor-pointer hover:shadow-md active:scale-[0.99] transition-all duration-150"
    >
      <div className={`w-10 h-10 ${accent} rounded-xl flex items-center justify-center shrink-0`}>
        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <span className="font-black text-gray-900 font-mono text-base">{icao}</span>
        <p className="text-xs text-gray-400 mt-0.5">Tap to load weather</p>
      </div>
      <button
        onClick={e => { e.stopPropagation(); onRemove(icao) }}
        className="w-8 h-8 rounded-full hover:bg-red-50 flex items-center justify-center text-gray-300 hover:text-red-400 transition-colors shrink-0"
        aria-label={`Remove ${icao}`}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
}
