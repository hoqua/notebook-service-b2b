import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Home from '../components/views/Home'
import Login from '../components/views/Login/Login'
import Main from '../components/views/Main'
import { useAuth } from '../service/AuthService'
import SuspenseView from '../components/views/SuspenseView'

const Registration = lazy(() => import('../components/views/Registration/Registration'))

export default function Router () {
  const auth = useAuth()

  return (
    <BrowserRouter>
      <Suspense fallback={<SuspenseView />}>
        <Switch>
          {auth.token ? privateRoutes() : publicRoutes()}
        </Switch>
      </Suspense>
    </BrowserRouter>
  )
}

const publicRoutes = () => {
  return (
    <>
      <Route exact path='/'><Home /></Route>
      <Route path='/login'><Login /></Route>
      <Route path='/registration'><Registration /></Route>

      <Route><Redirect to='/' /></Route>
    </>
  )
}

const privateRoutes = () => {
  return (
    <>
      <Route exact path='/'><Main /></Route>

      <Route><Redirect to='/' /></Route>
    </>
  )
}
