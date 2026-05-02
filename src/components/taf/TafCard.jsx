import TafPeriod from './TafPeriod.jsx'
import { formatTafTime } from '../../utils/formatters.js'

export default function TafCard({ taf, icao }) {
  if (!taf) {
    return (
      <div className="px-4 pt-3">
        <div className="glass-card overflow-hidden">
          <div className="banner-taf p-4">
            <p className="text-white/70 text-xs font-bold uppercase tracking-widest">TAF</p>
            <h3 className="text-xl font-black text-white mt-0.5">{icao}</h3>
          </div>
          <div className="p-6 text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-violet-50 flex items-center justify-center mx-auto">
              <svg className="w-6 h-6 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
            </div>
            <p className="font-bold text-gray-700">No TAF Available</p>
            <p className="text-sm text-gray-400">No forecast data found for {icao}.</p>
          </div>
        </div>
      </div>
    )
  }

  const periods = taf.fcsts ?? []
  const validFrom = formatTafTime(taf.validTimeFrom)
  const validTo = formatTafTime(taf.validTimeTo)

  return (
    <div className="px-4 pt-3 pb-2 space-y-3 animate-[slideUp_0.3s_cubic-bezier(0.16,1,0.3,1)]">
      <div className="glass-card overflow-hidden">
        {/* Purple header */}
        <div className="banner-taf p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-white/70 text-xs font-bold uppercase tracking-widest">TAF</p>
              <h3 className="text-xl font-black text-white mt-0.5">{icao}</h3>
              <p className="text-white/60 text-xs mt-1">{validFrom} → {validTo}</p>
            </div>
            <span className="bg-white/20 text-white text-xs font-bold px-2.5 py-1 rounded-full border border-white/30">
              {periods.length} periods
            </span>
          </div>
        </div>

        {/* Periods */}
        <div className="p-4">
          {periods.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-4">No forecast periods available.</p>
          ) : (
            periods.map((period, i) => (
              <TafPeriod key={i} period={period} isFirst={i === 0} isLast={i === periods.length - 1} />
            ))
          )}
        </div>
      </div>

      {/* Raw TAF */}
      <details className="group px-1">
        <summary className="text-xs text-violet-500 cursor-pointer select-none font-semibold hover:text-violet-600 list-none flex items-center gap-1.5 transition-colors">
          <svg className="w-3.5 h-3.5 transition-transform group-open:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
          Raw TAF
        </summary>
        <pre className="mt-2 text-xs font-mono bg-gray-50 rounded-2xl p-3.5 overflow-x-auto whitespace-pre-wrap break-all text-gray-600 leading-relaxed border border-gray-100">
          {taf.rawTAF}
        </pre>
      </details>
    </div>
  )
}
