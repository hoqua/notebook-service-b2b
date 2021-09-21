import React, { createContext, useContext } from 'react'
import { useFetch } from 'use-http'
import { formatDate } from '../utils/date'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { isExpired } from '../utils/validators'

const API = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/api' : `https://${window.location.host}/api`

export function useAuthProvidable () {
  const [token, setToken] = useLocalStorage('token')
  const [tokenExpTime, setTokenExpTime] = useLocalStorage('tokenExpTime')
  const { get: authGet, response: authRes, error: authError, loading: authLoading } = useFetch(API + '/login.php', { cachePolicy: 'no-cache' }) // api prefix necessary here because options not provided

  const signIn = async (userName, password) => {
    await authGet(`?u=${userName}&p=${password}`)
    if (authError || !authRes.ok) throw new Error('Ошибка входа.')

    setTokenExpTime(formatDate(authRes.data.token_exp_time))
    setToken(authRes.data.auth_token)
  }

  const logOut = () => {
    setToken(null)
    setTokenExpTime(null)
  }

  const options = {
    cachePolicy: 'no-cache',
    interceptors: {
      request: async ({ options, url, path, route }) => {
        console.log(options)
        console.log(tokenExpTime)
        if (isExpired(tokenExpTime)) {
          console.log('Token expired proceed to logout.')
          logOut()
        }

        if (token) {
          options.headers.Authorization = token
        }

        return options
      },
      response: async ({ response }) => {
        if (!response.ok && response.status === 401) {
          console.log('Unauthorized proceed to logout')
          logOut()
        }

        return response
      }
    }
  }

  return {
    token,
    logOut,
    signIn,
    loading: authLoading,
    error: authError,
    options,
    API
  }
}

const authContext = createContext()

export const useAuth = () => useContext(authContext)

export function ProvideAuth ({ auth, children }) {
  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  )
}
