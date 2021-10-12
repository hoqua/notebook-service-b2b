import React from 'react'
import { StyledCard } from '../../../shared/styled/StyledCard'

export const OrderRow = ({ order }) => {
  return (
    <StyledCard>
      {order.order_id}
    </StyledCard>
  )
}
