'use server'
import { GET_ITEMS_LOT_XLSX } from '../../../constants/constants'
import { fetchWrapper } from '../../../service/fetch-wrapper'
import { ExcelDto } from '../../../utils-schema/excel.schema'

export async function getLotExcel() {
  const response = await fetchWrapper<unknown, ExcelDto>({
    url: GET_ITEMS_LOT_XLSX
  })

  if (!response.success || !response.result) {
    console.log(response.message)
    throw new Error(response.message)
  }

  return `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${response.result.xlsx}`
}
