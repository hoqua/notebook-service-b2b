import React, { createContext, useContext } from 'react'
import { useFetch } from 'use-http'
import { formatDate } from '../utils/date'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { isExpired } from '../utils/validators'

export function useAuthProvidable () {
  const [token, setToken] = useLocalStorage('token')
  const [tokenExpTime, setTokenExpTime] = useLocalStorage('tokenExpTime')
  const { get: authGet, response: authRes, error: authError, loading: authLoading } = useFetch('api/login.php', { cachePolicy: 'no-cache' }) // api prefix necessary here because options not provided
  // const { get: userGet, response: loginRes, error: userError, loading: userLoading } = useFetch('api/get-user-info.php') // api prefix necessary here because options not provided

  const signIn = async (userName, password) => {
    await authGet(`?u=${userName}&p=${password}`)
    if (authError) throw new Error('Ошибка входа')

    setToken(authRes.data.auth_token)
    setTokenExpTime(formatDate(authRes.data.token_exp_time))
  }

  const logOut = () => {
    setToken(null)
    setTokenExpTime(null)
  }

  const options = {
    cachePolicy: 'no-cache',
    interceptors: {
      request: async ({ options, url, path, route }) => {
        if (isExpired(tokenExpTime)) {
          logOut()
        }

        return options
      },
      response: async ({ response }) => {
        if (!response.ok && response.status === 401) {
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
    options
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
