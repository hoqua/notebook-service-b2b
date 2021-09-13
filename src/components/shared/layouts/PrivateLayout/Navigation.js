import React from 'react'
import styled from 'styled-components'
import { ReactComponent as ShoppingCart } from '../../../../assets/icons/shoping-cart.svg'
import { ReactComponent as Grid } from '../../../../assets/icons/grid.svg'
import { StyledTopNavLink } from '../../styled/StyledNavLink'
import { flexAlignJustify } from '../../styled/css'

export default function Navigation () {
  return (
    <div
      style={{
        display: 'flex',
        height: '100%'
      }}
    >
      <NavItem>
        <StyledTopNavLink exact to='/'>
          <Grid />
        </StyledTopNavLink>
      </NavItem>

      <NavItem>
        <StyledTopNavLink exact to='/shopping-cart'>
          <ShoppingCart />
        </StyledTopNavLink>
      </NavItem>
    </div>
  )
}

const NavItem = styled.div`
  border-right: 1px solid ${({ theme }) => theme.brand.gray};
  padding: 20px;
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
