import React from 'react'
import { SpacerH25 } from './styled/Spacers'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

export const BreadCrumbs = ({ currentPage }) => {
  return (
    <>
      <div style={{ display: 'flex', gap: '5px' }}>
        <StyledBreadCrumb to='/'>Главная</StyledBreadCrumb>
        <StyledArrow> {'>'} </StyledArrow>
        <StyledCurrentPage>{currentPage}</StyledCurrentPage>
      </div>
      <SpacerH25 />
    </>
  )
}

const StyledBreadCrumb = styled(NavLink)`
  color: ${({ theme }) => theme.brand.dark};
  text-decoration: none;
`
const StyledArrow = styled.span`
  font-weight: 500;
  color: #CCC;
`

const StyledCurrentPage = styled.p`
  color: ${({ theme }) => theme.typography.light};
`
