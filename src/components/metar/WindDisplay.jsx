import { formatWindDir, knotsToKmh } from '../../utils/metarDecoder.js'

function WindArrow({ direction }) {
  if (direction === 'VRB' || direction == null) return null
  return (
    <svg
      className="w-10 h-10 shrink-0 drop-shadow-sm"
      viewBox="0 0 40 40"
      style={{ transform: `rotate(${Number(direction)}deg)` }}
    >
      <circle cx="20" cy="20" r="19" fill="rgba(59,130,246,0.08)" stroke="rgba(59,130,246,0.2)" strokeWidth="1" />
      <polygon points="20,4 24,26 20,22 16,26" fill="#3B82F6" />
      <circle cx="20" cy="20" r="3" fill="#3B82F6" />
    </svg>
  )
}

export default function WindDisplay({ wdir, wspd, wgst }) {
  const isVariable = wdir === 'VRB' || wdir == null
  const speedKt = Number(wspd ?? 0)
  const speedKmh = knotsToKmh(speedKt)
  const gust = wgst ? Number(wgst) : null

  return (
    <div className="space-y-1.5">
      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Wind</p>
      <div className="flex items-center gap-3">
        <WindArrow direction={wdir} />
        <div>
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-2xl font-black text-gray-900">
              {isVariable ? 'Variable' : formatWindDir(wdir)}
            </span>
            <span className="text-lg font-bold text-gray-700">{speedKt} kt</span>
          </div>
          <p className="text-sm text-gray-400 mt-0.5">
            {speedKmh} km/h
            {gust && <span className="ml-2 text-amber-600 font-semibold">Gust {gust} kt</span>}
            {speedKt === 0 && ' · Calm'}
          </p>
        </div>
      </div>
    </div>
  )
}
