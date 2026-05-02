import { altimToInHg } from '../../utils/metarDecoder.js'

export default function PressureDisplay({ altim }) {
  const hPa = Math.round(altim)
  const inHg = altimToInHg(altim)

  return (
    <div className="space-y-1">
      <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">QNH</p>
      <div className="flex items-baseline gap-2">
        <span className="text-xl font-bold text-slate-800">{hPa}</span>
        <span className="text-sm text-slate-500">hPa</span>
      </div>
      <p className="text-sm text-slate-600">{inHg} inHg</p>
    </div>
  )
}
