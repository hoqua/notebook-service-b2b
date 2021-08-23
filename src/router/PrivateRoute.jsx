import React from 'react'
import { useAuth } from '../hooks/auth'
import { Route, Redirect } from 'react-router-dom'

export function PrivateRoute ({ children, ...rest }) {
  const auth = useAuth()

  return (
    <Route
      {...rest}
      render={() => auth.user ? children : <Redirect to={{ pathname: '/login' }} />}
    />
  )
}
