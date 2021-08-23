import React, { createContext, useContext } from 'react'
import { useFetch } from 'use-http'

const API = 'http://oborot.in/nbs/api/'

function useProvideAuth () {
  const { post: signUp, error: signUpError, loading: signUpLoading } = useFetch(API + 'do-register.php ')
  const { post: signIn, response: user, error: signInError, loading: signInLoading } = useFetch(API + 'login.php')

  return {
    user,
    signIn: (userName, password) => signIn(`?u=${userName}&p=${password}`),
    signUp: ({ firm, name, email, password, phone, telegram }) => signUp({ cname: firm, email, password, fio: name, phone, telegram }),
    loading: signUpLoading || signInLoading,
    signUpError,
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
