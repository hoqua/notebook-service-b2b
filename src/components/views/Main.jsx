import React from 'react'
import PrivateLayout from '../shared/layouts/PrivateLayout/PrivateLayout'
import { HeadTile, StyledTitle } from '../shared/styled/Typography'
import {
  InnerWrapPrivatePage,
  WrapPrivatePage
} from '../shared/styled/WrapPrivatePage'
import { StyledCard } from '../shared/styled/StyledCard'
import styled from 'styled-components'
import { StyledSideNavLink } from '../shared/styled/StyledNavLink'
import { SpacerH20, SpacerH25 } from '../shared/styled/Spacers'
import { ReactComponent as Laptop } from '../../assets/icons/laptop.svg'
import { ReactComponent as LaptopBroken } from '../../assets/icons/laptop-broken.svg'
import { ReactComponent as Shipping } from '../../assets/icons/shipping.svg'
import { largeGap } from '../shared/styled/css'
import {
  LOTS_ROUTE,
  SHOWCASE_ROUTE,
  SHOWCASE_UNFINISHED_ROUTE
} from '../../constants/constants'
import { MainNavigationSectionRow } from '../shared/MainNavigationSectionRow/MainNavigationSectionRow'
import unfinishedImg from '../../assets/img/unfinished.avif'
import lots from '../../assets/img/lots.avif'
import showcaseImg from '../../assets/img/showcase.avif'

export default function Main() {
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

              <StyledSideNavLink to={SHOWCASE_ROUTE}>
                <Laptop />
                Готовые
              </StyledSideNavLink>
              <StyledSideNavLink to={SHOWCASE_UNFINISHED_ROUTE}>
                <LaptopBroken />
                Не готовые
              </StyledSideNavLink>
              <StyledSideNavLink to={LOTS_ROUTE}>
                <Shipping />
                Лоты ноутбуков
              </StyledSideNavLink>
            </SideBar>

            <Banner>
              <MainNavigationSectionRow
                imagePath={showcaseImg}
                title="Готовые"
                navigateTo={SHOWCASE_ROUTE}
                text="Тут представлены полностью готовые к перепродаже ноутбуки. Они протестированы, укомплектованы, установлено ПО. На них предоставляется гарантия 1 мес. В комплекте идут зарядные устройства."
              />
              <SpacerH20 />

              <MainNavigationSectionRow
                imagePath={unfinishedImg}
                title="Не готовые"
                navigateTo={SHOWCASE_UNFINISHED_ROUTE}
                text="Тут представлены рабочие и не рабочие ноутбуки с какими либо дефектами или отсутсвующими частями. Они проверены только на включение. В ремонте не были, продаются как есть, без гарантий и блоков питания."
              />
              <SpacerH20 />

              <MainNavigationSectionRow
                imagePath={lots}
                title="Лоты"
                navigateTo={LOTS_ROUTE}
                text="В лотах представлены ноутбуки в количестве по акционной цене. Лоты могут включать как рабочие, так и не рабочие ноутбуки."
              />
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
  width: 100%;
`

export const MainGrid = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  ${largeGap}
`
