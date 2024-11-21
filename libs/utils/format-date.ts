import { parse } from 'date-fns'

export function stringToDate(date: string) {
  return parse(date, 'dd.MM.yyyy HH:mm:ss', new Date())
}
