import React from 'react'
import { InnerWrapPrivatePage, WrapPrivatePage } from '../../shared/styled/WrapPrivatePage'
import { BreadCrumbs } from '../../shared/BreadCrumbs/BreadCrumbs'
import { PageTitleSection } from '../../shared/styled/PageTitleSection'
import PrivateLayout from '../../shared/layouts/PrivateLayout/PrivateLayout'
import { useLocalStorage } from '../../../hooks/useLocalStorage'
import { EmptyCartPlaceholder } from './components/EmptyCartPlaceholder'
import {
  LOTS_CART_KEY,
  NOTEBOOKS_CART_KEY
} from '../../../constants/constants'
import { MainCart } from './components/MainCart'
import { IfAble, USER_ACTION } from '../../../permissions/permissions'
import { ErrorNotActiveUser } from '../../shared/errorComponents/ErrorNotActiveUser/ErrorNotActiveUser'

const PAGE_TITLE = 'Корзина'

export const Cart = () => {
  const [notebookCart] = useLocalStorage(NOTEBOOKS_CART_KEY, [])
  const [lotsCart] = useLocalStorage(LOTS_CART_KEY, [])
  const areCartsEmpty = !notebookCart?.length && !lotsCart?.length

  return (
    <PrivateLayout>
      <WrapPrivatePage>
        <InnerWrapPrivatePage>
          <BreadCrumbs currentPage={PAGE_TITLE} />

          <PageTitleSection title='Корзина' />

          <IfAble toDo={[USER_ACTION.DO_ORDER]} errorComponent={<ErrorNotActiveUser />}>
            {areCartsEmpty
              ? <EmptyCartPlaceholder />
              : <MainCart />}
          </IfAble>

        </InnerWrapPrivatePage>
      </WrapPrivatePage>
    </PrivateLayout>
  )
}
