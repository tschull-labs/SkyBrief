import { useState } from 'react'
import BottomNav from './components/layout/BottomNav.jsx'
import HomeTab from './pages/HomeTab.jsx'
import TafTab from './pages/TafTab.jsx'
import RunwayTab from './pages/RunwayTab.jsx'
import FavoritesTab from './pages/FavoritesTab.jsx'
import { useAirportData } from './hooks/useAirportData.js'
import { useFavorites } from './hooks/useFavorites.js'

const TAB_COLORS = {
  home: 'bg-blue-500',
  taf: 'bg-violet-600',
  runway: 'bg-amber-500',
  favorites: 'bg-pink-500',
}

export default function App() {
  const [activeTab, setActiveTab] = useState('home')
  const { icao, metar, taf, loading, error, searchAirport } = useAirportData()
  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites()

  function handleSearch(newIcao) {
    searchAirport(newIcao)
    setActiveTab('home')
  }

  function handleSelectFavorite(favIcao) {
    searchAirport(favIcao)
    setActiveTab('home')
  }

  function handleToggleFavorite() {
    if (!icao) return
    isFavorite(icao) ? removeFavorite(icao) : addFavorite(icao)
  }

  const accentColor = TAB_COLORS[activeTab] ?? 'bg-blue-500'

  return (
    <div className="min-h-dvh flex flex-col max-w-lg mx-auto relative">
      {/* Header */}
      <header className="px-4 pt-4 pb-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-xl ${accentColor} flex items-center justify-center shadow-sm transition-colors duration-300`}>
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
              </svg>
            </div>
            <span className="text-base font-black text-gray-900 tracking-tight">SkyBrief</span>
          </div>

          {icao && (
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${accentColor} shadow-sm transition-colors duration-300`}>
              <svg className="w-3 h-3 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>
              <span className="text-xs font-black text-white font-mono tracking-wider">{icao}</span>
            </div>
          )}
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 pb-28 overflow-y-auto">
        {/* HomeTab always rendered (preserves map state), hidden when not active */}
        <div className={activeTab === 'home' ? 'block' : 'hidden'}>
          <HomeTab
            metar={metar}
            loading={loading}
            error={error}
            icao={icao}
            isFavorite={isFavorite(icao)}
            onToggleFavorite={handleToggleFavorite}
            onSearch={handleSearch}
          />
        </div>

        {activeTab === 'taf' && (
          <TafTab taf={taf} loading={loading} error={error} icao={icao} onSearch={handleSearch} />
        )}

        {activeTab === 'runway' && (
          <RunwayTab metar={metar} loading={loading} icao={icao} />
        )}

        {activeTab === 'favorites' && (
          <FavoritesTab favorites={favorites} onSelect={handleSelectFavorite} onRemove={removeFavorite} />
        )}
      </main>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}
