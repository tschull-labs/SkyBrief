import RunwayCard from '../components/runway/RunwayCard.jsx'
import SkeletonCard from '../components/shared/SkeletonCard.jsx'

function NoAirport() {
  return (
    <div className="px-4 py-12 text-center">
      <div className="glass-card p-8 space-y-3">
        <div className="w-14 h-14 rounded-full bg-amber-50 flex items-center justify-center mx-auto">
          <svg className="w-7 h-7 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
          </svg>
        </div>
        <p className="font-bold text-gray-800">No Airport Selected</p>
        <p className="text-sm text-gray-500">Search for an airport on the Home tab first.</p>
      </div>
    </div>
  )
}

export default function RunwayTab({ metar, loading, icao }) {
  if (!icao) return <NoAirport />
  if (loading.metar) return <div className="px-4 pt-3"><SkeletonCard /></div>
  return <RunwayCard metar={metar} />
}
