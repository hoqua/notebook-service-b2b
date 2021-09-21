import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Login from '../components/views/Login/Login'
import Main from '../components/views/Main'
import { useAuth } from '../service/AuthService'
import SuspenseView from '../components/views/SuspenseView'
import { ProvideSession } from '../service/SessonDataService'
import { Showcase } from '../components/views/Showcase'

const Registration = lazy(() => import('../components/views/Registration/Registration'))

export default function Router () {
  const auth = useAuth()

  return (
    <BrowserRouter>
      <Suspense fallback={<SuspenseView />}>
        {auth.token ? privateRoutes() : publicRoutes()}
      </Suspense>
    </BrowserRouter>
  )
}

const publicRoutes = () => {
  return (
    <Switch>
      <Route exact path='/'><Login /></Route>
      <Route exact path='/registration'><Registration /></Route>

      <Route><Redirect to='/' /></Route>
    </Switch>
  )
}

const privateRoutes = () => {
  return (
    <ProvideSession>
      <Switch>
        <Route exact path='/showcase'><Showcase /></Route>
        <Route exact path='/'><Main /></Route>

        <Route><Redirect to='/' /></Route>
      </Switch>
    </ProvideSession>
  )
}
