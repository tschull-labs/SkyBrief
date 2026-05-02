import { useLocalStorage } from './useLocalStorage.js'
import { STORAGE_KEYS, MAX_FAVORITES } from '../constants/index.js'

export function useFavorites() {
  const [favorites, setFavorites] = useLocalStorage(STORAGE_KEYS.FAVORITES, [])

  function addFavorite(icao) {
    const upper = icao.toUpperCase()
    setFavorites(prev => {
      if (prev.includes(upper)) return prev
      if (prev.length >= MAX_FAVORITES) return prev
      return [...prev, upper]
    })
  }

  function removeFavorite(icao) {
    const upper = icao.toUpperCase()
    setFavorites(prev => prev.filter(f => f !== upper))
  }

  function isFavorite(icao) {
    return favorites.includes(icao?.toUpperCase())
  }

  return { favorites, addFavorite, removeFavorite, isFavorite }
}
