import React, { useEffect } from 'react'
import PrivateLayout from '../../shared/layouts/PrivateLayout/PrivateLayout'
import {
  InnerWrapPrivatePage,
  WrapPrivatePage
} from '../../shared/styled/WrapPrivatePage'
import { BreadCrumbs } from '../../shared/BreadCrumbs/BreadCrumbs'
import { useFetch } from 'use-http'
import { PageTitleSection } from '../../shared/styled/PageTitleSection'
import { ErrorLoaderWrapper } from '../../shared/errorComponents/ErrorLoaderWrapper/ErrorLoaderWrapper'
import { StyledCard } from '../../shared/styled/StyledCard'
import { StyledText, StyledTitle } from '../../shared/styled/Typography'
import { LotRow } from './components/LotRow'
import { LotsGrid, StyledCheckoutWrapper, StyledPriceWrapper } from './styles'
import { SpacerH10, SpacerH20 } from '../../shared/styled/Spacers'
import { ShoppingCartButton } from '../../shared/ShoppingCartButton/ShoppingCartButton'
import { StyledHeaderTitle } from '../../shared/layouts/PrivateLayout/styles'
import { useLocalStorage } from '../../../hooks/useLocalStorage'
import { API_LOTS, LOTS_CART_KEY } from '../../../constants/constants'
import { IfAble, USER_ACTION } from '../../../permissions/permissions'
import { toast } from '../../shared/Toaster/use-toast'

const PAGE_TITLE = 'Лоты'

export const Lots = () => {
  const [lotsCart, addToLotsCart] = useLocalStorage(LOTS_CART_KEY, [])
  const { get, data, error, loading } = useFetch(API_LOTS)

  const addToShoppingCart = (lot) => {
    if (lotsCart.some((lotInCart) => lotInCart.lot_name === lot.lot_name)) {
      toast({
        title: 'Такой товар уже есть в корзине!',
        variant: 'destructive'
      })
      return
    }

    addToLotsCart([...lotsCart, lot])
    toast({
      title: 'Товар был добавлен в корзину!',
      style: { color: 'green' }
    })
  }

  useEffect(() => {
    const getLots = async () => {
      try {
        await get()
      } catch (error) {
        console.log('Failed to get lots', error)
      }
    }

    getLots()
  }, [])

  const lots = data?.lots || []
  const isLoadingOrNotFetchedYet = !data || loading

  return (
    <PrivateLayout>
      <WrapPrivatePage>
        <InnerWrapPrivatePage>
          <BreadCrumbs currentPage={PAGE_TITLE} />

          <PageTitleSection title={PAGE_TITLE} />

          <ErrorLoaderWrapper
            isError={!!error}
            isLoading={isLoadingOrNotFetchedYet}
            isEmpty={!lots.length}
          >
            {lots.map((lot) => (
              <div key={lot.lot_name}>
                <StyledCard>
                  <StyledTitle>{lot.lot_name}</StyledTitle>
                  <SpacerH20 />

                  <LotsGrid>
                    {lot.items.map((lotItem, index) => (
                      <LotRow
                        key={lotItem.serial_num}
                        countNum={index + 1}
                        {...lotItem}
                      />
                    ))}
                  </LotsGrid>

                  <StyledCheckoutWrapper>
                    <StyledPriceWrapper>
                      <StyledText>Цена лота</StyledText>
                      <StyledHeaderTitle>{lot.lot_sum}</StyledHeaderTitle>
                    </StyledPriceWrapper>

                    <IfAble toDo={[USER_ACTION.DO_ORDER]} errorComponent={null}>
                      <ShoppingCartButton
                        onClick={() => addToShoppingCart(lot)}
                      />
                    </IfAble>
                  </StyledCheckoutWrapper>
                </StyledCard>

                <SpacerH10 />
              </div>
            ))}
          </ErrorLoaderWrapper>
        </InnerWrapPrivatePage>
      </WrapPrivatePage>
    </PrivateLayout>
  )
}
