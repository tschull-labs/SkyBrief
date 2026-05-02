import GlassCard from '../shared/GlassCard.jsx'
import FlightCategoryBadge from './FlightCategoryBadge.jsx'
import WindDisplay from './WindDisplay.jsx'
import CloudLayers from './CloudLayers.jsx'
import PressureDisplay from './PressureDisplay.jsx'
import TempDewpoint from './TempDewpoint.jsx'
import VisibilityDisplay from './VisibilityDisplay.jsx'
import ObservationTime from './ObservationTime.jsx'
import RawMetar from './RawMetar.jsx'

function Divider() {
  return <div className="border-t border-slate-200/60" />
}

function FavoriteButton({ isFavorite, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className="p-1.5 rounded-full hover:bg-slate-100/60 transition-colors"
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <svg
        className={`w-5 h-5 transition-colors ${isFavorite ? 'text-amber-400 fill-amber-400' : 'text-slate-300'}`}
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    </button>
  )
}

export default function MetarCard({ metar, isFavorite, onToggleFavorite }) {
  if (!metar) return null

  return (
    <div className="px-4 animate-[slideUp_0.3s_cubic-bezier(0.16,1,0.3,1)]">
      <GlassCard className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-800">{metar.name ?? metar.icaoId}</h2>
              <FavoriteButton isFavorite={isFavorite} onToggle={onToggleFavorite} />
            </div>
            <ObservationTime obsTime={metar.obsTime} />
          </div>
          <FlightCategoryBadge category={metar.flightCategory} />
        </div>

        <Divider />

        {/* Wind */}
        <WindDisplay wdir={metar.wdir} wspd={metar.wspd} wgst={metar.wgst} />

        <Divider />

        {/* Temp + Visibility */}
        <div className="grid grid-cols-2 gap-4">
          <TempDewpoint temp={metar.temp} dewp={metar.dewp} />
          <VisibilityDisplay visib={metar.visib} />
        </div>

        <Divider />

        {/* Pressure */}
        <PressureDisplay altim={metar.altim} />

        <Divider />

        {/* Clouds */}
        <CloudLayers metar={metar} />

        {/* Present weather */}
        {metar.wxString && (
          <>
            <Divider />
            <div className="space-y-1">
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">Present Weather</p>
              <p className="text-sm font-medium text-slate-700">{metar.wxString}</p>
            </div>
          </>
        )}

        <Divider />

        {/* Raw METAR */}
        <RawMetar rawOb={metar.rawOb} />
      </GlassCard>
    </div>
  )
}
