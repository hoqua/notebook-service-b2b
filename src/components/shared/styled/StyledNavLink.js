import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import {
  CARD_PADDING,
  flexAlign,
  flexAlignJustify,
  fullPage,
  mediumGap
} from './css'

export const StyledTopNavLink = styled(NavLink).attrs({
  activeclassname: 'active'
})`
  ${fullPage}
  ${flexAlignJustify}
  
  &.active {
    svg {
      path {
        stroke: ${({ color, theme }) => color || theme.brand.dark};
      }
    }
  }
`

export const StyledSideNavLink = styled(NavLink).attrs({
  activeclassname: 'active'
})`
  ${flexAlign};
  ${mediumGap};

  margin-left: -${CARD_PADDING};
  margin-right: -${CARD_PADDING};
  padding: ${CARD_PADDING};
  color: ${({ theme }) => theme.typography.light};
  text-decoration: none;
  transition: background-color 0.3s ease;

  &.active {
    background-color: ${({ color, theme }) => color || theme.bg.light};
  }

  &:not(.active):hover {
    background-color: ${({ theme }) => theme.bg.light};
  }

  &:first-of-type {
    border-top: 1px solid ${({ theme }) => theme.brand.gray};
  }
`
