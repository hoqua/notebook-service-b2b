import React from 'react'
import styled from 'styled-components'
import Logo from '../../../assets/img/logo-small.avif'
import { useHistory } from 'react-router-dom'
import { StyledHeader } from './PrivateLayout/styles'

export default function PublicLayout ({ children }) {
  const history = useHistory()

  return (
    <>
      <StyledHeader>
        <InnerHeaderContainer>
          <img
            src={Logo}
            alt='small logo'
            width='194px'
            height='28px'
            onClick={() => history.push('/')}
            style={{ cursor: 'pointer' }}
          />
        </InnerHeaderContainer>
      </StyledHeader>
      {children}
    </>
  )
}

const InnerHeaderContainer = styled.header`
  height: 100%;
  width: 100%;
  max-width: 1170px;
  display: flex;
  align-items: center;
`
