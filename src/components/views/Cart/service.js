import { getDiscountPrice } from '../../../utils/substractPercent'

export const getItemsPriceSum = (notebooks, lots) => {
  const notebooksSum = notebooks?.reduce((acc, notebook) => acc + notebook.item_price, 0) || 0
  const lotsSum = lots?.reduce((acc, lot) => acc + lot.lot_sum, 0) || 0
  return notebooksSum + lotsSum
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

  const currentSum = getItemsPriceSum(notebooksCart, lotsCart)
  const discountTotal = getDiscountPrice(user, currentSum)
  const sumDiff = currentSum - discountTotal

  return { currentSum, discountTotal, sumDiff }
}
