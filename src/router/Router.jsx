import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
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
  LOTS_ROUTE,
  ORDERS_ROUTE,
  REGISTRATION_ROUTE,
  ROOT_ROUTE,
  SHOPPING_CART_ROUTE,
  SHOWCASE_ROUTE,
  SHOWCASE_UNFINISHED_ROUTE
} from '../constants/constants'

const Registration = lazy(
  () => import('../components/views/Registration/Registration')
)

export default function Router() {
  const auth = useAuth()

  return (
    <BrowserRouter>
      <Suspense fallback={<SuspenseView />}>
        <ProvideSession>
          <Routes>
            {auth.token ? privateRoutes() : publicRoutes()}
            <Route path="*" element={<Navigate to={ROOT_ROUTE} />} />
          </Routes>
        </ProvideSession>
      </Suspense>
    </BrowserRouter>
  )
}

const publicRoutes = () => {
  return (
    <>
      <Route path={ROOT_ROUTE} element={<Login />} />
      <Route path={REGISTRATION_ROUTE} element={<Registration />} />
    </>
  )
}

const privateRoutes = () => {
  return (
    <>
      <Route path={SHOWCASE_ROUTE} element={<Showcase />} />
      <Route
        path={SHOWCASE_UNFINISHED_ROUTE}
        element={<Showcase isUnfinished />}
      />
      <Route path={LOTS_ROUTE} element={<Lots />} />
      <Route path={SHOPPING_CART_ROUTE} element={<Cart />} />
      <Route path={ORDERS_ROUTE} element={<Orders />} />
      <Route path={ROOT_ROUTE} element={<Main />} />
    </>
  )
}
