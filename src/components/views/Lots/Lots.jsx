import React, { useEffect } from 'react'
import PrivateLayout from '../../shared/layouts/PrivateLayout/PrivateLayout'
import { InnerWrapPrivatePage, WrapPrivatePage } from '../../shared/styled/WrapPrivatePage'
import { BreadCrumbs } from '../../shared/BreadCrumbs/BreadCrumbs'
import { useFetch } from 'use-http'
import { PageTitleSection } from '../../shared/styled/PageTitleSection'
import { ErrorLoaderWrapper } from '../../shared/ErrorLoaderWrapper/ErrorLoaderWrapper'
import { StyledCard } from '../../shared/styled/StyledCard'
import { StyledText, StyledTitle } from '../../shared/styled/Typography'
import { LotRow } from './components/LotRow'
import { LotsGrid, StyledCheckoutWrapper, StyledPriceWrapper } from './styles'
import { SpacerH10, SpacerH20 } from '../../shared/styled/Spacers'
import { ShoppingCartButton } from '../../shared/ShoppingCartButton/ShoppingCartButton'
import { StyledHeaderTitle } from '../../shared/layouts/PrivateLayout/styles'
import { useLocalStorage } from '../../../hooks/useLocalStorage'
import { useNotify } from '../../../hooks/useSnakbar'

const PAGE_TITLE = 'Лоты'
const LOTS_API = 'get-items-lot.php '

export const Lots = () => {
  const [lotsCart, addToLotsCart] = useLocalStorage('lotsCart', [])
  const { showError, showSuccess } = useNotify()
  const { get, response, error, loading } = useFetch(LOTS_API)

  const addToShoppingCart = (lot) => {
    if (lotsCart.some(lotInCart => lotInCart.lot_name === lot.lot_name)) {
      showError('Такой товар уже есть в корзине!')
      return
    }

    addToLotsCart([...lotsCart, lot])
    showSuccess('Товар был добавлен в корзину!')
  }

  useEffect(() => get(), [])

  const lots = response?.data?.lots || []

  return (
    <PrivateLayout>
      <WrapPrivatePage>
        <InnerWrapPrivatePage>
          <BreadCrumbs currentPage={PAGE_TITLE} />

          <PageTitleSection title={PAGE_TITLE} />

          <ErrorLoaderWrapper isError={!!error} isLoading={loading} isEmpty={!lots.length}>
            {lots.map(lot =>
              <div key={lot.lot_name}>
                <StyledCard>

                  <StyledTitle>{lot.lot_name}</StyledTitle>
                  <SpacerH20 />

                  <LotsGrid>
                    {lot.items.map((lotItem, index) => <LotRow key={lotItem.serial_num} countNum={index + 1} {...lotItem} />)}
                  </LotsGrid>

                  <StyledCheckoutWrapper>
                    <StyledPriceWrapper>
                      <StyledText>Цена лота</StyledText>
                      <StyledHeaderTitle>{lot.lot_sum}</StyledHeaderTitle>
                    </StyledPriceWrapper>

                    <ShoppingCartButton onClick={() => addToShoppingCart(lot)} />
                  </StyledCheckoutWrapper>
                </StyledCard>

                <SpacerH10 />
              </div>
            )}
          </ErrorLoaderWrapper>

        </InnerWrapPrivatePage>
      </WrapPrivatePage>
    </PrivateLayout>
  )
}
