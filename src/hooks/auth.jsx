import React, { createContext, useContext } from 'react'
import { useFetch } from 'use-http'
import { useLocalStorage } from './useLocalStorage'

const API = 'https://oborot.in/nbs/api/'

export function useProvideAuth () {
  const [token] = useLocalStorage('token')
  const { post: signIn, response, error, loading } = useFetch(API + 'login.php')

  const options = {
    interceptors: {
      request: async ({ options, url, path, route }) => {
        // if (isExpired(token)) {
        //   token = await getNewToken()
        //   setToken(token)
        // }
        options.headers.Authorization = `Bearer ${token}`
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
    data: response.data,
    signIn: (userName, password) => signIn(`?u=${userName}&p=${password}`),
    loading,
    error,
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
