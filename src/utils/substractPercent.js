export const subtractPercent = (amount, percent) => {
  const onePercent = amount / 100
  const result = amount - percent * onePercent
  return parseInt(result)
}

export const getDiscountPrice = (user, price) => {
  if (!user?.active) return price

  return subtractPercent(price, user.ppg_perc)
}

export const getDiscountPriceStyled = (user, price) => {
  if (!user?.active) return null

  return `(${getDiscountPrice(user, price)})`
}
