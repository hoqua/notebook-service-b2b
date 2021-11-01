import { getDiscountPrice } from '../../../utils/substractPercent'

export const getNotebookPriceSum = (notebooks) => notebooks.reduce((acc, notebook) => acc + notebook.item_price, 0)

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

export const getSumCounts = (storageCart, user) => {
  if (!storageCart?.length) return {}

  const currentSum = getNotebookPriceSum(storageCart)
  const discountTotal = getDiscountPrice(user, currentSum)
  const sumDiff = currentSum - discountTotal

  return { currentSum, discountTotal, sumDiff }
}
