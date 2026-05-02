const SUGGESTIONS = ['KJFK', 'LOWI', 'EDDF', 'EGLL', 'YSSY']

export default function EmptyState({ onSearch }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center animate-[fadeIn_0.4s_ease-out]">
      <div className="glass-card p-8 w-full space-y-5">
        {/* Icon */}
        <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mx-auto">
          <svg className="w-10 h-10 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
          </svg>
        </div>

        <div>
          <h2 className="text-lg font-bold text-gray-800">Search for an Airport</h2>
          <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">
            Enter an ICAO code to get weather, forecasts, and runway data.
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Popular airports</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {SUGGESTIONS.map(icao => (
              <button
                key={icao}
                onClick={() => onSearch(icao)}
                className="px-3.5 py-1.5 bg-blue-50 text-blue-700 text-sm font-mono font-semibold rounded-full hover:bg-blue-100 active:bg-blue-200 transition-colors"
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
