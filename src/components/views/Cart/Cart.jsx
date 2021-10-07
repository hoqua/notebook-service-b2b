import React, { useEffect } from 'react'
import { InnerWrapPrivatePage, WrapPrivatePage } from '../../shared/styled/WrapPrivatePage'
import { BreadCrumbs } from '../../shared/BreadCrumbs'
import { ActionsWrapper, PageTitleSection } from '../../shared/styled/PageTitleSection'
import PrivateLayout from '../../shared/layouts/PrivateLayout/PrivateLayout'
import { StyledCard } from '../../shared/styled/StyledCard'
import { StyledText, StyledTitle } from '../../shared/styled/Typography'
import { useLocalStorage } from '../../../hooks/useLocalStorage'
import { ReactComponent as Trash } from '../../../assets/icons/trash.svg'
import { AppButton } from '../../shared/styled/NavigationButton'
import { SpacerH10, SpacerH20, SpacerH30 } from '../../shared/styled/Spacers'
import { IconButton } from '../../shared/styled/IconButton'
import { getDiscountPrice, getDiscountPriceStyled } from '../../../utils/substractPercent'
import { useSession } from '../../../service/SessonDataService'
import { NotebookImage } from '../../shared/NotebookRow/NotebookImage/NotebookImage'
import { useFetch } from 'use-http'
import { useNotify } from '../../../hooks/useSnakbar'
import { ActionWrapper, CartRow, CartWrapper, PriceText, PriceWrapper } from './styles'
import { EmptyCartPlaceholder } from './EmptyCartPlaceholder'

const getNotebookPriceSum = (notebooks) => notebooks.reduce((acc, notebook) => acc + notebook.item_price, 0)
const getNotebooksIds = (notebooks) => notebooks.map(notebook => notebook.serial_num)
const PAGE_TITLE = 'Корзина'

export const Cart = () => {
  const { user } = useSession()
  const { showError, showSuccess } = useNotify()
  const [storageCart, setStorageCart] = useLocalStorage('cart', [])
  const { get: getNotebooksById, data, loading } = useFetch('get-items-by-serial.php')
  const { post: postOrder, loading: loadingOrder } = useFetch('do-order-by-serial.php')

  const removeFromCart = (notebookToRemove) => {
    const index = storageCart.findIndex(notebook => notebook.serial_num === notebookToRemove.serial_num)
    if (index === -1) return

    storageCart.splice(index, 1)
    setStorageCart(storageCart)
  }
  const getNotebooks = () => {
    if (!storageCart.length) return
    const addedToCardIds = getNotebooksIds(storageCart)

    return getNotebooksById('?' + new URLSearchParams({ serial_num: addedToCardIds }))
  }
  const placeOrder = async () => {
    try {
      const response = await getNotebooks()
      if (!response?.items.length) return

      const notebooks = response.items
      if (storageCart.length < notebooks.length) {
        setStorageCart(notebooks)
        return
      }
      if (sum !== getNotebookPriceSum(notebooks)) return

      await postOrder('?' + new URLSearchParams({ serial_num: getNotebooksIds(notebooks) }))
      setStorageCart([])
      showSuccess('Заказ отправлен менеджеру. Спасибо!')
    } catch (e) {
      showError('Возникла ошибка заказа. Попробуйте позже!')
    }
  }

  const sum = getNotebookPriceSum(storageCart)
  const discountTotal = getDiscountPrice(user, sum)
  const sumDiff = sum - discountTotal

  useEffect(() => getNotebooks(), [])

  useEffect(() => {
    const notebooks = data?.items
    if (!notebooks) return
    if (sum !== getNotebookPriceSum(notebooks)) showError('Цена товаров была изменена.')
    if (storageCart.length > notebooks.length) showError('Некоторые ноутбуки больше не доступны и были удалены из корзины.')

    setStorageCart(data.items)
  }, [data])

  return (
    <PrivateLayout>
      <WrapPrivatePage>
        <InnerWrapPrivatePage>
          <BreadCrumbs currentPage={PAGE_TITLE} />

          <PageTitleSection title={PAGE_TITLE} />

          {!storageCart.length && <EmptyCartPlaceholder />}

          {!!storageCart.length &&
            <CartWrapper>
              <StyledCard>
                <StyledTitle>Выбранные товары <SpacerH10 /></StyledTitle>

                {storageCart.map(notebook =>
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
                  <AppButton onClick={placeOrder} disabled={loading || loadingOrder}>Оформить заказ</AppButton>
                </ActionWrapper>
              </StyledCard>
            </CartWrapper>}

        </InnerWrapPrivatePage>
      </WrapPrivatePage>
    </PrivateLayout>
  )
}
