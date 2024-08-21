import React, { useEffect, useState } from 'react'
import PrivateLayout from '../../shared/layouts/PrivateLayout/PrivateLayout'
import {
  InnerWrapPrivatePage,
  WrapPrivatePage
} from '../../shared/styled/WrapPrivatePage'
import { BreadCrumbs } from '../../shared/BreadCrumbs/BreadCrumbs'
import { useFetch } from 'use-http'
import { useNotify } from '../../../hooks/useSnakbar'
import { NotebookRow } from './components/NotebookRow'
import { PageTitleSection } from '../../shared/styled/PageTitleSection'
import { Filters } from '../../shared/Filters/Filters'
import { SpacerH20 } from '../../shared/styled/Spacers'
import { useLocalStorage } from '../../../hooks/useLocalStorage'
import { ErrorLoaderWrapper } from '../../shared/errorComponents/ErrorLoaderWrapper/ErrorLoaderWrapper'
import {
  API_NOTEBOOKS,
  API_NOTEBOOKS_UNFINISHED,
  NOTEBOOKS_CART_KEY
} from '../../../constants/constants'
import { StyledRowsGrid } from './components/styles'

export const Showcase = ({ isUnfinished = false }) => {
  const PAGE_TITLE = isUnfinished ? 'Не готовые ноутбуки' : 'Готовые'
  const PAGE_SUBTITLE = isUnfinished
    ? 'Гарантия на "Не готовые" ноутбуки не предоставляется.'
    : 'Гарантия на все ноутбуки с Витрины - 1 месяц.'
  const API = isUnfinished ? API_NOTEBOOKS_UNFINISHED : API_NOTEBOOKS
  const { showError, showSuccess } = useNotify()
  const { get, data, error, loading } = useFetch(API)
  const [hideFilters, setHideFilters] = useState(false)
  const [mergedFilters, setMergedFilters] = useState({})
  const [serialNum, setSerialNum] = useState('')
  const [notebookCart, addToCart] = useLocalStorage(NOTEBOOKS_CART_KEY, [])

  useEffect(() => {
    const fetchNotebooks = async () => {
      try {
        await get()
      } catch (error) {
        console.log('Error fetching notebooks', error)
      }
    }

    fetchNotebooks()
  }, [])

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
    if (notebookCart.some((n) => n.serial_num === notebook.serial_num)) {
      showError('Такой товар уже есть в корзине!')
      return
    }

    addToCart([...notebookCart, notebook])
    showSuccess('Товар был добавлен в корзину!')
  }

  const notebooks = data?.items || []
  const filteredNotebooks = notebooks.filter((notebook) =>
    notebook.serial_num.toLowerCase().includes(serialNum.toLowerCase())
  )
  const isLoadingOrNotFetchedYet = !data || loading

  return (
    <PrivateLayout>
      <WrapPrivatePage>
        <InnerWrapPrivatePage>
          <BreadCrumbs currentPage={PAGE_TITLE} />

          <PageTitleSection
            title={PAGE_TITLE}
            subtitle={PAGE_SUBTITLE}
            onPriceSortChange={onPriceSortChange}
            onFilterClick={() => setHideFilters(!hideFilters)}
            serialNum={serialNum}
            setSerialNum={setSerialNum}
            actions
          />
          <Filters
            onFiltersSubmit={(filters) =>
              getWithFilters({ ...mergedFilters, ...filters })
            } // override old filters with new selected
            loading={loading}
            hideFilters={hideFilters}
            isUnfinished={isUnfinished}
          />
          <SpacerH20 />

          <ErrorLoaderWrapper
            isLoading={isLoadingOrNotFetchedYet}
            isEmpty={!notebooks.length}
            isError={error}
          >
            <StyledRowsGrid>
              {filteredNotebooks.map((notebook) => (
                <NotebookRow
                  notebook={notebook}
                  onClick={addToShoppingCart}
                  key={notebook.serial_num}
                />
              ))}
            </StyledRowsGrid>
          </ErrorLoaderWrapper>
        </InnerWrapPrivatePage>
      </WrapPrivatePage>
    </PrivateLayout>
  )
}
