import FavoriteCard from './FavoriteCard.jsx'
import { MAX_FAVORITES } from '../../constants/index.js'

export default function FavoritesList({ favorites, onSelect, onRemove }) {
  if (favorites.length === 0) {
    return (
      <div className="px-4 py-12 text-center">
        <div className="glass-card p-8 space-y-3">
          <div className="flex justify-center">
            <svg className="w-12 h-12 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
            </svg>
          </div>
          <div>
            <p className="font-semibold text-slate-600">No Favorites Yet</p>
            <p className="text-sm text-slate-400 mt-1">Search for an airport and tap the star to save it here.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="px-4 space-y-3 animate-[fadeIn_0.25s_ease-out]">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-slate-700">Saved Airports</h3>
        <span className="text-xs text-slate-400">{favorites.length}/{MAX_FAVORITES}</span>
      </div>
      <div className="space-y-2">
        {favorites.map(icao => (
          <FavoriteCard
            key={icao}
            icao={icao}
            onSelect={onSelect}
            onRemove={onRemove}
          />
        ))}
      </div>
    </div>
  )
}
