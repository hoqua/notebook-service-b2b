import React from 'react'
import PrivateLayout from '../shared/layouts/PrivateLayout/PrivateLayout'
import { HeadTile, StyledTitle } from '../shared/styled/Typography'
import { InnerWrapPrivatePage, WrapPrivatePage } from '../shared/styled/WrapPrivatePage'
import { StyledCard } from '../shared/styled/StyledCard'
import styled from 'styled-components'
import { StyledSideNavLink } from '../shared/styled/StyledNavLink'
import { SpacerH20, SpacerH25 } from '../shared/styled/Spacers'

export default function Main () {
  return (
    <PrivateLayout>
      <WrapPrivatePage>
        <InnerWrapPrivatePage>
          <HeadTile>Главная</HeadTile>
          <SpacerH20 />

          <MainGrid>
            <SideBar>
              <StyledTitle>Каталог</StyledTitle>
              <SpacerH25 />

              <StyledSideNavLink to='/'>Не готовые</StyledSideNavLink>
              <StyledSideNavLink to='/vit'>Витрина</StyledSideNavLink>
              <StyledSideNavLink to='/lot'>Лоты ноутбуков</StyledSideNavLink>

            </SideBar>

            <Banner>
              <StyledTitle>The banner</StyledTitle>
            </Banner>

          </MainGrid>
        </InnerWrapPrivatePage>
      </WrapPrivatePage>
    </PrivateLayout>
  )
}

export const SideBar = styled(StyledCard)`
  width: 420px;
`
export const Banner = styled(StyledCard)`
  width: 100% ;
`

export const MainGrid = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 30px;
`
