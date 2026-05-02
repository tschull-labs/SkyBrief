import { useState } from 'react'

export function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key)
      return stored !== null ? JSON.parse(stored) : defaultValue
    } catch {
      return defaultValue
    }
  })

  function set(newValue) {
    try {
      const toStore = typeof newValue === 'function' ? newValue(value) : newValue
      setValue(toStore)
      localStorage.setItem(key, JSON.stringify(toStore))
    } catch {
      // storage unavailable
    }
  }

  return [value, set]
}
