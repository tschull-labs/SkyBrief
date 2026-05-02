import GlassCard from '../shared/GlassCard.jsx'
import TafPeriod from './TafPeriod.jsx'
import { formatTafTime } from '../../utils/formatters.js'

export default function TafCard({ taf, icao }) {
  if (!taf) {
    return (
      <div className="px-4">
        <GlassCard className="text-center py-8 text-slate-500">
          <svg className="w-10 h-10 mx-auto mb-3 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
          </svg>
          <p className="font-medium text-slate-600">No TAF Available</p>
          <p className="text-sm mt-1">No forecast data found for {icao}.</p>
        </GlassCard>
      </div>
    )
  }

  const periods = taf.fcsts ?? []
  const validFrom = formatTafTime(taf.validTimeFrom)
  const validTo = formatTafTime(taf.validTimeTo)

  return (
    <div className="px-4 space-y-3 animate-[slideUp_0.3s_cubic-bezier(0.16,1,0.3,1)]">
      <GlassCard>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-bold text-slate-800">TAF — {icao}</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Valid {validFrom} – {validTo}
            </p>
          </div>
          <span className="text-xs text-sky-600 font-medium bg-sky-50 px-2 py-1 rounded-lg">
            {periods.length} periods
          </span>
        </div>

        {periods.length === 0 ? (
          <p className="text-sm text-slate-500 py-4 text-center">No forecast periods available.</p>
        ) : (
          <div>
            {periods.map((period, i) => (
              <TafPeriod key={i} period={period} isFirst={i === 0} />
            ))}
          </div>
        )}
      </GlassCard>

      {/* Raw TAF */}
      <div className="px-0">
        <details>
          <summary className="text-xs text-sky-600 cursor-pointer select-none font-medium hover:text-sky-700 list-none flex items-center gap-1 px-1">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
            Raw TAF
          </summary>
          <pre className="mt-2 text-xs font-mono bg-slate-900/5 rounded-xl p-3 overflow-x-auto whitespace-pre-wrap break-all text-slate-600 leading-relaxed border border-slate-200/50">
            {taf.rawTAF}
          </pre>
        </details>
      </div>
    </div>
  )
}
