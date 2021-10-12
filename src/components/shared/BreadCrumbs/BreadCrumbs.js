import React from 'react'
import { SpacerH20 } from '../styled/Spacers'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { RotatedArrow } from '../styled/RotatedArrow'
import { darkColor, flexAlign, smallGap } from '../styled/css'

export const BreadCrumbs = ({ currentPage }) => {
  return (
    <>
      <Wrapper>
        <StyledBreadCrumb to='/'>Главная</StyledBreadCrumb>
        <RotatedArrow color='#CCC' deg={90} />
        <StyledCurrentPage>{currentPage}</StyledCurrentPage>
      </Wrapper>
      <SpacerH20 />
    </>
  )
}

const StyledBreadCrumb = styled(NavLink)`
  ${darkColor};
  text-decoration: none;
`

const StyledCurrentPage = styled.p`
  color: ${({ theme }) => theme.typography.light};
`
const Wrapper = styled.div`
  ${flexAlign};
  ${smallGap};
`
