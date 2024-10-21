import React from 'react'
import PaginationLinks from './components/pagination-links'
import {
  API_GET_EXRATE,
  API_NOTEBOOKS,
  API_NOTEBOOKS_UNFINISHED
} from '../../../constants/constants'
import { getFilteredAndPaginatedNotebooksData } from './utils/filter-notebooks'
import { fetchWrapper } from '../../../service/fetch-wrapper'
import { ExchangeRateDto } from '../../../utils-schema/exrate.schema'
import ShowcaseNotebooks from './components/showcase-notebooks'

export default async function ShowcaseCategoryPage({
  category,
  currentPage,
  searchParams
}: {
  category: string
  currentPage: number
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const API =
    category === 'unfinished' ? API_NOTEBOOKS_UNFINISHED : API_NOTEBOOKS

  const [notebooksData, exchangeRate] = await Promise.all([
    getFilteredAndPaginatedNotebooksData(
      currentPage,
      API,
      category,
      searchParams
    ),
    fetchWrapper<unknown, ExchangeRateDto>({
      url: API_GET_EXRATE
    })
  ])

  return (
    <>
      {notebooksData.notebooks.length === 0 ? (
        <div className="text-center mt-20 text-xl">
          К сожелению таких ноутбуков не найдено
        </div>
      ) : (
        <div className={'flex flex-col gap-5 w-full'}>
          <ShowcaseNotebooks
            notebooks={notebooksData.notebooks}
            rate={exchangeRate.result.rate}
            currencyName={exchangeRate.result.currency_name}
          />
          <PaginationLinks totalPages={notebooksData.totalPages} />
        </div>
      )}
    </>
  )
}
