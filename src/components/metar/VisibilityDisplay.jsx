import { visibToMeters } from '../../utils/metarDecoder.js'

export default function VisibilityDisplay({ visib }) {
  const meters = visibToMeters(visib)
  const isUnlimited = visib >= 10

  return (
    <div className="space-y-1">
      <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">Visibility</p>
      <div className="flex items-baseline gap-1">
        <span className="text-xl font-bold text-slate-800">
          {isUnlimited ? '10+' : visib < 1 ? visib.toFixed(2) : visib}
        </span>
        <span className="text-sm text-slate-500">SM</span>
      </div>
      {!isUnlimited && meters != null && (
        <p className="text-sm text-slate-500">{meters.toLocaleString()} m</p>
      )}
      {isUnlimited && (
        <p className="text-sm text-slate-500">Unlimited</p>
      )}
    </div>
  )
}
