import { useState, useCallback, useEffect } from 'react'
import { fetchMetar } from '../api/metar.js'
import { fetchTaf } from '../api/taf.js'
import { useLocalStorage } from './useLocalStorage.js'
import { useAutoRefresh } from './useAutoRefresh.js'
import { STORAGE_KEYS } from '../constants/index.js'

export function useAirportData() {
  const [lastIcao, setLastIcao] = useLocalStorage(STORAGE_KEYS.LAST_ICAO, '')
  const [icao, setIcao] = useState(lastIcao || '')
  const [metar, setMetar] = useState(null)
  const [taf, setTaf] = useState(null)
  const [loading, setLoading] = useState({ metar: false, taf: false })
  const [error, setError] = useState({ metar: null, taf: null })

  const searchAirport = useCallback(async (newIcao) => {
    const upper = newIcao.trim().toUpperCase()
    if (!upper) return

    setIcao(upper)
    setLoading({ metar: true, taf: true })
    setError({ metar: null, taf: null })

    const [metarResult, tafResult] = await Promise.allSettled([
      fetchMetar(upper),
      fetchTaf(upper),
    ])

    if (metarResult.status === 'fulfilled') {
      setMetar(metarResult.value)
      setLastIcao(upper)
      setError(prev => ({ ...prev, metar: null }))
    } else {
      setMetar(null)
      setError(prev => ({ ...prev, metar: metarResult.reason?.message ?? 'UNKNOWN' }))
    }

    if (tafResult.status === 'fulfilled') {
      setTaf(tafResult.value)
      setError(prev => ({ ...prev, taf: null }))
    } else {
      setTaf(null)
      setError(prev => ({ ...prev, taf: tafResult.reason?.message ?? 'UNKNOWN' }))
    }

    setLoading({ metar: false, taf: false })
  }, [setLastIcao])

  const refresh = useCallback(() => {
    if (icao) searchAirport(icao)
  }, [icao, searchAirport])

  useAutoRefresh(refresh)

  // Auto-load last searched airport on mount
  useEffect(() => {
    if (lastIcao) {
      searchAirport(lastIcao)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { icao, metar, taf, loading, error, searchAirport, refresh }
}
