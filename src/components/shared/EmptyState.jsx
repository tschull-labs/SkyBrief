export default function EmptyState({ onSearch }) {
  const suggestions = ['KJFK', 'LOWI', 'EDDF', 'EGLL', 'YSSY']

  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center animate-[fadeIn_0.4s_ease-out]">
      <div className="glass-card p-8 w-full max-w-sm space-y-5">
        <div className="flex justify-center">
          <svg className="w-16 h-16 text-sky-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
              d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
          </svg>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-slate-700">Search for an Airport</h2>
          <p className="text-sm text-slate-500 mt-1">Enter an ICAO code to get METAR, TAF, and runway information.</p>
        </div>
        <div className="space-y-2">
          <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">Try these</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {suggestions.map(icao => (
              <button
                key={icao}
                onClick={() => onSearch(icao)}
                className="px-3 py-1.5 bg-sky-100/80 text-sky-700 text-sm font-mono font-medium rounded-lg hover:bg-sky-200 transition-colors"
              >
                {icao}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
