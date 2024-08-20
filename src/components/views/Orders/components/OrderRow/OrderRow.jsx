import React, { useState } from 'react'
import { StyledOrderNumber, StyledOrderRow } from '../styles'
import { ExpandButton } from '../../../../shared/ExpandButton/ExpandButton'
import { OrderStatus } from './OrderStatus'
import { RowItem } from '../../../../shared/RowItem/RowItem'
import { StyledCard } from '../../../../shared/styled/StyledCard'
import { SpacerH10 } from '../../../../shared/styled/Spacers'

const formatPrice = (number) => {
  if (!number) return 0

  return number?.toFixed(2) || 0
}

export const OrderRow = ({ order }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <>
      <StyledCard>
        <StyledOrderRow>
          <RowItem title="Номер заказа">
            <StyledOrderNumber>№ {order.order_id}</StyledOrderNumber>
          </RowItem>

          <RowItem title="Статус заказа">
            <OrderStatus satus={order.status} />
          </RowItem>

          <RowItem title="Дата заказа">
            <p>{order.order_date}</p>
          </RowItem>

          <RowItem title="Кол-во">
            <p>{order.items.length}</p>
          </RowItem>

          <RowItem title="Цена" />

          <RowItem title="Сумма">
            <p>{formatPrice(order.order_sum)}</p>
          </RowItem>
        </StyledOrderRow>

        {isExpanded && <SpacerH10 />}
        {isExpanded &&
          order.items.map((item, index) => (
            <StyledOrderRow key={item.serial_num}>
              <div />

              <RowItem title={!index && 'Артикул'}>
                <p> {item.serial_num}</p>
              </RowItem>

              <RowItem title={!index && 'Наименование'}>
                <p>{item.item_name}</p>
              </RowItem>

              <RowItem>
                <p>{item.num}</p>
              </RowItem>

              <RowItem>
                <p>{formatPrice(item.item_price)}</p>
              </RowItem>

              <RowItem>
                <p>{formatPrice(item.item_sum)}</p>
              </RowItem>
            </StyledOrderRow>
          ))}

        <ExpandButton
          isExpand={isExpanded}
          onClick={() => setIsExpanded(!isExpanded)}
        />
      </StyledCard>

      <SpacerH10 />
    </>
  )
}
