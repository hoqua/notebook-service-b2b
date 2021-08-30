import React, { createContext, useContext } from 'react'
import { useFetch } from 'use-http'
import { formatDate } from '../utils/date'
import { useLocalStorage } from '../hooks/useLocalStorage'

export function useAuthProvidable () {
  const [token, setToken] = useLocalStorage('token')
  const [, setTokenExp] = useLocalStorage('tokenExpTime')
  const { get: authGet, response: authRes, error: authError, loading: authLoading } = useFetch('api/login.php', { cachePolicy: 'no-cache' }) // api prefix necessary here because options not provided
  // const { get: userGet, response: loginRes, error: userError, loading: userLoading } = useFetch('api/get-user-info.php') // api prefix necessary here because options not provided

  const signIn = async (userName, password) => {
    await authGet(`?u=${userName}&p=${password}`)
    if (authError) throw new Error('Ошибка входа')

    setToken(authRes.data.auth_token)
    setTokenExp(formatDate(authRes.data.token_exp_time))
    return null
  }

  const logOut = () => {
    setToken(null)
    setTokenExp(null)
  }

  const options = {
    cachePolicy: 'no-cache',
    interceptors: {
      request: async ({ options, url, path, route }) => {
        // if (isExpiredOnNoToken(token)) {
        //   token = await getNewToken()
        //   setToken(token)
        // }
        // if (token) {
        //
        // }

        return options
      },
      response: async ({ response }) => {
        const res = response
        // if (res.data) res.data = toCamel(res.data)
        return res
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
