import FavoriteCard from './FavoriteCard.jsx'
import { MAX_FAVORITES } from '../../constants/index.js'

export default function FavoritesList({ favorites, onSelect, onRemove }) {
  if (favorites.length === 0) {
    return (
      <div className="px-4 py-10 text-center">
        <div className="glass-card p-8 space-y-4">
          <div className="w-16 h-16 rounded-full bg-pink-50 flex items-center justify-center mx-auto">
            <svg className="w-8 h-8 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
            </svg>
          </div>
          <div>
            <p className="font-bold text-gray-800">No Favorites Yet</p>
            <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">
              Search for an airport and tap the star icon to save it here.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="px-4 space-y-3 animate-[fadeIn_0.25s_ease-out]">
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Saved Airports</p>
        <span className="text-xs text-gray-400">{favorites.length} / {MAX_FAVORITES}</span>
      </div>
      <div className="space-y-2.5">
        {favorites.map(icao => (
          <FavoriteCard key={icao} icao={icao} onSelect={onSelect} onRemove={onRemove} />
        ))}
      </div>
    </div>
  )
}
