import { getDiscountPrice } from '../../../utils/substractPercent'
import { useFetch } from 'use-http'
import { API_DO_ORDER, API_DO_ORDER_LOTS, API_LOTS, API_NOTEBOOKS_BY_SERIAL } from '../../../constants/constants'

export const getNotebooksPriceSum = (notebooks) => {
  return notebooks?.reduce((acc, notebook) => acc + notebook.item_price, 0) || 0
}
export const getLotsPriceSum = (lots) => {
  return lots?.reduce((acc, lot) => acc + lot.lot_sum, 0) || 0
}

export const getQuery = (notebooks) => {
  const addedToCardIds = notebooks.map(notebook => notebook.serial_num)

  return '?' + new URLSearchParams({ serial_num: addedToCardIds })
}

export const getLotsQuery = (lotsStorageCart) => {
  const addedToCartLotNames = lotsStorageCart.map(lot => lot.lot_name)

  return '?' + new URLSearchParams({ lot_name: addedToCartLotNames })
}

export const getRemainingNotebooks = (cart, notebookToRemove) => {
  const cartCopy = [...cart]
  const index = cartCopy.findIndex(notebook => notebook.serial_num === notebookToRemove.serial_num)
  if (index === -1) return cart

  cartCopy.splice(index, 1)

  return cartCopy
}

export const getRemainingLots = (lotsCart, lotToRemove) => {
  const cartCopy = [...lotsCart]
  const index = cartCopy.findIndex(lot => lot.lot_name === lotToRemove.lot_name)
  if (index === -1) return lotsCart

  cartCopy.splice(index, 1)

  return cartCopy
}

export const getSumCounts = (notebooksCart, lotsCart, user) => {
  if (!notebooksCart?.length && !lotsCart?.length) return {}

  const nSum = getNotebooksPriceSum(notebooksCart)
  const lSum = getLotsPriceSum(lotsCart)
  const nDiscountSum = getDiscountPrice(user, nSum) // discount works only for notebooks

  const currentSum = lSum + nSum
  const discountTotal = nSum - nDiscountSum
  const sumDiff = currentSum - discountTotal

  return {
    currentSum,
    discountTotal,
    sumDiff
  }
}

export const useApi = () => {
  const { get: getNotebooksById, data: notebooksData, loading: loadingNotebooks } = useFetch(API_NOTEBOOKS_BY_SERIAL)
  const { get: getLotsByName, data: lotsData, loading: loadingLots } = useFetch(API_LOTS)
  const { post: postOrder, loading: loadingOrder } = useFetch(API_DO_ORDER)
  const { post: postLotOrder, loading: loadingLotOrder } = useFetch(API_DO_ORDER_LOTS)
  const fetchedNotebooks = notebooksData?.items || []
  const fetchedLots = lotsData?.lots || []
  const isSomethingLoading = loadingNotebooks || loadingOrder || loadingLotOrder || loadingLots

  return { getNotebooksById, fetchedNotebooks, getLotsByName, fetchedLots, postOrder, postLotOrder, isSomethingLoading }
}
