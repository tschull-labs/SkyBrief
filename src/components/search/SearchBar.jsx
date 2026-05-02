import { useState } from 'react'

export default function SearchBar({ onSearch, isLoading, defaultValue = '' }) {
  const [value, setValue] = useState(defaultValue)

  function handleSubmit(e) {
    e.preventDefault()
    const trimmed = value.trim().toUpperCase()
    if (trimmed.length < 3 || trimmed.length > 4) return
    if (!/^[A-Z0-9]+$/.test(trimmed)) return
    onSearch(trimmed)
  }

  function handleChange(e) {
    setValue(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 4))
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2.5 px-4 pt-3 pb-2">
      <div className="flex-1 relative">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </span>
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder="ICAO code (e.g. KJFK)"
          maxLength={4}
          autoCapitalize="characters"
          autoComplete="off"
          spellCheck={false}
          className="glass-input w-full pl-10 pr-4 py-3 text-sm font-mono font-bold text-gray-900 placeholder:font-sans placeholder:font-normal placeholder:text-gray-400 placeholder:text-sm"
        />
      </div>
      <button
        type="submit"
        disabled={isLoading || value.length < 3}
        className="px-5 py-3 bg-blue-500 text-white text-sm font-bold rounded-full hover:bg-blue-600 active:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-150 shrink-0 shadow-sm"
      >
        {isLoading ? (
          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        ) : 'Go'}
      </button>
    </form>
  )
}
