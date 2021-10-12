import React, { useEffect } from 'react'
import { InnerWrapPrivatePage, WrapPrivatePage } from '../../shared/styled/WrapPrivatePage'
import { BreadCrumbs } from '../../shared/BreadCrumbs/BreadCrumbs'
import { ActionsWrapper, PageTitleSection } from '../../shared/styled/PageTitleSection'
import PrivateLayout from '../../shared/layouts/PrivateLayout/PrivateLayout'
import { StyledCard } from '../../shared/styled/StyledCard'
import { StyledText, StyledTitle } from '../../shared/styled/Typography'
import { useLocalStorage } from '../../../hooks/useLocalStorage'
import { ReactComponent as Trash } from '../../../assets/icons/trash.svg'
import { AppButton } from '../../shared/styled/NavigationButton'
import { SpacerH10, SpacerH20, SpacerH30 } from '../../shared/styled/Spacers'
import { IconButton } from '../../shared/styled/IconButton'
import { getDiscountPriceStyled } from '../../../utils/substractPercent'
import { useSession } from '../../../service/SessonDataService'
import { NotebookImage } from '../../shared/NotebookRow/NotebookImage/NotebookImage'
import { useFetch } from 'use-http'
import { useNotify } from '../../../hooks/useSnakbar'
import { ActionWrapper, CartRow, CartWrapper, PriceText, PriceWrapper } from './styles'
import { EmptyCartPlaceholder } from './components/EmptyCartPlaceholder'
import { getNotebookPriceSum, getQuery, getRemainingNotebooks, getSumCounts } from './service'

const PAGE_TITLE = 'Корзина'

export const Cart = () => {
  const { user } = useSession()
  const { showError, showSuccess } = useNotify()
  const [storageCart, setStorageCart] = useLocalStorage('cart', [])
  const { get: getNotebooksById, data, loading } = useFetch('get-items-by-serial.php')
  const { post: postOrder, loading: loadingOrder } = useFetch('do-order-by-serial.php')

  const removeFromCart = (notebookToRemove) => setStorageCart(getRemainingNotebooks(storageCart, notebookToRemove))

  const getNotebooks = async () => {
    if (!storageCart.length) return null
    return getNotebooksById(getQuery(storageCart))
  }

  const placeOrder = async () => {
    try {
      const { items: notebooks } = await getNotebooks() || {}
      if (!notebooks?.length) return
      if (storageCart.length < notebooks.length || currentSum !== getNotebookPriceSum(notebooks)) { // if price or number of items changed => update && notify
        setStorageCart(notebooks)
        return
      }

      await postOrder(getQuery(notebooks))
      setStorageCart([])
      showSuccess('Заказ отправлен менеджеру. Спасибо!')
    } catch (e) {
      showError('Возникла ошибка заказа. Попробуйте позже!')
    }
  }
  const { currentSum, discountTotal, sumDiff } = getSumCounts(storageCart, user)

  useEffect(() => getNotebooks(), [])
  useEffect(() => {
    const notebooks = data?.items
    if (!notebooks) return
    if (currentSum !== getNotebookPriceSum(notebooks)) showError('Цена товаров была изменена.')
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
                <StyledTitle>Выбранные товары </StyledTitle>
                <SpacerH10 />

                <div>
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
                    </CartRow>)}
                </div>
              </StyledCard>

              <StyledCard>
                <StyledTitle>Итого</StyledTitle>
                <SpacerH20 />

                <PriceText>Товаров - {storageCart.length}, на сумму: <PriceWrapper>{currentSum}</PriceWrapper></PriceText>
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
