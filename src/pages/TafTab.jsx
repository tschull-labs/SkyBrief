import TafCard from '../components/taf/TafCard.jsx'
import ErrorCard from '../components/shared/ErrorCard.jsx'
import GlassCard from '../components/shared/GlassCard.jsx'

function TafSkeleton() {
  return (
    <div className="px-4 space-y-3">
      <div className="glass-card p-4 space-y-3">
        <div className="skeleton-shimmer h-5 w-32" />
        <div className="skeleton-shimmer h-3 w-48" />
        <div className="space-y-4 mt-4">
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

export default function TafTab({ taf, loading, error, icao, onSearch }) {
  if (!icao) {
    return (
      <div className="px-4 py-12 text-center">
        <GlassCard className="py-10 space-y-2">
          <p className="font-semibold text-slate-600">No Airport Selected</p>
          <p className="text-sm text-slate-400">Search for an airport on the Home tab first.</p>
        </GlassCard>
      </div>
    )
  }

  if (loading.taf) return <TafSkeleton />

  if (error.taf && !taf) {
    return (
      <div className="px-4">
        <ErrorCard errorCode={error.taf} onRetry={() => onSearch(icao)} />
      </div>
    )
  }

  return <TafCard taf={taf} icao={icao} />
}
