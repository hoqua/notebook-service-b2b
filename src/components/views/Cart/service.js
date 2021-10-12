import { getDiscountPrice } from '../../../utils/substractPercent'

export const getNotebookPriceSum = (notebooks) => notebooks.reduce((acc, notebook) => acc + notebook.item_price, 0)
export const getNotebooksIds = (notebooks) => notebooks.map(notebook => notebook.serial_num)

export const getQuery = (storageCart) => {
  const addedToCardIds = getNotebooksIds(storageCart)

  return '?' + new URLSearchParams({ serial_num: addedToCardIds })
}

export const getRemainingNotebooks = (cart, notebookToRemove) => {
  const cartCopy = [...cart]
  const index = cartCopy.findIndex(notebook => notebook.serial_num === notebookToRemove.serial_num)
  if (index === -1) return cart

  cartCopy.splice(index, 1)

  return cartCopy
}

export const getSumCounts = (storageCart, user) => {
  const currentSum = getNotebookPriceSum(storageCart)
  const discountTotal = getDiscountPrice(user, currentSum)
  const sumDiff = currentSum - discountTotal

  return { currentSum, discountTotal, sumDiff }
}
