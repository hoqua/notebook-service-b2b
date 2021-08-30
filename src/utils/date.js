// dateTime format '29.08.2021 14:42:08'
export const formatDate = (dateTime) => {
  const [date, time] = dateTime.split(' ')
  const formattedTime = time.split(':')
  let [day, month, year] = date.split('.')
  month-- // js date 0 based, but we get 1 based dates
  day--

  return new Date(year, month, day, ...formattedTime)
}
