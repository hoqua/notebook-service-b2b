import React from 'react'
import { StyledOrderNumber, StyledOrderRow, StyledOrderRowItem } from '../styles'
import { StyledText } from '../../../../shared/styled/Typography'
import { SpacerH5 } from '../../../../shared/styled/Spacers'
import { ExpandButton } from '../../../../shared/ExpandButton/ExpandButton'
import { OrderStatus } from './OrderStatus'

const getOrderPrice = (orders) => orders.reduce((sum, order) => sum + order.item_price, 0)

export const OrderRow = ({ order }) => {
  return (
    <StyledOrderRow>

      <StyledOrderRowItem>
        <StyledText>Номер заказа</StyledText>
        <SpacerH5 />
        <StyledOrderNumber>№ {order.order_id}</StyledOrderNumber>
      </StyledOrderRowItem>

      <StyledOrderRowItem>
        <StyledText>Статус заказа</StyledText>
        <SpacerH5 />
        <OrderStatus satus={order.status} />
      </StyledOrderRowItem>

      <StyledOrderRowItem>
        <StyledText>Дата заказа</StyledText>
        <SpacerH5 />
        <p>{order.order_date}</p>
      </StyledOrderRowItem>

      <StyledOrderRowItem>
        <StyledText>Кол-во</StyledText>
        <SpacerH5 />
        <p>{order.items.length}</p>
      </StyledOrderRowItem>

      <StyledOrderRowItem>
        <StyledText>Цена</StyledText>
      </StyledOrderRowItem>

      <StyledOrderRowItem>
        <StyledText>Сумма</StyledText>
        <SpacerH5 />
        <p>{getOrderPrice(order.items)}</p>
      </StyledOrderRowItem>

      <ExpandButton />
    </StyledOrderRow>
  )
}
