import TafCard from '../components/taf/TafCard.jsx'
import ErrorCard from '../components/shared/ErrorCard.jsx'

function TafSkeleton() {
  return (
    <div className="px-4 space-y-3 pt-3">
      <div className="glass-card overflow-hidden">
        <div className="banner-taf p-4">
          <div className="skeleton-shimmer h-4 w-20 opacity-50" />
          <div className="skeleton-shimmer h-6 w-32 mt-2 opacity-50" />
        </div>
        <div className="p-4 space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex gap-3">
              <div className="skeleton-shimmer w-2.5 h-2.5 rounded-full mt-1 shrink-0" />
              <div className="flex-1 space-y-2 pb-3">
                <div className="skeleton-shimmer h-3 w-16" />
                <div className="skeleton-shimmer h-3 w-28" />
                <div className="skeleton-shimmer h-3 w-36" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function NoAirport() {
  return (
    <div className="px-4 py-12 text-center">
      <div className="glass-card p-8 space-y-3">
        <div className="w-14 h-14 rounded-full bg-violet-50 flex items-center justify-center mx-auto">
          <svg className="w-7 h-7 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
          </svg>
        </div>
        <p className="font-bold text-gray-800">No Airport Selected</p>
        <p className="text-sm text-gray-500">Search for an airport on the Home tab first.</p>
      </div>
    </div>
  )
}

export default function TafTab({ taf, loading, error, icao, onSearch }) {
  if (!icao) return <NoAirport />
  if (loading.taf) return <TafSkeleton />
  if (error.taf) {
    return (
      <div className="px-4 pt-3">
        <ErrorCard errorCode={error.taf} onRetry={() => onSearch(icao)} />
      </div>
    )
  }
  // taf may be null if the airport has no TAF — TafCard handles that
  return <TafCard taf={taf} icao={icao} />
}
