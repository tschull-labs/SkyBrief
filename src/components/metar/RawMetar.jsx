export default function RawMetar({ rawOb }) {
  return (
    <details className="group">
      <summary className="text-xs text-blue-500 cursor-pointer select-none font-semibold hover:text-blue-600 transition-colors list-none flex items-center gap-1.5">
        <svg className="w-3.5 h-3.5 transition-transform group-open:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
        Raw METAR
      </summary>
      <pre className="mt-3 text-xs font-mono bg-gray-50 rounded-2xl p-3.5 overflow-x-auto whitespace-pre-wrap break-all text-gray-600 leading-relaxed border border-gray-100">
        {rawOb}
      </pre>
    </details>
  )
}
