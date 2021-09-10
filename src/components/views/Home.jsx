import React from 'react'
import { WrapPageLight } from '../shared/styled/WrapPageLight'
import { PublicContentContainer } from '../shared/styled/PublicContentContainer'
import styled from 'styled-components'
import { HeadTile } from '../shared/styled/Typography'
import { SpacerH40 } from '../shared/styled/Spacers'
import { NavigationButton } from '../shared/styled/NavigationButton'
import { ReactComponent as Logo } from '../../assets/icons/logo.svg'

export default function Home () {
  return (
    <WrapPageLight>
      <PublicContentContainer>
        <HomeContainer>
          <Logo />
          <SpacerH40 />

          <HeadTile>
            Оптовый портал ноутбуков и комплектующих
          </HeadTile>

          <SpacerH40 />

          <ActionButtonsContainer>
            <NavigationButton to='/registration'>Регистрация</NavigationButton>
            <NavigationButton to='/login'>Вход</NavigationButton>
          </ActionButtonsContainer>
        </HomeContainer>

      </PublicContentContainer>
    </WrapPageLight>
  )
}

const HomeContainer = styled.div`
  width: 360px;
`

const ActionButtonsContainer = styled.div`
  display: flex;
  column-gap: 15px;
`
