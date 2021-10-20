import React, { useEffect } from 'react'
import { useFetch } from 'use-http'
import { BreadCrumbs } from '../../shared/BreadCrumbs/BreadCrumbs'
import PrivateLayout from '../../shared/layouts/PrivateLayout/PrivateLayout'
import { InnerWrapPrivatePage, WrapPrivatePage } from '../../shared/styled/WrapPrivatePage'
import { PageTitleSection } from '../../shared/styled/PageTitleSection'
import { OrdersGrid } from './styles'
import { ManagerCard } from './components/ManagerCard'
import { OrderRow } from './components/OrderRow/OrderRow'
import { ErrorLoaderWrapper } from '../../shared/ErrorLoaderWrapper/ErrorLoaderWrapper'

const PAGE_TITLE = 'Мои заказы'

export const Orders = () => {
  const { get: getOrders, error, data, loading } = useFetch('get-orders.php')
  const { get: getManager, error: errorManager, data: manager, loadingManager } = useFetch('get-mngr-info.php')

  useEffect(() => {
    getManager()
    getOrders()
  }, [])

  return (
    <PrivateLayout>
      <WrapPrivatePage>
        <InnerWrapPrivatePage>
          <BreadCrumbs currentPage={PAGE_TITLE} />

          <PageTitleSection title={PAGE_TITLE} />

          <ErrorLoaderWrapper
            isError={!!errorManager || !!error}
            isLoading={loadingManager || loading}
            isEmpty={!data?.orders.length}
          >
            <OrdersGrid>
              <ManagerCard manager={manager} />
              <div>
                {data?.orders.map(order => <OrderRow key={order.order_id} order={order} />)}
              </div>
            </OrdersGrid>
          </ErrorLoaderWrapper>

        </InnerWrapPrivatePage>
      </WrapPrivatePage>
    </PrivateLayout>
  )
}
