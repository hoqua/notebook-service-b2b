import React from 'react'
import { SpacerH20 } from './styled/Spacers'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { RotatedArrow } from './styled/RotatedArrow'

export const BreadCrumbs = ({ currentPage }) => {
  return (
    <>
      <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
        <StyledBreadCrumb to='/'>Главная</StyledBreadCrumb>
        <RotatedArrow color='#CCC' deg={90} />
        <StyledCurrentPage>{currentPage}</StyledCurrentPage>
      </div>
      <SpacerH20 />
    </>
  )
}

const StyledBreadCrumb = styled(NavLink)`
  color: ${({ theme }) => theme.brand.dark};
  text-decoration: none;
`

const StyledCurrentPage = styled.p`
  color: ${({ theme }) => theme.typography.light};
`
