import { useState } from 'react'
import BottomNav from './components/layout/BottomNav.jsx'
import HomeTab from './pages/HomeTab.jsx'
import TafTab from './pages/TafTab.jsx'
import RunwayTab from './pages/RunwayTab.jsx'
import FavoritesTab from './pages/FavoritesTab.jsx'
import { useAirportData } from './hooks/useAirportData.js'
import { useFavorites } from './hooks/useFavorites.js'

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
    if (isFavorite(icao)) {
      removeFavorite(icao)
    } else {
      addFavorite(icao)
    }
  }

  return (
    <div className="min-h-dvh flex flex-col max-w-lg mx-auto relative">
      {/* Page header */}
      <header className="sticky top-0 z-40 px-4 pt-safe-top">
        <div className="flex items-center justify-center pt-3 pb-1">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
            </svg>
            <h1 className="text-base font-bold text-slate-800 tracking-tight">SkyBrief</h1>
          </div>
          {icao && (
            <span className="absolute right-4 text-xs font-mono font-semibold text-sky-600 bg-sky-50 px-2 py-1 rounded-lg">
              {icao}
            </span>
          )}
        </div>
      </header>

      {/* Tab content */}
      <main className="flex-1 pb-28 overflow-y-auto">
        {/* Always render HomeTab to preserve map state, hide when not active */}
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
          <TafTab
            taf={taf}
            loading={loading}
            error={error}
            icao={icao}
            onSearch={handleSearch}
          />
        )}

        {activeTab === 'runway' && (
          <RunwayTab
            metar={metar}
            loading={loading}
            icao={icao}
          />
        )}

        {activeTab === 'favorites' && (
          <FavoritesTab
            favorites={favorites}
            onSelect={handleSelectFavorite}
            onRemove={removeFavorite}
          />
        )}
      </main>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}
