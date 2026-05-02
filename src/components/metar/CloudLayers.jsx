import { getCloudLayers, coverageLabel } from '../../utils/metarDecoder.js'

const COVERAGE_COLOR = {
  FEW: 'bg-yellow-100 text-yellow-700',
  SCT: 'bg-blue-100 text-blue-700',
  BKN: 'bg-indigo-100 text-indigo-700',
  OVC: 'bg-gray-200 text-gray-700',
  OVX: 'bg-gray-300 text-gray-800',
}

export default function CloudLayers({ metar }) {
  const layers = getCloudLayers(metar)
  const hasClear = metar.cldCvg1 === 'CLR' || metar.cldCvg1 === 'SKC' || metar.cldCvg1 === 'CAVOK'

  return (
    <div className="space-y-2">
      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Cloud Cover</p>
      {hasClear && (
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-bold">Clear</span>
          {metar.cldCvg1 === 'CAVOK' && <span className="text-xs text-gray-500">CAVOK</span>}
        </div>
      )}
      {!hasClear && layers.length === 0 && (
        <p className="text-sm text-gray-400 italic">No cloud data</p>
      )}
      {layers.map((layer, i) => (
        <div key={i} className="flex items-center justify-between">
          <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${COVERAGE_COLOR[layer.coverage] ?? 'bg-gray-100 text-gray-600'}`}>
            {layer.coverage} · {coverageLabel(layer.coverage)}
          </span>
          <div className="text-right">
            <span className="text-sm font-bold text-gray-800">{layer.baseFt.toLocaleString()}'</span>
            <span className="text-xs text-gray-400 ml-1">/ {layer.baseM.toLocaleString()} m</span>
          </div>
        </div>
      ))}
    </div>
  )
}
