import { API_BASE } from '../constants/index.js'

export async function fetchMetar(icao) {
  const url = `${API_BASE}/metar?ids=${icao.toUpperCase()}&format=json`
  let res
  try {
    res = await fetch(url)
  } catch {
    throw new Error('NETWORK_ERROR')
  }

  if (res.status === 429) throw new Error('RATE_LIMITED')
  if (!res.ok) throw new Error(`HTTP_${res.status}`)

  const data = await res.json()

  if (!Array.isArray(data) || data.length === 0) {
    throw new Error('AIRPORT_NOT_FOUND')
  }

  return data[0]
}
