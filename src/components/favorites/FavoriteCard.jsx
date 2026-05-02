import GlassCard from '../shared/GlassCard.jsx'

export default function FavoriteCard({ icao, onSelect, onRemove }) {
  return (
    <GlassCard
      onClick={() => onSelect(icao)}
      className="flex items-center justify-between !p-3"
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-sky-100 rounded-xl flex items-center justify-center">
          <svg className="w-4 h-4 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
          </svg>
        </div>
        <span className="font-mono font-bold text-slate-800 text-sm">{icao}</span>
      </div>
      <button
        onClick={e => { e.stopPropagation(); onRemove(icao) }}
        className="p-1 rounded-lg hover:bg-red-50 text-slate-300 hover:text-red-400 transition-colors"
        aria-label={`Remove ${icao} from favorites`}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </GlassCard>
  )
}
