export const subtractPercent = (amount, percent) => {
  const percentToSub = percent / 100
  const result = amount - (amount * percentToSub)
  return result.toFixed()
}
