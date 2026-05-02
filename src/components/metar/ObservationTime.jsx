import { useState, useEffect } from 'react'
import { formatObsTime, formatMinutesAgo } from '../../utils/formatters.js'

export default function ObservationTime({ obsTime, white = false }) {
  const [now, setNow] = useState(Date.now())

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 60000)
    return () => clearInterval(id)
  }, [])

  const { local, utc, date } = formatObsTime(obsTime)
  const minutesAgo = Math.floor((now - date.getTime()) / 60000)

  const baseClass = white
    ? 'text-white/70'
    : 'text-gray-400'

  return (
    <div className={`flex items-center justify-between text-xs mt-0.5 ${baseClass}`}>
      <span>{local} · {utc}</span>
      {!white && <span className="font-medium">{formatMinutesAgo(minutesAgo)}</span>}
      {white && <span className="font-medium">{formatMinutesAgo(minutesAgo)}</span>}
    </div>
  )
}
