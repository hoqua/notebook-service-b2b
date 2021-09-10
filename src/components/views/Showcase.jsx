import React, { useEffect } from 'react'
import PrivateLayout from '../shared/layouts/PrivateLayout/PrivateLayout'
import { InnerWrapPrivatePage, WrapPrivatePage } from '../shared/styled/WrapPrivatePage'
import { BreadCrumbs } from '../shared/BreadCrumbs'
import { useFetch } from 'use-http'
import { useNotify } from '../../hooks/useSnakbar'
import { NotebookRow } from '../shared/NotebookRow/NotebookRow'
import { Loading } from '../shared/Loading/Loading'

export const Showcase = () => {
  const { showError } = useNotify()
  const {
    get,
    response,
    error,
    loading
  } = useFetch('get-items-main.php')

  useEffect(() => {
    if (error) showError('Ошибка загрузки каталога')
  }, [error])

  useEffect(() => {
    get()
  }, [])

  const addToShoppingCart = (id) => {
    console.log(id)
  }

  const notebooks = response?.data?.items || []

  return (
    <PrivateLayout>
      <WrapPrivatePage>
        <InnerWrapPrivatePage>
          <BreadCrumbs currentPage='Витрина' />

          {loading && <Loading />}
          {!loading &&
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
