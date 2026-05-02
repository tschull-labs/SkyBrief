import FlightCategoryBadge from '../metar/FlightCategoryBadge.jsx'
import { formatWindDir, knotsToKmh, getCloudLayers, coverageLabel } from '../../utils/metarDecoder.js'
import { formatTafTimeShort } from '../../utils/formatters.js'

const PERIOD_COLORS = {
  FM:     'bg-blue-100 text-blue-700',
  BECMG:  'bg-teal-100 text-teal-700',
  TEMPO:  'bg-orange-100 text-orange-700',
  PROB30: 'bg-yellow-100 text-yellow-700',
  PROB40: 'bg-amber-100 text-amber-700',
  INTER:  'bg-purple-100 text-purple-700',
}

const PERIOD_LABELS = {
  FM: 'From', BECMG: 'Becoming', TEMPO: 'Tempo',
  PROB30: 'Prob 30%', PROB40: 'Prob 40%', INTER: 'Inter',
}

export default function TafPeriod({ period, isFirst, isLast }) {
  const timeFrom = formatTafTimeShort(period.timeFrom)
  const timeTo = formatTafTimeShort(period.timeTo)
  const typeLabel = PERIOD_LABELS[period.timeGroup] ?? period.timeGroup
  const typeColor = PERIOD_COLORS[period.timeGroup] ?? 'bg-gray-100 text-gray-600'
  const layers = getCloudLayers(period)
  const isVariable = period.wdir === 'VRB' || period.wdir == null
  const windDir = isVariable ? 'VRB' : formatWindDir(period.wdir)
  const windKmh = knotsToKmh(Number(period.wspd ?? 0))

  return (
    <div className={`flex gap-3 ${!isFirst ? 'pt-3.5 border-t border-gray-100' : ''}`}>
      {/* Timeline */}
      <div className="flex flex-col items-center shrink-0 w-3">
        <div className={`w-3 h-3 rounded-full mt-0.5 shrink-0 ${isFirst ? 'bg-violet-500' : 'bg-gray-300'}`} />
        {!isLast && <div className="w-px flex-1 bg-gray-200 mt-1" />}
      </div>

      {/* Content */}
      <div className="flex-1 pb-3 space-y-2 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-0.5">
            <span className={`inline-block text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${typeColor}`}>
              {typeLabel}
            </span>
            <p className="text-xs text-gray-400">{timeFrom} – {timeTo}</p>
          </div>
          {period.flightCategory && (
            <FlightCategoryBadge category={period.flightCategory} size="sm" />
          )}
        </div>

        <div className="text-sm text-gray-700 space-y-0.5">
          <p>
            <span className="font-semibold">{windDir}</span>
            {' '}{period.wspd ?? 0} kt
            {period.wgst && <span className="text-amber-600 font-semibold"> G{period.wgst}</span>}
            <span className="text-gray-400"> · {windKmh} km/h</span>
          </p>
          {period.visib != null && (
            <p className="text-gray-500">Vis {period.visib >= 10 ? '10+ SM' : `${period.visib} SM`}</p>
          )}
        </div>

        {period.wxString && (
          <p className="text-sm text-gray-600 font-medium">{period.wxString}</p>
        )}

        {layers.length > 0 && (
          <div className="space-y-0.5">
            {layers.map((layer, i) => (
              <p key={i} className="text-xs text-gray-500">
                {coverageLabel(layer.coverage)} · {layer.baseFt.toLocaleString()}'
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
