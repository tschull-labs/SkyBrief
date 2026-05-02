import CompassRose from './CompassRose.jsx'
import { getActiveRunway, formatRunway } from '../../utils/runwayCalculator.js'

function RunwayNumber({ num, isActive }) {
  return (
    <div className={`flex flex-col items-center gap-1 px-7 py-4 rounded-2xl ${
      isActive
        ? 'bg-amber-500 text-white shadow-lg shadow-amber-200'
        : 'bg-amber-50 text-amber-700'
    }`}>
      <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">RWY</span>
      <span className="text-4xl font-black font-mono leading-none">{formatRunway(num)}</span>
      <span className="text-xs opacity-70">{num * 10}°</span>
    </div>
  )
}

export default function RunwayCard({ metar }) {
  if (!metar) return null

  const result = getActiveRunway(metar.wdir, metar.wspd)

  return (
    <div className="px-4 pt-3 animate-[slideUp_0.3s_cubic-bezier(0.16,1,0.3,1)]">
      <div className="glass-card overflow-hidden">
        {/* Amber header */}
        <div className="banner-rwy p-4">
          <p className="text-white/70 text-xs font-bold uppercase tracking-widest">Runway Estimator</p>
          <h3 className="text-xl font-black text-white mt-0.5">{metar.icaoId}</h3>
          <p className="text-white/60 text-xs mt-1">Based on reported wind · Not ATC data</p>
        </div>

        <div className="p-5 space-y-5">
          <CompassRose windDirection={metar.wdir} windSpeed={metar.wspd} />

          {result.type === 'normal' && (
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-5">
                <RunwayNumber num={result.active} isActive />
                <div className="text-gray-300 font-bold text-xl">↔</div>
                <RunwayNumber num={result.reciprocal} isActive={false} />
              </div>
              <p className="text-center text-sm text-gray-600">
                Wind <span className="font-bold text-gray-800">{result.windDir}°</span> at{' '}
                <span className="font-bold text-gray-800">{result.windSpeed} kt</span>
              </p>
            </div>
          )}

          {result.type === 'variable' && (
            <div className="text-center py-2 space-y-1">
              <p className="font-bold text-gray-800">Variable Wind</p>
              <p className="text-sm text-gray-500">Cannot determine active runway.</p>
            </div>
          )}

          {result.type === 'calm' && (
            <div className="text-center py-2 space-y-1">
              <p className="font-bold text-gray-800">Calm / Light Wind</p>
              <p className="text-sm text-gray-500">Wind too light to determine a preferred runway.</p>
            </div>
          )}

          <div className="bg-amber-50 rounded-2xl p-3.5 flex gap-2.5">
            <svg className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
            <p className="text-xs text-amber-800 leading-relaxed">
              <span className="font-bold">Estimated only.</span> Always follow ATC instructions and NOTAMs.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
