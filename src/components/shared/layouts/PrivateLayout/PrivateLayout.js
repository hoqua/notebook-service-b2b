import React from 'react'
import { useHistory } from 'react-router-dom'
import { InnerHeaderContainer, StyledHeader } from './styles'
import Info from './Info'
import Navigation from './Navigation'
import UserName from './UserName'
import { useAuth } from '../../../../service/AuthService'
import { ReactComponent as Logo } from '../../../../assets/icons/logo.svg'

export default function PrivateLayout({ children }) {
  const history = useHistory()
  const authService = useAuth()

  const logOut = () => authService.logOut()

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

          <Info />

          <Navigation />

          <UserName onClick={logOut} />
        </InnerHeaderContainer>
      </StyledHeader>
      {children}
    </>
  )
}
