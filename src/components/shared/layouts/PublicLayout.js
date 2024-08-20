import React from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { StyledHeader } from './PrivateLayout/styles'
import { ReactComponent as Logo } from '../../../assets/icons/logo.svg'
import { flexAlign, fullPage } from '../styled/css'

export default function PublicLayout({ children }) {
  const history = useHistory()

  return (
    <>
      <StyledHeader>
        <InnerHeaderContainer>
          <Logo
            width="194"
            height="29"
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
  ${fullPage};
  max-width: 1440px;
  ${flexAlign};
`
