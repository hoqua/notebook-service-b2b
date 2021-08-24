import React, { createContext, useContext } from 'react'
import { useFetch } from 'use-http'

const API = 'https://oborot.in/nbs/api/'

function useProvideAuth () {
  const { post: signUp, error: signUpError, loading: signUpLoading } = useFetch(API + 'do-register.php ')
  const { post: signIn, response: user, error: signInError, loading: signInLoading } = useFetch(API + 'login.php')

  const signUpWithBody = ({ firm, name, email, password, phone, telegram }) => {
    const formData = new FormData()
    formData.append('cname', firm)
    formData.append('email', email)
    formData.append('password', password)
    formData.append('fio', name)
    formData.append('phone', phone)
    formData.append('telegram', telegram)

    return signUp(formData)
  }

  return {
    user,
    signIn: (userName, password) => signIn(`?u=${userName}&p=${password}`),
    signUp: signUpWithBody,
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
