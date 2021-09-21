import React, { useEffect, useState } from 'react'
import PrivateLayout from '../shared/layouts/PrivateLayout/PrivateLayout'
import { InnerWrapPrivatePage, WrapPrivatePage } from '../shared/styled/WrapPrivatePage'
import { BreadCrumbs } from '../shared/BreadCrumbs'
import { useFetch } from 'use-http'
import { useNotify } from '../../hooks/useSnakbar'
import { NotebookRow } from '../shared/NotebookRow/NotebookRow'
import { Loading } from '../shared/Loading/Loading'
import { PageTitleSection } from '../shared/styled/PageTitleSection'
import { Filters } from '../shared/Filters/Filters'
import { SpacerH20 } from '../shared/styled/Spacers'

const PAGE_TITLE = 'Витрина'

export const Showcase = () => {
  const { showError } = useNotify()
  const { get, response, error, loading } = useFetch('get-items-main.php')
  const [showFilters, setShowFilters] = useState(false)
  const [mergedFilters, setMergedFilters] = useState({})

  useEffect(() => {
    if (error) showError('Ошибка загрузки каталога')
  }, [error])

  useEffect(() => get(), [])

  const getWithFilters = (providedFilters) => {
    const search = new URLSearchParams(providedFilters || mergedFilters)
    const query = '?' + search.toString()
    get(query)
  }
  const onPriceSortChange = (sortPrice) => {
    const filtersWithPrice = { ...mergedFilters, sort_price: sortPrice }
    setMergedFilters(filtersWithPrice)
    getWithFilters(filtersWithPrice)
  }
  const addToShoppingCart = (id) => {
    console.log(id)
  }

  const notebooks = response?.data?.items || []

  return (
    <PrivateLayout>
      <WrapPrivatePage>
        <InnerWrapPrivatePage>
          <BreadCrumbs currentPage={PAGE_TITLE} />

          <PageTitleSection
            title={PAGE_TITLE}
            onPriceSortChange={onPriceSortChange}
            onFilterClick={() => setShowFilters(!showFilters)}
          />

          {showFilters &&
            <Filters
              onFiltersSubmit={() => getWithFilters()}
              onFilterChange={filters => setMergedFilters({ ...mergedFilters, ...filters })}
              loading={loading}
            />}
          <SpacerH20 />

          {loading && <Loading />}

          {!loading && !notebooks.length && <p>No results found</p>}

          {!loading && !!notebooks.length &&
            <div style={{
              display: 'grid',
              gap: '10px'
            }}
            >
              {notebooks.map((notebook, index) => (
              // TODO fix index hack
                <NotebookRow notebook={notebook} onClick={addToShoppingCart} key={notebook.item_id + '' + index} />
              ))}
            </div>}

        </InnerWrapPrivatePage>
      </WrapPrivatePage>
    </PrivateLayout>
  )
}
