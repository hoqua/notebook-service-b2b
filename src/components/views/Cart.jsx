import React from 'react'
import { InnerWrapPrivatePage, WrapPrivatePage } from '../shared/styled/WrapPrivatePage'
import { BreadCrumbs } from '../shared/BreadCrumbs'
import { PageTitleSection } from '../shared/styled/PageTitleSection'
import PrivateLayout from '../shared/layouts/PrivateLayout/PrivateLayout'
import { StyledCard } from '../shared/styled/StyledCard'
import styled from 'styled-components'
import { flexAlignJustify, largeGap } from '../shared/styled/css'
import { StyledLink, StyledText, StyledTitle } from '../shared/styled/Typography'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { ReactComponent as Trash } from '../../assets/icons/trash.svg'
import { AppButton } from '../shared/styled/NavigationButton'
import { SpacerH10, SpacerH20, SpacerH30 } from '../shared/styled/Spacers'
import { IconButton } from '../shared/styled/IconButton'
import { getDiscountPrice, getDiscountPriceStyled } from '../../utils/substractPercent'
import { useSession } from '../../service/SessonDataService'
import { NotebookImage } from '../shared/NotebookRow/NotebookImage/NotebookImage'

const PAGE_TITLE = 'Корзина'
export const Cart = () => {
  const { user } = useSession()
  const [storageCart, setStorageCart] = useLocalStorage('cart', [])

  const removeFromCart = (notebookToRemove) => {
    const index = storageCart.findIndex(notebook => notebook.serial_num === notebookToRemove.serial_num)
    if (index === -1) return

    storageCart.splice(index, 1)
    setStorageCart(storageCart)
  }

  const sum = storageCart.reduce((acc, notebook) => acc + notebook.item_price, 0)
  const discountTotal = getDiscountPrice(user, sum)
  const sumDiff = sum - discountTotal

  return (
    <PrivateLayout>
      <WrapPrivatePage>
        <InnerWrapPrivatePage>
          <BreadCrumbs currentPage={PAGE_TITLE} />

          <PageTitleSection title={PAGE_TITLE} />
          <CartWrapper>
            <StyledCard>
              <StyledTitle>
                {storageCart.length
                  ? <>Выбранные товары <SpacerH10 /></>
                  : <StyledText>Вы еще ничего не выбрали. <StyledLink to='/'>Вернуться на главную</StyledLink></StyledText>}
              </StyledTitle>

              {!!storageCart.length &&
              storageCart.map(notebook =>
                <CartRow key={notebook.serial_num}>
                  <NotebookImage notebook={notebook} />

                  <div>
                    <StyledText>{notebook.mark_name}</StyledText>
                    <p>{notebook.item_name}</p>
                    <StyledText>{notebook.serial_num}</StyledText>
                  </div>

                  <PriceText>Цена: <PriceWrapper>{notebook.item_price} {getDiscountPriceStyled(user, notebook.item_price)}</PriceWrapper></PriceText>

                  <ActionsWrapper>
                    <IconButton onClick={() => removeFromCart(notebook)}>
                      <Trash />
                    </IconButton>
                  </ActionsWrapper>
                </CartRow>
              )}
            </StyledCard>

            {!!storageCart.length &&
              <StyledCard>
                <StyledTitle>Итого</StyledTitle>
                <SpacerH20 />

                <PriceText>Товаров - {storageCart.length}, на сумму: <PriceWrapper>{sum}</PriceWrapper></PriceText>
                <SpacerH10 />

                <PriceText>Скидка: <PriceWrapper>{sumDiff} ({user.ppg_perc}%)</PriceWrapper></PriceText>
                <SpacerH10 />

                <PriceText>Итог: <PriceWrapper>{discountTotal}</PriceWrapper></PriceText>
                <SpacerH30 />
                <ActionWrapper>
                  <AppButton>Оформить заказ</AppButton>
                </ActionWrapper>
              </StyledCard>}
          </CartWrapper>

        </InnerWrapPrivatePage>
      </WrapPrivatePage>
    </PrivateLayout>
  )
}

const CartWrapper = styled.div`
  display: grid;
  grid-template-columns: .7fr .3fr;
  ${largeGap}
`

const CartRow = styled.div`
  display: grid;
  grid-template-columns: .2fr .4fr .3fr .3fr;
  align-items: center;
  align-content: center;
  padding-top: 10px;
  padding-bottom: 10px;
  border-top: 1px solid ${({ theme }) => theme.brand.gray};

  ${largeGap}
  &:first-of-type {
    border-top: none;
  }
`

const ActionsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`

const PriceText = styled.p`
  display: flex;
  justify-content: space-between;
  font-size: .9rem;
`

const PriceWrapper = styled.span`
  font-weight: 500;
`

const ActionWrapper = styled.div`
  ${flexAlignJustify}
`
