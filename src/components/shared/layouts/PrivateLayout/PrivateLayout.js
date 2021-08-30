import React from 'react'
import Logo from '../../../../assets/img/logo-small.avif'
import { useHistory } from 'react-router-dom'
import { InnerHeaderContainer, StyledHeader } from './styles'
import Info from './Info'
import Navigation from './Navigation'
import UserName from './UserName'
import { useAuth } from '../../../../service/AuthService'

export default function PrivateLayout ({ children }) {
  const history = useHistory()
  const authService = useAuth()

  const logOut = () => authService.logOut()

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

          <Info />

          <Navigation />

          <UserName onClick={logOut} />
        </InnerHeaderContainer>
      </StyledHeader>
      {children}
    </>
  )
}
