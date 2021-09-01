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
