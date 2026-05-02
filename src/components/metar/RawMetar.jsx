export default function RawMetar({ rawOb }) {
  return (
    <details className="mt-1">
      <summary className="text-xs text-sky-600 cursor-pointer select-none font-medium hover:text-sky-700 transition-colors list-none flex items-center gap-1">
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
        Raw METAR
      </summary>
      <pre className="mt-2 text-xs font-mono bg-slate-900/5 rounded-xl p-3 overflow-x-auto whitespace-pre-wrap break-all text-slate-600 leading-relaxed border border-slate-200/50">
        {rawOb}
      </pre>
    </details>
  )
}
