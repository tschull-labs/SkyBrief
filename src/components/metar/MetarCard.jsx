import FlightCategoryBadge from './FlightCategoryBadge.jsx'
import WindDisplay from './WindDisplay.jsx'
import CloudLayers from './CloudLayers.jsx'
import PressureDisplay from './PressureDisplay.jsx'
import TempDewpoint from './TempDewpoint.jsx'
import VisibilityDisplay from './VisibilityDisplay.jsx'
import ObservationTime from './ObservationTime.jsx'
import RawMetar from './RawMetar.jsx'

const BANNER_CLASS = {
  VFR: 'banner-vfr',
  MVFR: 'banner-mvfr',
  IFR: 'banner-ifr',
  LIFR: 'banner-lifr',
}

function Divider() {
  return <div className="border-t border-gray-100" />
}

function StarButton({ isFavorite, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 active:bg-white/40 transition-colors"
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <svg
        className={`w-5 h-5 transition-all ${isFavorite ? 'fill-white text-white' : 'text-white/70'}`}
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

  const bannerClass = BANNER_CLASS[metar.flightCategory] ?? 'banner-default'

  return (
    <div className="px-4 animate-[slideUp_0.3s_cubic-bezier(0.16,1,0.3,1)]">
      <div className="glass-card overflow-hidden">
        {/* Colorful banner header */}
        <div className={`${bannerClass} p-4 pb-5`}>
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <p className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-0.5">METAR</p>
              <h2 className="text-xl font-black text-white truncate">{metar.name ?? metar.icaoId}</h2>
              <ObservationTime obsTime={metar.obsTime} white />
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <FlightCategoryBadge category={metar.flightCategory} inverted />
              <StarButton isFavorite={isFavorite} onToggle={onToggleFavorite} />
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-4 space-y-4">
          <WindDisplay wdir={metar.wdir} wspd={metar.wspd} wgst={metar.wgst} />

          <Divider />

          <div className="grid grid-cols-2 gap-4">
            <TempDewpoint temp={metar.temp} dewp={metar.dewp} />
            <VisibilityDisplay visib={metar.visib} />
          </div>

          <Divider />

          <PressureDisplay altim={metar.altim} />

          <Divider />

          <CloudLayers metar={metar} />

          {metar.wxString && (
            <>
              <Divider />
              <div className="space-y-1">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Present Weather</p>
                <p className="text-sm font-semibold text-gray-700">{metar.wxString}</p>
              </div>
            </>
          )}

          <Divider />

          <RawMetar rawOb={metar.rawOb} />
        </div>
      </div>
    </div>
  )
}
