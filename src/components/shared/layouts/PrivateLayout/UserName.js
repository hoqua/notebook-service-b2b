import React from 'react'
import { StyledLink } from '../../styled/Typography'
import { StyledHeaderTitle } from './styles'

export default function UserName ({ onClick }) {
  return (
    <>
      <div style={{ display: 'flex' }}>
        <div style={{ textAlign: 'right' }}>
          <StyledHeaderTitle>Серебряков Александр</StyledHeaderTitle>
          <StyledLink to='#' onClick={onClick}>Выйти</StyledLink>
        </div>
      </div>
    </>
  )
}
