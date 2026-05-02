import { useEffect, useRef } from 'react'
import { REFRESH_INTERVAL_MS } from '../constants/index.js'

export function useAutoRefresh(callback, intervalMs = REFRESH_INTERVAL_MS) {
  const callbackRef = useRef(callback)
  callbackRef.current = callback

  useEffect(() => {
    const id = setInterval(() => {
      callbackRef.current()
    }, intervalMs)

    function onVisibilityChange() {
      if (document.visibilityState === 'visible') {
        callbackRef.current()
      }
    }

    document.addEventListener('visibilitychange', onVisibilityChange)

    return () => {
      clearInterval(id)
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [intervalMs])
}
