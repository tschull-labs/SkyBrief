export function formatObsTime(obsTime) {
  // obsTime is Unix timestamp in seconds
  const date = new Date(obsTime * 1000)

  const local = date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })

  const utcHours = String(date.getUTCHours()).padStart(2, '0')
  const utcMins = String(date.getUTCMinutes()).padStart(2, '0')
  const utc = `${utcHours}:${utcMins}Z`

  const minutesAgo = Math.floor((Date.now() - date.getTime()) / 60000)

  return { local, utc, minutesAgo, date }
}

export function formatMinutesAgo(minutesAgo) {
  if (minutesAgo < 1) return 'Just now'
  if (minutesAgo === 1) return '1 minute ago'
  if (minutesAgo < 60) return `${minutesAgo} minutes ago`
  const h = Math.floor(minutesAgo / 60)
  const m = minutesAgo % 60
  if (m === 0) return h === 1 ? '1 hour ago' : `${h} hours ago`
  return h === 1 ? `1h ${m}m ago` : `${h}h ${m}m ago`
}

export function formatTafTime(isoString) {
  if (!isoString) return ''
  const date = new Date(isoString.replace(' ', 'T') + 'Z')
  return date.toLocaleString([], {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}

export function formatTafTimeShort(isoString) {
  if (!isoString) return ''
  const date = new Date(isoString.replace(' ', 'T') + 'Z')
  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}
