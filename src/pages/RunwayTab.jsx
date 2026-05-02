import RunwayCard from '../components/runway/RunwayCard.jsx'
import SkeletonCard from '../components/shared/SkeletonCard.jsx'
import GlassCard from '../components/shared/GlassCard.jsx'

export default function RunwayTab({ metar, loading, icao }) {
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

  if (loading.metar) {
    return (
      <div className="px-4">
        <SkeletonCard />
      </div>
    )
  }

  return <RunwayCard metar={metar} />
}
