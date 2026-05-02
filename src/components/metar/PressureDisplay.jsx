import { altimToInHg } from '../../utils/metarDecoder.js'

export default function PressureDisplay({ altim }) {
  const hPa = Math.round(altim)
  const inHg = altimToInHg(altim)

  return (
    <div className="space-y-1">
      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">QNH</p>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-black text-gray-900">{hPa}</span>
        <span className="text-sm font-semibold text-gray-400">hPa</span>
        <span className="text-sm text-gray-500">/ {inHg} inHg</span>
      </div>
    </div>
  )
}
