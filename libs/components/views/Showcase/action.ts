'use server'
import {
  GET_ITEMS_FULL_XLSX,
  GET_ITEMS_MAIN_XLSX,
  GET_ITEMS_UNFINISHED_XLSX
} from '../../../constants/constants'
import { fetchWrapper } from '../../../service/fetch-wrapper'
import { ExcelDto } from '../../../utils-schema/excel.schema'

export async function getExcelByCategory(category: string) {
  const EXCEL_API =
    category === 'unfinished' ? GET_ITEMS_UNFINISHED_XLSX : GET_ITEMS_MAIN_XLSX
  const response = await fetchWrapper<unknown, ExcelDto>({ url: EXCEL_API })

  if (!response.success || !response.result) {
    throw new Error(response.message)
  }

  return `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${response.result.xlsx}`
}

export async function getAllShowcaseInExcel() {
  const response = await fetchWrapper<unknown, ExcelDto>({
    url: GET_ITEMS_FULL_XLSX
  })

  if (!response.success || !response.result) {
    throw new Error(response.message)
  }

  return `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${response.result.xlsx}`
}
