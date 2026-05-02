import { celsiusToFahrenheit } from '../../utils/metarDecoder.js'

export default function TempDewpoint({ temp, dewp }) {
  const spread = Math.round((temp - dewp) * 10) / 10
  const spreadColor = spread <= 3 ? 'text-amber-600' : 'text-slate-500'

  return (
    <div className="space-y-1">
      <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">Temperature</p>
      <div className="flex items-baseline gap-1">
        <span className="text-xl font-bold text-slate-800">{Math.round(temp)}°C</span>
        <span className="text-sm text-slate-400">/ {celsiusToFahrenheit(temp)}°F</span>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <span className="text-slate-500">Dew {Math.round(dewp)}°C</span>
        <span className={`text-xs font-medium ${spreadColor}`}>
          Spread {spread}°
        </span>
      </div>
    </div>
  )
}
