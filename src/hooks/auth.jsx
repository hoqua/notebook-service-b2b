import React, { createContext, useContext, useState } from 'react'

function useProvideAuth () {
  const [user, setUser] = useState(null)

  const signin = cb => {
    return {}.signin(() => {
      setUser('user')
      cb()
    })
  }

  const signout = cb => {
    return {}.signout(() => {
      setUser(null)
      cb()
    })
  }

  return {
    user,
    signin,
    signout
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
