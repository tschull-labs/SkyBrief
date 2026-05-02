import FavoritesList from '../components/favorites/FavoritesList.jsx'

export default function FavoritesTab({ favorites, onSelect, onRemove }) {
  return (
    <div className="pb-1">
      <div className="px-4 pt-4 pb-2">
        <h2 className="text-lg font-bold text-slate-800">Favorites</h2>
        <p className="text-xs text-slate-500 mt-0.5">Up to 5 airports</p>
      </div>
      <FavoritesList
        favorites={favorites}
        onSelect={onSelect}
        onRemove={onRemove}
      />
    </div>
  )
}
