import React, { useEffect } from 'react'
import { useFetch } from 'use-http'
import { BreadCrumbs } from '../../shared/BreadCrumbs/BreadCrumbs'
import PrivateLayout from '../../shared/layouts/PrivateLayout/PrivateLayout'
import {
  InnerWrapPrivatePage,
  WrapPrivatePage
} from '../../shared/styled/WrapPrivatePage'
import { PageTitleSection } from '../../shared/styled/PageTitleSection'
import { OrdersGrid } from './styles'
import { ManagerCard } from './components/ManagerCard'
import { OrderRow } from './components/OrderRow/OrderRow'
import { ErrorLoaderWrapper } from '../../shared/errorComponents/ErrorLoaderWrapper/ErrorLoaderWrapper'
import {
  API_MANAGER,
  API_ORDERS,
  ORDERS_STORE_KEY
} from '../../../constants/constants'
import { IfAble, USER_ACTION } from '../../../permissions/permissions'
import { ErrorNotActiveUser } from '../../shared/errorComponents/ErrorNotActiveUser/ErrorNotActiveUser'
import { useLocalStorage } from '../../../hooks/useLocalStorage'

const PAGE_TITLE = 'Мои заказы'

export const Orders = () => {
  const [orders, setOrders] = useLocalStorage(ORDERS_STORE_KEY, [])
  const { get: getOrders, error, data, loading } = useFetch(API_ORDERS)
  const {
    get: getManager,
    error: errorManager,
    data: manager,
    loadingManager
  } = useFetch(API_MANAGER)
  const isLoadingOrNotFetchedYet = !data || loadingManager || loading

  useEffect(() => {
    getManager()
    getOrders()
  }, [])
  useEffect(() => {
    if (!data) return
    if (data?.orders?.length) {
      setOrders(data.orders)
    } else {
      setOrders([])
    }
  }, [data])

  return (
    <PrivateLayout>
      <WrapPrivatePage>
        <InnerWrapPrivatePage>
          <BreadCrumbs currentPage={PAGE_TITLE} />

          <PageTitleSection title={PAGE_TITLE} />

          <IfAble
            toDo={[USER_ACTION.DO_ORDER]}
            errorComponent={<ErrorNotActiveUser />}
          >
            <ErrorLoaderWrapper
              isError={!!errorManager || !!error}
              isLoading={isLoadingOrNotFetchedYet}
              isEmpty={!data?.orders?.length}
            >
              <OrdersGrid>
                <ManagerCard manager={manager} />
                <div>
                  {orders.map((order) => (
                    <OrderRow key={order.order_id} order={order} />
                  ))}
                </div>
              </OrdersGrid>
            </ErrorLoaderWrapper>
          </IfAble>
        </InnerWrapPrivatePage>
      </WrapPrivatePage>
    </PrivateLayout>
  )
}
