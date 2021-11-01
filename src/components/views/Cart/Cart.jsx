import React, { useEffect } from 'react'
import { InnerWrapPrivatePage, WrapPrivatePage } from '../../shared/styled/WrapPrivatePage'
import { BreadCrumbs } from '../../shared/BreadCrumbs/BreadCrumbs'
import { PageTitleSection } from '../../shared/styled/PageTitleSection'
import PrivateLayout from '../../shared/layouts/PrivateLayout/PrivateLayout'
import { useLocalStorage } from '../../../hooks/useLocalStorage'
import { EmptyCartPlaceholder } from './components/EmptyCartPlaceholder'
import { NotebooksCart } from './components/NotebooksCart'
import { StyledCard } from '../../shared/styled/StyledCard'
import { StyledTitle } from '../../shared/styled/Typography'
import { SpacerH10, SpacerH20, SpacerH30 } from '../../shared/styled/Spacers'
import { ActionWrapper, CartWrapper, PriceText, PriceWrapper } from './styles'
import { AppButton } from '../../shared/styled/NavigationButton'
import { useFetch } from 'use-http'
import { getLotsQuery, getNotebookPriceSum, getQuery, getRemainingNotebooks, getSumCounts } from './service'
import { useSession } from '../../../service/SessonDataService'
import { useNotify } from '../../../hooks/useSnakbar'
import { LotsCart } from './components/LotsCart'

const PAGE_TITLE = 'Корзина'

export const Cart = () => {
  const { user } = useSession()
  const [lotsCart] = useLocalStorage('lotsCart', [])
  const { showError, showSuccess } = useNotify()
  const [notebookCart, setNotebookCart] = useLocalStorage('notebookCart', [])
  const { get: getNotebooksById, data: notebooksData, loading } = useFetch('get-items-by-serial.php')
  const { get: getLotsByName, data: lotsData } = useFetch('get-items-lot.php')
  const { post: postOrder, loading: loadingOrder } = useFetch('do-order-by-serial.php')

  useEffect(() => getNotebooks(), [])
  useEffect(() => getLots(), [])

  const getNotebooks = async () => {
    if (!notebookCart.length) return null
    return getNotebooksById(getQuery(notebookCart))
  }
  const getLots = async () => {
    if (!lotsCart.length) return null
    return getLotsByName(getLotsQuery(lotsCart))
  }
  const placeOrder = async () => {
    try {
      const { items: notebooks } = await getNotebooks() || {}
      if (!notebooks?.length) return
      if (notebookCart.length < notebooks.length || currentSum !== getNotebookPriceSum(notebooks)) { // if price or number of items changed => update && notify
        setNotebookCart(notebooks)
        return
      }

      await postOrder(getQuery(notebooks))
      setNotebookCart([])
      showSuccess('Заказ отправлен менеджеру. Спасибо!')
    } catch (e) {
      showError('Возникла ошибка заказа. Попробуйте позже!')
    }
  }

  const { currentSum, discountTotal, sumDiff } = getSumCounts(notebookCart, user)
  const areCartsEmpty = !notebookCart.length && !lotsCart.length
  const fetchedNotebooks = notebooksData?.items
  const fetchedLots = lotsData?.lots

  return (
    <PrivateLayout>
      <WrapPrivatePage>
        <InnerWrapPrivatePage>
          <BreadCrumbs currentPage={PAGE_TITLE} />

          <PageTitleSection title='Корзина' />

          {areCartsEmpty
            ? <EmptyCartPlaceholder />
            : (
              <CartWrapper>
                <div>
                  <NotebooksCart
                    notebookCart={notebookCart}
                    fetchedNotebooks={fetchedNotebooks}
                    updateNotebooksCart={() => setNotebookCart(fetchedNotebooks)}
                    removeNotebook={notebookToRemove => setNotebookCart(getRemainingNotebooks(notebookCart, notebookToRemove))}
                  />
                  <SpacerH20 />

                  <LotsCart
                    lotsCart={lotsCart}
                    fetchedLots={fetchedLots}
                    removeLot={() => {}}
                  />
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
                    <AppButton onClick={placeOrder} disabled={loading || loadingOrder}>Оформить заказ</AppButton>
                  </ActionWrapper>
                </StyledCard>

              </CartWrapper>
              )}

        </InnerWrapPrivatePage>
      </WrapPrivatePage>
    </PrivateLayout>
  )
}
