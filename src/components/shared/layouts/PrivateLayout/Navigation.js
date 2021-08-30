import React from 'react'
import styled, { useTheme } from 'styled-components'
import Grid from '../../icons/Grid'
import Cart from '../../icons/Cart'
import User from '../../icons/User'

export default function Navigation () {
  const theme = useTheme()
  return (
    <>
      <div style={{ display: 'flex', height: '100%' }}>
        <NavItem>
          <Grid color={theme.status.success} />
        </NavItem>

        <NavItem>
          <Cart />
        </NavItem>

        <NavItem>
          <User />
        </NavItem>
      </div>
    </>
  )
}

const NavItem = styled.div`
  border-right:1px solid ${({ theme }) => theme.brand.gray};
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover{
    background-color: ${({ theme }) => theme.brand.gray};
  }
  
  &:first-of-type {
    border-left:1px solid ${({ theme }) => theme.brand.gray};
  }
`
