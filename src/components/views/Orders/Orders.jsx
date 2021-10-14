import React, { useEffect } from 'react'
import { useFetch } from 'use-http'
import { BreadCrumbs } from '../../shared/BreadCrumbs/BreadCrumbs'
import PrivateLayout from '../../shared/layouts/PrivateLayout/PrivateLayout'
import { InnerWrapPrivatePage, WrapPrivatePage } from '../../shared/styled/WrapPrivatePage'
import { PageTitleSection } from '../../shared/styled/PageTitleSection'
import { ErrorComponent } from '../../shared/ErrorComponent/ErrorComponent'
import { OrdersGrid } from './styles'
import { ManagerCard } from './components/ManagerCard'
import { OrderRow } from './components/OrderRow/OrderRow'
import { Loading } from '../../shared/Loading/Loading'

const PAGE_TITLE = 'Мои заказы'

export const Orders = () => {
  const { get: getOrders, error, data: orders, loading: loadingOrders } = useFetch('get-orders.php')
  const { get: getManager, errorMngr, data: manager, loading } = useFetch('get-mngr-info.php')

  console.log(orders)

  useEffect(() => {
    getManager()
    getOrders()
  }, [])

  if (error || errorMngr) return <ErrorComponent />

  return (
    <PrivateLayout>
      <WrapPrivatePage>
        <InnerWrapPrivatePage>
          <BreadCrumbs currentPage={PAGE_TITLE} />

          <PageTitleSection title={PAGE_TITLE} />

          {loading || loadingOrders
            ? <Loading />
            : (
              <OrdersGrid>
                <ManagerCard manager={manager} />
                <div>
                  {orders?.orders.map(order => <OrderRow key={order.order_id} order={order} />)}
                </div>
              </OrdersGrid>
              )}

        </InnerWrapPrivatePage>
      </WrapPrivatePage>
    </PrivateLayout>
  )
}
