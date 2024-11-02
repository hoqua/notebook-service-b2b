import React from 'react'
import PaginationLinks from './components/pagination-links'

import { ExchangeRateDto } from '../../../utils-schema/exrate.schema'
import ShowcaseNotebooks from './components/showcase-notebooks'
import EmptyResult from '../../shared/errorComponents/empty-result'
import { getFilteredAndPaginatedNotebooksData } from './utils/filter-notebooks'
import {
  API_GET_EXRATE,
  API_NOTEBOOKS,
  API_NOTEBOOKS_UNFINISHED
} from '../../../constants/constants'
import { fetchWrapper, getUserOrThrow } from '../../../service/fetch-wrapper'

export default async function ShowcaseCategoryPage({
  category,
  page,
  searchParams
}: {
  category: string
  page: number
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const NOTEBOOKS_API =
    category === 'unfinished' ? API_NOTEBOOKS_UNFINISHED : API_NOTEBOOKS
  const [userSession, notebooksData, exchangeRate] = await Promise.all([
    getUserOrThrow(),
    getFilteredAndPaginatedNotebooksData(
      page,
      NOTEBOOKS_API,
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
        <EmptyResult />
      ) : (
        <div className={'flex flex-col gap-5 w-full'}>
          <ShowcaseNotebooks
            category={category}
            userActive={userSession.active}
            userDiscount={userSession.ppg_perc}
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
