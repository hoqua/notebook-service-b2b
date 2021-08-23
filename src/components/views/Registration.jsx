import React from 'react'
import PublicLayout from '../shared/layouts/PublicLayout'
import { PublicContentContainer } from '../shared/styled/PublicContentContainer'
import { WrapPageLight } from '../shared/styled/WrapPageLight'
import { HeadTile } from '../shared/styled/Titles'
import styled from 'styled-components'

export default function Registration () {
  return (
    <PublicLayout>
      <WrapPageLight>
        <PublicContentContainer>
          <RegistrationContainer>
            <HeadTile>Регистрация</HeadTile>

          </RegistrationContainer>

        </PublicContentContainer>
      </WrapPageLight>
    </PublicLayout>
  )
}

export const RegistrationContainer = styled.div`
  width: 100%;
  height: 100%;
`
