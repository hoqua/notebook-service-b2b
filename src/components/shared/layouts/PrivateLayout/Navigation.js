import React from 'react'
import styled from 'styled-components'
import { ReactComponent as ShoppingCart } from '../../../../assets/icons/shoping-cart.svg'
import { ReactComponent as Grid } from '../../../../assets/icons/grid.svg'
import { StyledTopNavLink } from '../../styled/StyledNavLink'
import { flexAlignJustify } from '../../styled/css'
import { useLocalStorage } from '../../../../hooks/useLocalStorage'

export default function Navigation () {
  const [storageCart] = useLocalStorage('cart', [])

  return (
    <div
      style={{
        display: 'flex',
        height: '100%'
      }}
    >
      <NavItem>
        <StyledTopNavLink exact to='/orders'>
          <Grid />
        </StyledTopNavLink>
      </NavItem>

      <NavItem>
        <StyledTopNavLink exact to='/shopping-cart'>
          <div style={{ position: 'relative' }}>
            {!!storageCart.length && <Badge>{storageCart.length}</Badge>}
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
  font-size: .65rem;
  line-height: .65rem;
  height: 15px;
  width: 15px;
  padding: 2px;
  ${flexAlignJustify}
`
