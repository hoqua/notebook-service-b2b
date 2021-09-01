import React, { useEffect } from 'react'
import PrivateLayout from '../shared/layouts/PrivateLayout/PrivateLayout'
import { InnerWrapPrivatePage, WrapPrivatePage } from '../shared/styled/WrapPrivatePage'
import { BreadCrumbs } from '../shared/BreadCrumbs'
import { useFetch } from 'use-http'
import { StyledCard } from '../shared/styled/StyledCard'
import styled, { useTheme } from 'styled-components'
import { useNotify } from '../../hooks/useSnakbar'
import { ReactComponent as ShoppingCart } from '../../assets/icons/shoping-cart.svg'
import { StyledTopNavLink } from '../shared/styled/StyledNavLink'
import { StyledText } from '../shared/styled/Typography'
import notebookPlaceholder from '../../assets/img/notebook-placeholder.png'

export const Showcase = () => {
  const { showError } = useNotify()
  const theme = useTheme()
  const { get, response, error } = useFetch('get-items-main.php')

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
          <div style={{ display: 'grid', gap: '10px' }}>
            {notebooks.map(notebook => (
              <NotebookRow key={notebook.item_id}>
                <StyledTopNavLink to='#' color={theme.brand.dark} onClick={() => addToShoppingCart(notebook.item_id)}>
                  <ShoppingCart />
                </StyledTopNavLink>

                <NotebookRowItem>
                  <StyledText>{notebook.mark_name}</StyledText>
                  <p>{notebook.item_name}</p>
                  <StyledText>{notebook.item_id}</StyledText>
                </NotebookRowItem>

                <img src={notebookPlaceholder} alt='notebook placeholder' />

                <NotebookRowItem>
                  <StyledText>Вн. вид</StyledText>
                  <StyledText>{notebook.lookuot}</StyledText>
                </NotebookRowItem>

                <NotebookRowItem>
                  <StyledText>Экран</StyledText>
                  <p>{notebook.display}</p>
                </NotebookRowItem>

                <NotebookRowItem>
                  <StyledText>Процессор</StyledText>
                  <p>{notebook.proc}</p>
                </NotebookRowItem>

                <NotebookRowItem>
                  <StyledText>Видеокарта</StyledText>
                  <p>{notebook.video || notebook.integ_video}</p>
                </NotebookRowItem>

                <NotebookRowItem>
                  <StyledText>Ram</StyledText>
                  <p>{notebook.ram}</p>
                </NotebookRowItem>

                <NotebookRowItem>
                  <StyledText>Накопитель</StyledText>
                  <p>{notebook.hdd}</p>
                </NotebookRowItem>

                <NotebookRowItem>
                  <StyledText>Цена (опт.)</StyledText>
                  <p>{notebook.item_price}</p>
                </NotebookRowItem>
              </NotebookRow>
            ))}
          </div>

        </InnerWrapPrivatePage>
      </WrapPrivatePage>
    </PrivateLayout>
  )
}

const NotebookRow = styled(StyledCard)`
  background-color: #fff;
  display: grid;
  grid-template-columns: 40px repeat(9, 1fr);
  align-items: center;
`

const NotebookRowItem = styled.div`
  height: 100%;
`
