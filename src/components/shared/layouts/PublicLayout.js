import React from 'react'
import styled from 'styled-components'
import Logo from '../Logo'

export default function PublicLayout ({ children }) {
  return (
    <>
      <StyledHeader>
        <InnerHeaderContainer>
          <Logo />
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
