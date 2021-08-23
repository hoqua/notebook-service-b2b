import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { PrivateRoute } from './PrivateRoute'
import Home from '../components/views/Home'
import Registration from '../components/views/Registration/Registration'
import Login from '../components/views/Login'

export default function Router () {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/'><Home /></Route>
        <Route path='/login'><Login /></Route>
        <Route path='/registration'><Registration /></Route>

        <PrivateRoute path='/protected'>
          <ProtectedPage />
        </PrivateRoute>
      </Switch>
    </BrowserRouter>
  )
}

function ProtectedPage () {
  return <h3>Protected</h3>
}
