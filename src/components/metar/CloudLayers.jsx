import { getCloudLayers, coverageLabel } from '../../utils/metarDecoder.js'

const COVERAGE_ICONS = {
  FEW: '🌤',
  SCT: '⛅',
  BKN: '🌥',
  OVC: '☁️',
  OVX: '🌫',
}

export default function CloudLayers({ metar }) {
  const layers = getCloudLayers(metar)

  const hasClearSky = metar.cldCvg1 === 'CLR' || metar.cldCvg1 === 'SKC' || metar.cldCvg1 === 'CAVOK'

  return (
    <div className="space-y-2">
      <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">Cloud Cover</p>
      {hasClearSky && (
        <div className="flex items-center gap-2 text-sm text-slate-700">
          <span>☀️</span>
          <span className="font-medium">{metar.cldCvg1 === 'CAVOK' ? 'CAVOK' : 'Clear Sky'}</span>
        </div>
      )}
      {!hasClearSky && layers.length === 0 && (
        <p className="text-sm text-slate-500 italic">No cloud data</p>
      )}
      {layers.map((layer, i) => (
        <div key={i} className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <span>{COVERAGE_ICONS[layer.coverage] ?? '☁️'}</span>
            <span className="font-medium text-slate-700">{coverageLabel(layer.coverage)}</span>
          </div>
          <div className="text-right">
            <span className="font-semibold text-slate-800">{layer.baseFt.toLocaleString()}'</span>
            <span className="text-slate-400 text-xs ml-1">({layer.baseM.toLocaleString()} m)</span>
          </div>
        </div>
      ))}
    </div>
  )
}
