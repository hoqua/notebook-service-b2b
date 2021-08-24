import React from 'react'
import styled from 'styled-components'
import Logo from '../../../assets/img/logo-small.avif'
import { useHistory } from 'react-router-dom'

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

const StyledHeader = styled.header`
  width: 100%;
  position: fixed;
  display: flex;
  justify-content: center;
  height: 62px;
  background-color: #fff;
  box-shadow: 0 3px 20px rgba(17, 40, 120, 0.07);
`
const InnerHeaderContainer = styled.header`
  height: 100%;
  width: 100%;
  max-width: 1170px;
  display: flex;
  align-items: center;
`
