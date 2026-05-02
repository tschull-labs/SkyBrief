import { visibToMeters } from '../../utils/metarDecoder.js'

export default function VisibilityDisplay({ visib }) {
  const meters = visibToMeters(visib)
  const isUnlimited = visib >= 10

  return (
    <div className="space-y-1">
      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Visibility</p>
      <div className="flex items-baseline gap-1.5">
        <span className="text-2xl font-black text-gray-900">
          {isUnlimited ? '10+' : visib < 1 ? visib.toFixed(2) : visib}
        </span>
        <span className="text-sm font-semibold text-gray-400">SM</span>
      </div>
      <p className="text-sm text-gray-500">
        {isUnlimited ? 'Unlimited' : meters != null ? `${meters.toLocaleString()} m` : ''}
      </p>
    </div>
  )
}
