import React from 'react'
import { StyledLink } from '../../styled/Typography'
import { StyledHeaderTitle } from './styles'
import { useSession } from '../../../../service/SessonDataService'

export default function UserName({ onClick }) {
  const session = useSession()

  return (
    <>
      <div style={{ display: 'flex' }}>
        <div style={{ textAlign: 'right' }}>
          <StyledHeaderTitle>{session?.user?.client_name}</StyledHeaderTitle>
          <StyledLink to="#" onClick={onClick}>
            Выйти
          </StyledLink>
        </div>
      </div>
    </>
  )
}
