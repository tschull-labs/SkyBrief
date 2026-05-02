const ERROR_MESSAGES = {
  AIRPORT_NOT_FOUND: 'No data found for this ICAO code. Double-check it and try again.',
  NETWORK_ERROR: 'Could not reach aviationweather.gov. Check your connection.',
  RATE_LIMITED: 'Too many requests — wait a moment and try again.',
}

function getMessage(code) {
  return ERROR_MESSAGES[code] ?? 'An unexpected error occurred. Please try again.'
}

export default function ErrorCard({ errorCode, onRetry, title = 'Failed to load data' }) {
  return (
    <div className="glass-card p-6 text-center space-y-4 animate-[fadeIn_0.3s_ease-out]">
      <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto">
        <svg className="w-7 h-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
      </div>
      <div>
        <p className="font-semibold text-gray-800">{title}</p>
        <p className="text-sm text-gray-500 mt-1 leading-relaxed">{getMessage(errorCode)}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-5 py-2.5 bg-blue-500 text-white text-sm font-semibold rounded-full hover:bg-blue-600 active:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  )
}
