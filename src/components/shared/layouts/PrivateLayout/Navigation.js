import React from 'react'
import styled from 'styled-components'
import { ReactComponent as ShoppingCart } from '../../../../assets/icons/shoping-cart.svg'
import { ReactComponent as Grid } from '../../../../assets/icons/grid.svg'
import { StyledTopNavLink } from '../../styled/StyledNavLink'
import { useLocalStorage } from '../../../../hooks/useLocalStorage'
import {
  LOTS_CART_KEY,
  NOTEBOOKS_CART_KEY,
  ORDERS_ROUTE,
  ORDERS_STORE_KEY,
  SHOPPING_CART_ROUTE
} from '../../../../constants/constants'
import { flexAlignJustify } from '../../styled/css'

export default function Navigation() {
  const [notebooksCart] = useLocalStorage(NOTEBOOKS_CART_KEY, [])
  const [lostCart] = useLocalStorage(LOTS_CART_KEY, [])
  const [orders] = useLocalStorage(ORDERS_STORE_KEY, [])

  const numberOrders = orders?.length || 0
  const isSomethingOrdered = numberOrders > 0

  const numberItemsInCart =
    (notebooksCart?.length || 0) + (lostCart?.length || 0)
  const isSomethingInCart = numberItemsInCart > 0

  return (
    <div
      style={{
        display: 'flex',
        height: '100%'
      }}
    >
      <NavItem>
        <StyledTopNavLink exact to={ORDERS_ROUTE}>
          <div style={{ position: 'relative' }}>
            {isSomethingOrdered && <Badge>{numberOrders}</Badge>}
            <Grid />
          </div>
        </StyledTopNavLink>
      </NavItem>

      <NavItem>
        <StyledTopNavLink exact to={SHOPPING_CART_ROUTE}>
          <div style={{ position: 'relative' }}>
            {isSomethingInCart && <Badge>{numberItemsInCart}</Badge>}
            <ShoppingCart />
          </div>
        </StyledTopNavLink>
      </NavItem>
    </div>
  )
}

const NavItem = styled.div`
  border-right: 1px solid ${({ theme }) => theme.brand.gray};
  width: 65px;
  ${flexAlignJustify};
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.bg.light};
  }

  &:first-of-type {
    border-left: 1px solid ${({ theme }) => theme.brand.gray};
  }
`

const Badge = styled.div`
  position: absolute;
  right: -5px;
  top: -5px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.brand.dark};
  color: #fff;
  font-size: 0.65rem;
  line-height: 0.65rem;
  height: 15px;
  width: 15px;
  padding: 2px;
  ${flexAlignJustify}
`
