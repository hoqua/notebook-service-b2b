import React from 'react'
import { StyledOrderNumber, StyledOrderRow } from '../styles'
import { StyledText } from '../../../../shared/styled/Typography'
import { ExpandButton } from '../../../../shared/ExpandButton/ExpandButton'
import { OrderStatus } from './OrderStatus'
import { RowItem } from '../../../../shared/RowItem/RowItem'

const getOrderPrice = (orders) => orders.reduce((sum, order) => sum + order.item_price, 0)

export const OrderRow = ({ order }) => {
  return (
    <StyledOrderRow>

      <RowItem title='Номер заказа'>
        <StyledOrderNumber>№ {order.order_id}</StyledOrderNumber>
      </RowItem>

      <RowItem title='Статус заказа'>
        <OrderStatus satus={order.status} />
      </RowItem>

      <RowItem title='Дата заказа'>
        <p>{order.order_date}</p>
      </RowItem>

      <RowItem title='Кол-во'>
        <p>{order.items.length}</p>
      </RowItem>

      <RowItem title='Цена'>
        <StyledText>Цена</StyledText>
      </RowItem>

      <RowItem title='Сумма'>
        <p>{getOrderPrice(order.items)}</p>
      </RowItem>

      <ExpandButton />
    </StyledOrderRow>
  )
}
