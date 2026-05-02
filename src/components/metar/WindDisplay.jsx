import { formatWindDir, knotsToKmh } from '../../utils/metarDecoder.js'

function WindArrow({ direction }) {
  if (direction === 'VRB' || direction == null) return null
  const deg = Number(direction)
  return (
    <svg
      className="w-8 h-8 shrink-0"
      viewBox="0 0 32 32"
      style={{ transform: `rotate(${deg}deg)` }}
    >
      <circle cx="16" cy="16" r="15" fill="rgba(56,189,248,0.1)" stroke="rgba(56,189,248,0.3)" strokeWidth="1" />
      <path d="M16 4 L20 22 L16 19 L12 22 Z" fill="#0ea5e9" />
      <circle cx="16" cy="16" r="2" fill="#0ea5e9" />
    </svg>
  )
}

export default function WindDisplay({ wdir, wspd, wgst }) {
  const isVariable = wdir === 'VRB' || wdir == null
  const speedKt = Number(wspd ?? 0)
  const speedKmh = knotsToKmh(speedKt)
  const gust = wgst ? Number(wgst) : null

  return (
    <div className="space-y-2">
      <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">Wind</p>
      <div className="flex items-center gap-3">
        <WindArrow direction={wdir} />
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-slate-800">
              {isVariable ? 'Variable' : formatWindDir(wdir)}
            </span>
            <span className="text-base font-semibold text-slate-700">
              {speedKt} kt
            </span>
          </div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="text-xs text-slate-500">{speedKmh} km/h</span>
            {gust && (
              <span className="text-xs text-amber-600 font-medium">
                Gust {gust} kt ({knotsToKmh(gust)} km/h)
              </span>
            )}
          </div>
          {speedKt === 0 && (
            <span className="text-xs text-slate-500">Calm</span>
          )}
        </div>
      </div>
    </div>
  )
}
