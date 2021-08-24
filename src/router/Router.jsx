import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { PrivateRoute } from './PrivateRoute'
import Home from '../components/views/Home'
import Login from '../components/views/Login'

const Registration = lazy(() => import('../components/views/Registration/Registration'))

export default function Router () {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path='/'><Home /></Route>
          <Route path='/login'><Login /></Route>
          <Route path='/registration'><Registration /></Route>

          <PrivateRoute path='/protected'>
            <ProtectedPage />
          </PrivateRoute>
        </Switch>
      </Suspense>
    </BrowserRouter>
  )
}

function ProtectedPage () {
  return <h3>Protected</h3>
}
