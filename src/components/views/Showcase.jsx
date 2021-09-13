import React, { useEffect } from 'react'
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

  useEffect(() => {
    if (error) showError('Ошибка загрузки каталога')
  }, [error])

  useEffect(() => {
    get('?discrete_video=0')
  }, [])

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
            onPriceSortChange={val => console.log(val)}
            onFilterClick={() => console.log('click filter')}
          />
          <Filters />
          <SpacerH20 />

          {loading && <Loading />}
          {!loading && notebooks.length &&
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
