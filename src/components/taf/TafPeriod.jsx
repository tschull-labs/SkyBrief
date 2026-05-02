import FlightCategoryBadge from '../metar/FlightCategoryBadge.jsx'
import { formatWindDir, knotsToKmh, getCloudLayers, coverageLabel } from '../../utils/metarDecoder.js'
import { formatTafTimeShort } from '../../utils/formatters.js'

const PERIOD_LABELS = {
  FM: 'From',
  BECMG: 'Becoming',
  TEMPO: 'Tempo',
  PROB30: 'Prob 30%',
  PROB40: 'Prob 40%',
  INTER: 'Inter',
  PROV: 'Provisional',
}

export default function TafPeriod({ period, isFirst }) {
  const timeFrom = formatTafTimeShort(period.timeFrom)
  const timeTo = formatTafTimeShort(period.timeTo)
  const typeLabel = PERIOD_LABELS[period.timeGroup] ?? period.timeGroup
  const layers = getCloudLayers(period)
  const isVariable = period.wdir === 'VRB' || period.wdir == null
  const windDir = isVariable ? 'VRB' : formatWindDir(period.wdir)
  const windKmh = knotsToKmh(Number(period.wspd ?? 0))

  return (
    <div className={`flex gap-3 ${!isFirst ? 'pt-3 border-t border-slate-200/50' : ''}`}>
      {/* Timeline dot */}
      <div className="flex flex-col items-center shrink-0">
        <div className={`w-2.5 h-2.5 rounded-full mt-1 shrink-0 ${isFirst ? 'bg-sky-500' : 'bg-slate-300'}`} />
        <div className="w-px flex-1 bg-slate-200/80 mt-1" />
      </div>

      {/* Content */}
      <div className="flex-1 pb-3 space-y-1.5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <span className="text-xs font-semibold text-sky-600 uppercase tracking-wide">{typeLabel}</span>
            <p className="text-xs text-slate-500">{timeFrom} – {timeTo}</p>
          </div>
          {period.flightCategory && (
            <FlightCategoryBadge category={period.flightCategory} size="sm" />
          )}
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-700">
          <span>
            <span className="font-medium">{windDir}</span>
            {' '}{period.wspd} kt
            {period.wgst && <span className="text-amber-600"> G{period.wgst}</span>}
            {' '}·{' '}{windKmh} km/h
          </span>
          {period.visib != null && (
            <span>
              Vis {period.visib >= 10 ? '10+ SM' : `${period.visib} SM`}
            </span>
          )}
        </div>

        {period.wxString && (
          <p className="text-sm text-slate-600">{period.wxString}</p>
        )}

        {layers.length > 0 && (
          <div className="space-y-0.5">
            {layers.map((layer, i) => (
              <p key={i} className="text-xs text-slate-500">
                {coverageLabel(layer.coverage)} {layer.baseFt.toLocaleString()}'
              </p>
            ))}
          </div>
        )}

        {layers.length === 0 && (period.cldCvg1 === 'CLR' || period.cldCvg1 === 'SKC') && (
          <p className="text-xs text-slate-500">Clear sky</p>
        )}
      </div>
    </div>
  )
}
