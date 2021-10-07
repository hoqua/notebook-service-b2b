import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Login from '../components/views/Login/Login'
import Main from '../components/views/Main'
import { useAuth } from '../service/AuthService'
import SuspenseView from '../components/views/SuspenseView'
import { ProvideSession } from '../service/SessonDataService'
import { Showcase } from '../components/views/Showcase/Showcase'
import { Cart } from '../components/views/Cart/Cart'

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
      <Route exact path='/'><Login /></Route>
      <Route exact path='/registration'><Registration /></Route>
      <Redirect to='/' />
    </>
  )
}

const privateRoutes = () => {
  return (
    <>
      <ProvideSession>
        <Route exact path='/showcase'><Showcase /></Route>
        <Route exact path='/showcase-unfinished'><Showcase isUnfinished /></Route>
        <Route exact path='/shopping-cart'><Cart /></Route>
        <Route exact path='/'><Main /></Route>
      </ProvideSession>
    </>
  )
}
