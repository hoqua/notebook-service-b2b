import React, { useEffect } from 'react'
import { NotebooksCart } from './NotebooksCart'
import {
  getItemsPriceSum,
  getLotsQuery,
  getQuery,
  getRemainingLots,
  getRemainingNotebooks,
  getSumCounts
} from '../service'
import { SpacerH10, SpacerH20, SpacerH30 } from '../../../shared/styled/Spacers'
import { LotsCart } from './LotsCart'
import { StyledCard } from '../../../shared/styled/StyledCard'
import { StyledTitle } from '../../../shared/styled/Typography'
import { ActionWrapper, CartWrapper, PriceText, PriceWrapper } from '../styles'
import { AppButton } from '../../../shared/styled/NavigationButton'
import { useSession } from '../../../../service/SessonDataService'
import { useNotify } from '../../../../hooks/useSnakbar'
import { useLocalStorage } from '../../../../hooks/useLocalStorage'
import {
  API_DO_ORDER, API_DO_ORDER_LOTS,
  API_LOTS,
  API_NOTEBOOKS_BY_SERIAL,
  LOTS_CART_KEY,
  NOTEBOOKS_CART_KEY, ORDERS_ROUTE
} from '../../../../constants/constants'
import { useFetch } from 'use-http'
import { Redirect } from 'react-router-dom'

export const MainCart = () => {
  const { user } = useSession()
  const { showError, showSuccess } = useNotify()
  const [notebookCart, setNotebookCart] = useLocalStorage(NOTEBOOKS_CART_KEY, [])
  const [lotsCart, setLotsCart] = useLocalStorage(LOTS_CART_KEY, [])
  const { get: getNotebooksById, data: notebooksData, loading } = useFetch(API_NOTEBOOKS_BY_SERIAL)
  const { get: getLotsByName, data: lotsData, loading: loadingLots } = useFetch(API_LOTS)
  const { post: postOrder, loading: loadingOrder } = useFetch(API_DO_ORDER)
  const { post: postLotOrder, loading: loadingLotOrder } = useFetch(API_DO_ORDER_LOTS)
  const fetchedNotebooks = notebooksData?.items || []
  const fetchedLots = lotsData?.lots || []
  const { currentSum, discountTotal, sumDiff } = getSumCounts(notebookCart, lotsCart, user)
  const isLotsCartEmpty = !lotsCart?.length
  const isNotebooksCartEmpty = !notebookCart?.length
  const isSomethingLoading = loading || loadingOrder || loadingLotOrder || loadingLots

  useEffect(() => getNotebooks(), [])
  useEffect(() => getLots(), [])

  useEffect(() => {
    const isWaitingForLots = fetchedNotebooks || lotsCart?.length > 0
    const isWaitingForNotebooks = fetchedLots || notebookCart?.length > 0
    if (isWaitingForLots || isWaitingForNotebooks) return

    const isNotebooksAmountChanged = notebookCart?.length > fetchedNotebooks?.length
    const isLotsAmountChanged = lotsCart?.length > fetchedLots?.length
    if (isLotsAmountChanged || isNotebooksAmountChanged) {
      showError('Некоторые ноутбуки больше не доступны и были удалены из корзины.')
    } else if (currentSum !== getItemsPriceSum(fetchedNotebooks, fetchedLots)) {
      showError('Цена товаров была изменена.')
    }

    setNotebookCart(fetchedNotebooks)
    setLotsCart(fetchedLots)
  }, [fetchedNotebooks, fetchedLots])

  const getNotebooks = async () => {
    if (isNotebooksCartEmpty) return null
    return getNotebooksById(getQuery(notebookCart))
  }
  const getLots = async () => {
    if (isLotsCartEmpty) return null
    return getLotsByName(getLotsQuery(lotsCart))
  }
  const placeOrder = async () => {
    try {
      const { items: notebooks = [] } = await getNotebooks() || {}
      const { lots = [] } = await getLots() || {}

      if (!isLotsCartEmpty && (lotsCart.length > lots.length)) {
        setLotsCart(lots)
        showError('Выбранные лоты были изменены. Проверьте их содержимое и нажмите заказать еще раз!')
        return
      }

      if (!isNotebooksCartEmpty && (notebookCart.length > notebooks.length)) {
        setNotebookCart(notebooks)
        showError('Выбранные ноутбуки были изменены. Проверьте их и нажмите заказат еще раз!')
        return
      }

      if (currentSum !== getItemsPriceSum(notebooks, lots)) {
        setLotsCart(lots)
        setNotebookCart(notebooks)
        showError('Сумма заказа была изменена. Проверьте ее и нажмите заказать еще раз!')
        return
      }

      if (!isNotebooksCartEmpty) {
        await postOrder(getQuery(notebooks))
      }

      if (!isLotsCartEmpty) {
        await postLotOrder(getLotsQuery(lots))
      }

      setNotebookCart([])
      setLotsCart([])
      showSuccess('Заказ отправлен менеджеру. Спасибо!')
      return <Redirect to={ORDERS_ROUTE} />
    } catch (e) {
      showError('Возникла ошибка заказа. Попробуйте позже!')
    }
  }
  return (
    <CartWrapper>
      <div>
        {!isNotebooksCartEmpty && (
          <>
            <NotebooksCart
              notebookCart={notebookCart}
              fetchedNotebooks={fetchedNotebooks}
              updateNotebooksCart={() => setNotebookCart(fetchedNotebooks)}
              removeNotebook={notebookToRemove => setNotebookCart(getRemainingNotebooks(notebookCart, notebookToRemove))}
            />
            <SpacerH10 />
          </>
        )}

        {!isLotsCartEmpty && (
          <>
            <LotsCart
              lotsCart={lotsCart}
              fetchedLots={fetchedLots}
              removeLot={lotToRemove => setLotsCart(getRemainingLots(lotsCart, lotToRemove))}
            />
          </>
        )}
      </div>

      <StyledCard>
        <StyledTitle>Итого</StyledTitle>
        <SpacerH20 />

        <PriceText>Товаров - {notebookCart.length}, на сумму: <PriceWrapper>{currentSum}</PriceWrapper></PriceText>
        <SpacerH10 />

        <PriceText>Скидка: <PriceWrapper>{sumDiff} ({user.ppg_perc}%)</PriceWrapper></PriceText>
        <SpacerH10 />

        <PriceText>Итог: <PriceWrapper>{discountTotal}</PriceWrapper></PriceText>
        <SpacerH30 />
        <ActionWrapper>
          <AppButton onClick={placeOrder} disabled={isSomethingLoading}>Оформить заказ</AppButton>
        </ActionWrapper>
      </StyledCard>

    </CartWrapper>
  )
}
