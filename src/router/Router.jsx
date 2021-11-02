import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Login from '../components/views/Login/Login'
import Main from '../components/views/Main'
import { useAuth } from '../service/AuthService'
import SuspenseView from '../components/views/SuspenseView'
import { ProvideSession } from '../service/SessonDataService'
import { Showcase } from '../components/views/Showcase/Showcase'
import { Cart } from '../components/views/Cart/Cart'
import { Orders } from '../components/views/Orders/Orders'
import { Lots } from '../components/views/Lots/Lots'
import {
  LOTS_ROUTE, ORDERS_ROUTE,
  REGISTRATION_ROUTE,
  ROOT_ROUTE, SHOPPING_CART_ROUTE,
  SHOWCASE_ROUTE,
  SHOWCASE_UNFINISHED_ROUTE
} from '../constants/constants'

const Registration = lazy(() => import('../components/views/Registration/Registration'))

export default function Router () {
  const auth = useAuth()

  return (
    <BrowserRouter>
      <Suspense fallback={<SuspenseView />}>
        <Switch>
          {auth.token
            ? privateRoutes()
            : publicRoutes()}
        </Switch>
      </Suspense>
    </BrowserRouter>
  )
}

const publicRoutes = () => {
  return (
    <>
      <Route exact path={ROOT_ROUTE}><Login /></Route>
      <Route exact path={REGISTRATION_ROUTE}><Registration /></Route>

      <Redirect to={ROOT_ROUTE} />
    </>
  )
}

const privateRoutes = () => {
  return (
    <ProvideSession>
      <Route exact path={SHOWCASE_ROUTE}><Showcase /></Route>
      <Route exact path={SHOWCASE_UNFINISHED_ROUTE}><Showcase isUnfinished /></Route>
      <Route exact path={LOTS_ROUTE}><Lots /></Route>

      <Route exact path={SHOPPING_CART_ROUTE}><Cart /></Route>
      <Route exact path={ORDERS_ROUTE}><Orders /></Route>

      <Route exact path={ROOT_ROUTE}><Main /></Route>
    </ProvideSession>
  )
}
