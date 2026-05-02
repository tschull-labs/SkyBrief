import { celsiusToFahrenheit } from '../../utils/metarDecoder.js'

export default function TempDewpoint({ temp, dewp }) {
  const spread = Math.round((temp - dewp) * 10) / 10
  const spreadColor = spread <= 3 ? 'text-amber-600 bg-amber-50' : 'text-gray-400 bg-gray-50'

  return (
    <div className="space-y-1">
      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Temperature</p>
      <div className="flex items-baseline gap-1.5">
        <span className="text-2xl font-black text-gray-900">{Math.round(temp)}°</span>
        <span className="text-sm text-gray-400">C / {celsiusToFahrenheit(temp)}°F</span>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <span className="text-gray-500">Dew {Math.round(dewp)}°C</span>
        <span className={`text-[11px] font-bold px-1.5 py-0.5 rounded-full ${spreadColor}`}>
          Δ {spread}°
        </span>
      </div>
    </div>
  )
}
