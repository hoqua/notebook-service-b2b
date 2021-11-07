import React, { useEffect, useState } from 'react'
import PrivateLayout from '../../shared/layouts/PrivateLayout/PrivateLayout'
import { InnerWrapPrivatePage, WrapPrivatePage } from '../../shared/styled/WrapPrivatePage'
import { BreadCrumbs } from '../../shared/BreadCrumbs/BreadCrumbs'
import { useFetch } from 'use-http'
import { useNotify } from '../../../hooks/useSnakbar'
import { NotebookRow } from './components/NotebookRow'
import { PageTitleSection } from '../../shared/styled/PageTitleSection'
import { Filters } from '../../shared/Filters/Filters'
import { SpacerH20 } from '../../shared/styled/Spacers'
import { useLocalStorage } from '../../../hooks/useLocalStorage'
import { ErrorLoaderWrapper } from '../../shared/errorComponents/ErrorLoaderWrapper/ErrorLoaderWrapper'
import { API_NOTEBOOKS, API_NOTEBOOKS_UNFINISHED, NOTEBOOKS_CART_KEY } from '../../../constants/constants'
import { StyledRowsGrid } from './components/styles'

export const Showcase = ({ isUnfinished = false }) => {
  const PAGE_TITLE = isUnfinished ? 'Не готовые ноутбуки' : 'Витрина'
  const API = isUnfinished ? API_NOTEBOOKS_UNFINISHED : API_NOTEBOOKS

  const { showError, showSuccess } = useNotify()
  const { get, data, error, loading } = useFetch(API)
  const [hideFilters, setHideFilters] = useState(false)
  const [mergedFilters, setMergedFilters] = useState({})
  const [notebookCart, addToCart] = useLocalStorage(NOTEBOOKS_CART_KEY, [])

  useEffect(() => get(), [])

  const getWithFilters = (latestFilters) => {
    setMergedFilters(latestFilters)
    const search = new URLSearchParams(latestFilters)
    get('?' + search.toString())
  }

  const onPriceSortChange = (sortPrice) => {
    const filtersWithPrice = { ...mergedFilters, sort_price: sortPrice }
    setMergedFilters(filtersWithPrice)
    getWithFilters(filtersWithPrice)
  }

  const addToShoppingCart = (notebook) => {
    if (notebookCart.some(n => n.serial_num === notebook.serial_num)) {
      showError('Такой товар уже есть в корзине!')
      return
    }

    addToCart([...notebookCart, notebook])
    showSuccess('Товар был добавлен в корзину!')
  }

  const notebooks = data?.items || []
  const isLoadingOrNotFetchedYet = !data || loading

  return (
    <PrivateLayout>
      <WrapPrivatePage>
        <InnerWrapPrivatePage>
          <BreadCrumbs currentPage={PAGE_TITLE} />

          <PageTitleSection
            title={PAGE_TITLE}
            onPriceSortChange={onPriceSortChange}
            onFilterClick={() => setHideFilters(!hideFilters)}
            actions
          />
          <Filters
            onFiltersSubmit={filters => getWithFilters({ ...mergedFilters, ...filters })} // override old filters with new selected
            loading={loading}
            hideFilters={hideFilters}
            isUnfinished={isUnfinished}
          />
          <SpacerH20 />

          <ErrorLoaderWrapper isLoading={isLoadingOrNotFetchedYet} isEmpty={!notebooks.length} isError={error}>
            <StyledRowsGrid>
              {notebooks.map(notebook =>
                <NotebookRow notebook={notebook} onClick={addToShoppingCart} key={notebook.serial_num} />
              )}
            </StyledRowsGrid>
          </ErrorLoaderWrapper>

        </InnerWrapPrivatePage>
      </WrapPrivatePage>
    </PrivateLayout>
  )
}
