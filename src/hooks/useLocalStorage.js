import { useEffect, useState } from 'react'

export function useLocalStorage (key, initialValue) {
  const storageEventKey = 'update.localStorage.' + key
  const getState = () => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.log('storage parse', error)
      return initialValue
    }
  }
  const [storedValue, setStoredValue] = useState(getState())
  const updateState = () => setStoredValue(getState())

  useEffect(() => {
    window.addEventListener(storageEventKey, updateState)
    return () => window.removeEventListener(storageEventKey, updateState)
  })

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function
        ? value(storedValue)
        : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
      // eslint-disable-next-line no-undef
      const event = new Event(storageEventKey)
      window.dispatchEvent(event)
    } catch (error) {
      console.log('storage set value', error)
    }
  }

  return [storedValue, setValue]
}
