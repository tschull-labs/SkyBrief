import GlassCard from '../shared/GlassCard.jsx'
import CompassRose from './CompassRose.jsx'
import { getActiveRunway, formatRunway } from '../../utils/runwayCalculator.js'

function RunwayNumber({ num, isActive }) {
  return (
    <div className={`flex flex-col items-center gap-1 px-6 py-3 rounded-2xl ${isActive ? 'bg-sky-500 text-white shadow-lg' : 'bg-sky-50 text-sky-700'}`}>
      <span className="text-xs font-medium opacity-70">RWY</span>
      <span className="text-3xl font-bold font-mono">{formatRunway(num)}</span>
      <span className="text-xs opacity-70">{num * 10}°</span>
    </div>
  )
}

export default function RunwayCard({ metar }) {
  if (!metar) return null

  const result = getActiveRunway(metar.wdir, metar.wspd)

  return (
    <div className="px-4 animate-[slideUp_0.3s_cubic-bezier(0.16,1,0.3,1)]">
      <GlassCard className="space-y-5">
        <div>
          <h3 className="font-bold text-slate-800">Active Runway Estimator</h3>
          <p className="text-xs text-slate-500 mt-0.5">{metar.icaoId} · Based on METAR wind</p>
        </div>

        <CompassRose windDirection={metar.wdir} windSpeed={metar.wspd} />

        {result.type === 'normal' && (
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-6">
              <RunwayNumber num={result.active} isActive />
              <div className="flex flex-col items-center text-slate-400">
                <span className="text-xs">↔</span>
                <span className="text-xs mt-0.5">reciprocal</span>
              </div>
              <RunwayNumber num={result.reciprocal} isActive={false} />
            </div>
            <p className="text-center text-sm text-slate-600">
              Wind from <span className="font-semibold">{result.windDir}°</span> at <span className="font-semibold">{result.windSpeed} kt</span>
            </p>
          </div>
        )}

        {result.type === 'variable' && (
          <div className="text-center py-2 space-y-1">
            <p className="font-semibold text-slate-700">Variable Wind</p>
            <p className="text-sm text-slate-500">Cannot determine active runway from variable wind direction.</p>
          </div>
        )}

        {result.type === 'calm' && (
          <div className="text-center py-2 space-y-1">
            <p className="font-semibold text-slate-700">Calm / Light Wind</p>
            <p className="text-sm text-slate-500">Wind speed is too low to determine a preferred runway.</p>
          </div>
        )}

        <div className="bg-amber-50/80 border border-amber-200/60 rounded-xl p-3">
          <div className="flex gap-2">
            <svg className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
            <p className="text-xs text-amber-700 leading-relaxed">
              <span className="font-semibold">Estimated only.</span> Based on reported wind — not official ATC data. Always follow ATC instructions and published NOTAMs.
            </p>
          </div>
        </div>
      </GlassCard>
    </div>
  )
}
