export const STORAGE_KEYS = {
  LAST_ICAO: 'skybrief_last_icao',
  FAVORITES: 'skybrief_favorites',
}

export const FLIGHT_CATEGORIES = {
  VFR: {
    label: 'VFR',
    color: '#16a34a',
    dotColor: '#22c55e',
    badgeClass: 'category-badge-vfr',
  },
  MVFR: {
    label: 'MVFR',
    color: '#2563eb',
    dotColor: '#3b82f6',
    badgeClass: 'category-badge-mvfr',
  },
  IFR: {
    label: 'IFR',
    color: '#dc2626',
    dotColor: '#ef4444',
    badgeClass: 'category-badge-ifr',
  },
  LIFR: {
    label: 'LIFR',
    color: '#9333ea',
    dotColor: '#a855f7',
    badgeClass: 'category-badge-lifr',
  },
}

export const REFRESH_INTERVAL_MS = 10 * 60 * 1000

export const MAX_FAVORITES = 5

export const API_BASE = 'https://aviationweather.gov/api/data'

export const TABS = [
  { id: 'home', label: 'Home' },
  { id: 'taf', label: 'TAF' },
  { id: 'runway', label: 'Runway' },
  { id: 'favorites', label: 'Favorites' },
]
