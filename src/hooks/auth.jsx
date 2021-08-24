import React, { createContext, useContext } from 'react'
import { useFetch } from 'use-http'

const API = 'https://oborot.in/nbs/api/'

function useProvideAuth () {
  const { post: signIn, response: user, error: signInError, loading: signInLoading } = useFetch(API + 'login.php')

  return {
    user,
    signIn: (userName, password) => signIn(`?u=${userName}&p=${password}`),
    loading: signInLoading,
    signInError
  }
}

const authContext = createContext()

export const useAuth = () => useContext(authContext)

export function ProvideAuth ({ children }) {
  const auth = useProvideAuth()

  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  )
}
