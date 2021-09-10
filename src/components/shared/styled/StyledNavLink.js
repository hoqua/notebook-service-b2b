import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

export const StyledTopNavLink = styled(NavLink).attrs({
  activeClassName: 'active'
})`
  &.active {
    svg {
      path {
        stroke: ${({ color, theme }) => color || theme.status.success};
      }
    }
  }
`

export const StyledSideNavLink = styled(NavLink).attrs({
  activeClassName: 'active'
})`
  display: flex;
  align-items: center;
  gap: 15px;

  margin-left: -25px;
  margin-right: -25px;
  padding: 20px;
  color: ${({ theme }) => theme.typography.light};
  text-decoration: none;
  transition: background-color 0.3s ease;

  &.active {
    background-color:  ${({ color, theme }) => color || theme.bg.light};
  }

  &:not(.active):hover{
    background-color: ${({ theme }) => theme.bg.light};
  }

  &:first-of-type {
    border-top: 1px solid ${({ theme }) => theme.brand.gray};
  }
`
