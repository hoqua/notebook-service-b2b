import { useEffect, useState } from 'react'

const CROSS_TAB_STORAGE_EVENT_KEY = 'storage'
const CUSTOM_STORAGE_PREFIX = 'update.localStorage.'

const getStorageState = (key, initialValue) => {
  try {
    const storageItem = window.localStorage.getItem(key)

    return storageItem ? JSON.parse(storageItem) : initialValue // if nothing set return initial val
  } catch (error) {
    console.log('UseLocalStorage hook -> storage parse error:', error)

    return initialValue
  }
}

export function useLocalStorage(localStorageKey, initialValue) {
  const PER_TAB_STORAGE_EVENT_KEY = CUSTOM_STORAGE_PREFIX + localStorageKey
  const [storedValue, setStoredValue] = useState(
    getStorageState(localStorageKey, initialValue)
  )

  const updateState = () =>
    setStoredValue(getStorageState(localStorageKey, initialValue))
  const updateCrossTabState = (event) =>
    event.key === localStorageKey ? updateState() : undefined // run update only for specific storage hook

  useEffect(() => {
    window.addEventListener(PER_TAB_STORAGE_EVENT_KEY, updateState)
    window.addEventListener(CROSS_TAB_STORAGE_EVENT_KEY, updateCrossTabState)

    return () => {
      window.removeEventListener(PER_TAB_STORAGE_EVENT_KEY, updateState)
      window.removeEventListener(
        CROSS_TAB_STORAGE_EVENT_KEY,
        updateCrossTabState
      )
    }
  })

  const setValue = (value) => {
    try {
      setStoredValue(value)
      const storageItem = JSON.stringify(value)
      window.localStorage.setItem(localStorageKey, storageItem) // this will trigger between tabs event

      window.dispatchEvent(new Event(PER_TAB_STORAGE_EVENT_KEY)) // send update event per tab event
    } catch (error) {
      console.log('UseLocalStorage hook -> storage set value error:', error)
    }
  }

  return [storedValue, setValue]
}
