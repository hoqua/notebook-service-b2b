import React, { useEffect } from 'react'
import { NotebooksCart } from './NotebooksCart'
import {
  getLotsPriceSum,
  getLotsQuery,
  getNotebooksPriceSum,
  getQuery,
  getRemainingLots,
  getRemainingNotebooks,
  getSumCounts,
  useApi
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
  LOTS_CART_KEY,
  NOTEBOOKS_CART_KEY,
  ORDERS_ROUTE
} from '../../../../constants/constants'
import { useNavigate } from 'react-router-dom'

export const MainCart = () => {
  const { user, exchangeRate } = useSession()
  const navigate = useNavigate()
  const { showError, showSuccess } = useNotify()
  const {
    getNotebooksById,
    fetchedNotebooks,
    getLotsByName,
    fetchedLots,
    postLotOrder,
    postOrder,
    isSomethingLoading
  } = useApi()
  const [notebookCart, setNotebookCart] = useLocalStorage(
    NOTEBOOKS_CART_KEY,
    []
  )
  const [lotsCart, setLotsCart] = useLocalStorage(LOTS_CART_KEY, [])
  const { currentSum, discountTotal, sumDiff } = getSumCounts(
    notebookCart,
    lotsCart,
    user
  )
  const currentSumInUAH = Math.floor(currentSum * exchangeRate.rate)
  const sumDiffInUAH = Math.floor(sumDiff * exchangeRate.rate)
  const isLotsCartEmpty = !lotsCart?.length
  const isNotebooksCartEmpty = !notebookCart?.length

  useEffect(() => getNotebooks(), [])
  useEffect(() => getLots(), [])

  useEffect(() => {
    const isWaitingForLots = fetchedNotebooks || lotsCart?.length > 0
    const isWaitingForNotebooks = fetchedLots || notebookCart?.length > 0
    if (isWaitingForLots || isWaitingForNotebooks) return

    const isNotebooksAmountChanged =
      notebookCart?.length > fetchedNotebooks?.length
    const isLotsAmountChanged = lotsCart?.length > fetchedLots?.length
    if (isLotsAmountChanged || isNotebooksAmountChanged) {
      showError(
        'Некоторые ноутбуки больше не доступны и были удалены из корзины.'
      )
    } else if (
      currentSum !==
      getLotsPriceSum(fetchedLots) + getNotebooksPriceSum(fetchedNotebooks)
    ) {
      showError('Цена товаров была изменена.')
    }

    setNotebookCart(fetchedNotebooks)
    setLotsCart(fetchedLots)
  }, [fetchedNotebooks, fetchedLots])

  const getNotebooks = async () =>
    isNotebooksCartEmpty ? null : getNotebooksById(getQuery(notebookCart))
  const getLots = async () =>
    isLotsCartEmpty ? null : getLotsByName(getLotsQuery(lotsCart))
  const placeOrder = async () => {
    try {
      const { items: notebooks = [] } = (await getNotebooks()) || {}
      const { lots = [] } = (await getLots()) || {}

      if (!isLotsCartEmpty && lotsCart.length > lots.length) {
        setLotsCart(lots)
        showError(
          'Выбранные лоты были изменены. Проверьте их содержимое и нажмите заказать еще раз!'
        )
        return
      }

      if (!isNotebooksCartEmpty && notebookCart.length > notebooks.length) {
        setNotebookCart(notebooks)
        showError(
          'Выбранные ноутбуки были изменены. Проверьте их и нажмите заказат еще раз!'
        )
        return
      }

      const fetchedSum = getNotebooksPriceSum(notebooks) + getLotsPriceSum(lots)
      if (currentSum !== fetchedSum) {
        setLotsCart(lots)
        setNotebookCart(notebooks)
        showError(
          'Сумма заказа была изменена. Проверьте ее и нажмите заказать еще раз!'
        )
        return
      }

      if (!isNotebooksCartEmpty) await postOrder(getQuery(notebooks))
      if (!isLotsCartEmpty) await postLotOrder(getLotsQuery(lots))

      setNotebookCart([])
      setLotsCart([])
      showSuccess('Заказ отправлен менеджеру. Спасибо!')
      navigate(ORDERS_ROUTE)
      return null
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
              removeNotebook={(notebookToRemove) =>
                setNotebookCart(
                  getRemainingNotebooks(notebookCart, notebookToRemove)
                )
              }
            />
            <SpacerH10 />
          </>
        )}

        {!isLotsCartEmpty && (
          <>
            <LotsCart
              lotsCart={lotsCart}
              fetchedLots={fetchedLots}
              removeLot={(lotToRemove) =>
                setLotsCart(getRemainingLots(lotsCart, lotToRemove))
              }
            />
          </>
        )}
      </div>

      <StyledCard>
        <StyledTitle>Итого</StyledTitle>
        <SpacerH20 />

        <PriceText>
          Товаров - {notebookCart?.length || 0 + lotsCart?.length || 0}, на
          сумму:{' '}
          <PriceWrapper>
            {currentSum} ({currentSumInUAH} UAH)
          </PriceWrapper>
        </PriceText>
        <SpacerH10 />

        {discountTotal > 0 ? (
          <PriceText>
            Скидка:{' '}
            <PriceWrapper>
              {discountTotal} ({user.ppg_perc}%)
            </PriceWrapper>
          </PriceText>
        ) : null}
        <SpacerH10 />

        <PriceText>
          Итог:{' '}
          <PriceWrapper>
            {sumDiff} ({sumDiffInUAH} UAH)
          </PriceWrapper>
        </PriceText>
        <SpacerH30 />
        <ActionWrapper>
          <AppButton onClick={placeOrder} disabled={isSomethingLoading}>
            Оформить заказ
          </AppButton>
        </ActionWrapper>
      </StyledCard>
    </CartWrapper>
  )
}
