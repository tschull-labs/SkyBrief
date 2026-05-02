import { useState, useEffect } from 'react'
import { formatObsTime, formatMinutesAgo } from '../../utils/formatters.js'

export default function ObservationTime({ obsTime }) {
  const [now, setNow] = useState(Date.now())

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 60000)
    return () => clearInterval(id)
  }, [])

  const { local, utc, date } = formatObsTime(obsTime)
  const minutesAgo = Math.floor((now - date.getTime()) / 60000)

  return (
    <div className="flex items-center justify-between text-xs text-slate-500">
      <span>{local} local · {utc}</span>
      <span className="font-medium text-slate-400">{formatMinutesAgo(minutesAgo)}</span>
    </div>
  )
}
