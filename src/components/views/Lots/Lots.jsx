import React, { useEffect } from 'react'
import PrivateLayout from '../../shared/layouts/PrivateLayout/PrivateLayout'
import { InnerWrapPrivatePage, WrapPrivatePage } from '../../shared/styled/WrapPrivatePage'
import { BreadCrumbs } from '../../shared/BreadCrumbs/BreadCrumbs'
import { useFetch } from 'use-http'
import { PageTitleSection } from '../../shared/styled/PageTitleSection'
import { ErrorLoaderWrapper } from '../../shared/ErrorLoaderWrapper/ErrorLoaderWrapper'
import { StyledCard } from '../../shared/styled/StyledCard'
import { StyledTitle } from '../../shared/styled/Typography'
import { LotRow } from './components/LotRow'

export const Lots = () => {
  const PAGE_TITLE = 'Лоты'
  const API = 'get-items-lot.php '

  const { get, response, error, loading } = useFetch(API)
  // const [cart, addToCart] = useLocalStorage('cart', [])

  useEffect(() => get(), [])

  // const onPriceSortChange = (sortPrice) => {
  //   const filtersWithPrice = { ...mergedFilters, sort_price: sortPrice }
  //   setMergedFilters(filtersWithPrice)
  //   getWithFilters(filtersWithPrice)
  // }

  // const addToShoppingCart = (notebook) => {
  //   if (cart.some(n => n.serial_num === notebook.serial_num)) {
  //     showError('Такой товар уже есть в корзине!')
  //     return
  //   }
  //
  //   addToCart([...cart, notebook])
  //   showSuccess('Товар был добавлен в корзину!')
  // }

  const lots = response?.data?.lots || []

  return (
    <PrivateLayout>
      <WrapPrivatePage>
        <InnerWrapPrivatePage>
          <BreadCrumbs currentPage={PAGE_TITLE} />

          <PageTitleSection
            title={PAGE_TITLE}
          />

          <ErrorLoaderWrapper isError={!!error} isLoading={loading} isEmpty={!lots.length}>
            {
              lots.map(lot =>
                <StyledCard key={lot.lot_name}>
                  <StyledTitle>
                    {lot.lot_name}
                  </StyledTitle>

                  {lot.items.map((lotItem, index) => <LotRow key={lotItem.item_name} countNum={index + 1} {...lotItem} />)}
                </StyledCard>
              )
            }
          </ErrorLoaderWrapper>

        </InnerWrapPrivatePage>
      </WrapPrivatePage>
    </PrivateLayout>
  )
}
