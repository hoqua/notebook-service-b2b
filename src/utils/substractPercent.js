export const subtractPercent = (amount, percent) => {
  const percentToSub = percent / 100
  const result = amount - (amount * percentToSub)
  return parseInt(result)
}

export const getDiscountPrice = (user, price) => {
  if (!user.active) return 0

  return subtractPercent(price, user.ppg_perc)
}
