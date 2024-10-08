import React, { createContext, useContext, useEffect } from 'react'
import { useFetch } from 'use-http'
import { useLocalStorage } from '../hooks/useLocalStorage'

const sessionContext = createContext()

export const useSession = () => useContext(sessionContext)

export function ProvideSession({ children }) {
  const [user, setUser] = useLocalStorage('user')
  const [exchangeRate, setExchangeRate] = useLocalStorage('exchangeRate')

  const { get: getUser, response: userRes } = useFetch('get-user-info.php')
  const { get: getExRate, response: exRes } = useFetch('get-exrate.php')

  useEffect(() => {
    const fetchData = async () => {
      const [exRateData, userData] = await Promise.all([getExRate(), getUser()])

      if (userRes.ok) setUser(userData)
      if (exRes.ok) setExchangeRate(exRateData)
    }

    fetchData()
  }, [])

  return (
    <sessionContext.Provider value={{ user, exchangeRate }}>
      {children}
    </sessionContext.Provider>
  )
}
