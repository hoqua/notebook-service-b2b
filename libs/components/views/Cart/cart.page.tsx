'use client'
import React from 'react'
import { useCart, useLotsCart } from '../../../hooks/use-cart'
import { useSession } from 'next-auth/react'
import { ifAble, USER_ACTION } from '../../../permissions/permissions'
import { Breadcrumbs } from '../../shared/ui/breadcrumbs'
import EmptyCartPlaceholder from './components/empty-cart-placeholder'
import { MainCart } from './components/main-cart'
import { ErrorNotActiveUser } from '../../shared/errorComponents/error-non-active-user'

export default function CartPage({
  rate,
  currencyName
}: {
  rate: number
  currencyName: string
}) {
  const [cart] = useCart()
  const [lotsCart] = useLotsCart()
  const session = useSession()
  const user = session.data?.user
  const isUserHasPermission = ifAble({
    toDo: [USER_ACTION.DO_ORDER],
    isUserActive: !!user?.active
  })

  const areCartsEmpty = cart.length === 0
  const areLotsCartEmpty = lotsCart.length === 0
  return (
    <div className="max-w-[1170px] px-2 w-full mx-auto flex flex-col gap-5 py-5">
      <Breadcrumbs />
      <h1 className="text-2xl font-medium">Корзина</h1>

      {isUserHasPermission ? (
        areCartsEmpty && areLotsCartEmpty ? (
          <EmptyCartPlaceholder />
        ) : (
          <MainCart rate={rate} currencyName={currencyName} />
        )
      ) : (
        <ErrorNotActiveUser />
      )}
    </div>
  )
}
