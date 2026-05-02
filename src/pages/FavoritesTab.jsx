import FavoritesList from '../components/favorites/FavoritesList.jsx'

export default function FavoritesTab({ favorites, onSelect, onRemove }) {
  return (
    <div className="pt-3 pb-2">
      <div className="mx-4 glass-card overflow-hidden mb-4">
        <div className="banner-fav p-4">
          <p className="text-white/70 text-xs font-bold uppercase tracking-widest">Bookmarks</p>
          <h2 className="text-xl font-black text-white mt-0.5">Favorites</h2>
        </div>
      </div>
      <FavoritesList favorites={favorites} onSelect={onSelect} onRemove={onRemove} />
    </div>
  )
}
