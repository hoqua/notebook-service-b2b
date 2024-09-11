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
import { useLocalStorage } from '../../../../hooks/useLocalStorage'
import {
  LOTS_CART_KEY,
  NOTEBOOKS_CART_KEY,
  ORDERS_ROUTE
} from '../../../../constants/constants'
import { useNavigate } from 'react-router-dom'
import { toast } from '../../../shared/Toaster/use-toast'
import * as Sentry from '@sentry/react'
export const MainCart = () => {
  const { user, exchangeRate } = useSession()
  const navigate = useNavigate()
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

  useEffect(() => {
    const fetchNotebooks = async () => {
      if (!isNotebooksCartEmpty) {
        await getNotebooksById(getQuery(notebookCart))
      }
    }
    fetchNotebooks()
  }, [notebookCart])

  useEffect(() => {
    const fetchLots = async () => {
      if (!isLotsCartEmpty) {
        await getLotsByName(getLotsQuery(lotsCart))
      }
    }
    fetchLots()
  }, [lotsCart])

  useEffect(() => {
    const updateCart = () => {
      const isWaitingForLots = fetchedNotebooks || lotsCart?.length > 0
      const isWaitingForNotebooks = fetchedLots || notebookCart?.length > 0
      if (isWaitingForLots || isWaitingForNotebooks) return

      const isNotebooksAmountChanged =
        notebookCart?.length > fetchedNotebooks?.length
      const isLotsAmountChanged = lotsCart?.length > fetchedLots?.length
      if (isLotsAmountChanged || isNotebooksAmountChanged) {
        toast({
          title:
            'Некоторые ноутбуки больше не доступны и были удалены из корзины.',
          variant: 'destructive'
        })
      } else if (
        currentSum !==
        getLotsPriceSum(fetchedLots) + getNotebooksPriceSum(fetchedNotebooks)
      ) {
        toast({
          title: 'Цена товаров была изменена.',
          variant: 'destructive'
        })
      }

      setNotebookCart(fetchedNotebooks)
      setLotsCart(fetchedLots)
    }
    updateCart()
  }, [fetchedNotebooks, fetchedLots])

  const placeOrder = async () => {
    try {
      const { items: notebooks = [] } = isNotebooksCartEmpty
        ? null
        : (await getNotebooksById(getQuery(notebookCart))) || {}
      const { lots = [] } =
        (isLotsCartEmpty
          ? null
          : await getLotsByName(getLotsByName(lotsCart))) || {}

      if (!isLotsCartEmpty && lotsCart.length > lots.length) {
        setLotsCart(lots)
        toast({
          title:
            'Выбранные лоты были изменены. Проверьте их содержимое и нажмите заказать еще раз!',
          variant: 'destructive'
        })
        return
      }

      if (!isNotebooksCartEmpty && notebookCart.length > notebooks.length) {
        setNotebookCart(notebooks)
        toast({
          title:
            'Выбранные ноутбуки были изменены. Проверьте их и нажмите заказат еще раз!',
          variant: 'destructive'
        })
        return
      }

      const fetchedSum = getNotebooksPriceSum(notebooks) + getLotsPriceSum(lots)
      if (currentSum !== fetchedSum) {
        setLotsCart(lots)
        setNotebookCart(notebooks)
        toast({
          title:
            'Сумма заказа была изменена. Проверьте ее и нажмите заказать еще раз!',
          variant: 'destructive'
        })
        return
      }

      if (!isNotebooksCartEmpty) await postOrder(getQuery(notebooks))
      if (!isLotsCartEmpty) await postLotOrder(getLotsQuery(lots))

      setNotebookCart([])
      setLotsCart([])
      toast({
        title: 'Заказ отправлен менеджеру. Спасибо!',
        style: {
          color: 'green'
        }
      })
      navigate(ORDERS_ROUTE)
      return null
    } catch (e) {
      toast({
        title: 'Возникла ошибка заказа. Попробуйте позже!',
        variant: 'destructive'
      })
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
