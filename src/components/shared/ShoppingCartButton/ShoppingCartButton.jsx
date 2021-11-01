import { IconButton } from '../styled/IconButton'
import React from 'react'
import styled from 'styled-components'
import { ReactComponent as ShoppingCart } from '../../../assets/icons/shoping-cart.svg'

export const ShoppingCartButton = ({ onClick }) => {
  return (
    <IconButton onClick={onClick}>
      <StyledShoppingCard />
    </IconButton>
  )
}

const StyledShoppingCard = styled(ShoppingCart)`
  path {
    stroke: ${({ theme }) => theme.brand.dark};
  }
`
