import React from 'react'
import PaginationLinks from './components/pagination-links'

import { ExchangeRateDto } from '../../../utils-schema/exrate.schema'
import ShowcaseNotebooks from './components/showcase-notebooks'
import EmptyResult from '../../shared/errorComponents/empty-result'
import { getFilteredAndPaginatedNotebooksData } from './utils/filter-notebooks'
import {
  API_FILTERS,
  API_FILTERS_UNFINISHED,
  API_GET_EXRATE,
  API_NOTEBOOKS,
  API_NOTEBOOKS_UNFINISHED
} from '../../../constants/constants'
import { fetchWrapper, getUserOrThrow } from '../../../service/fetch-wrapper'
import { FilterDto } from '../../../utils-schema/filter.schema'
import PageTitleSection from './components/page-title.section'

export default async function ShowcaseCategoryPage({
  category,
  page,
  searchParams
}: {
  category: string
  page: number
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const NOTEBOOKS_API =
    category === 'unfinished' ? API_NOTEBOOKS_UNFINISHED : API_NOTEBOOKS
  const FILTERS_API =
    category === 'unfinished' ? API_FILTERS_UNFINISHED : API_FILTERS
  const [notebooksData, filters, userSession, exchangeRate] = await Promise.all(
    [
      getFilteredAndPaginatedNotebooksData(page, NOTEBOOKS_API, searchParams),
      fetchWrapper<unknown, FilterDto>({ url: FILTERS_API }),
      getUserOrThrow(),
      fetchWrapper<unknown, ExchangeRateDto>({
        url: API_GET_EXRATE
      })
    ]
  )

  return (
    <>
      <PageTitleSection category={category} filters={filters.result!} />
      {notebooksData.notebooks.length === 0 ? (
        <EmptyResult />
      ) : (
        <div className={'flex flex-col gap-5 w-full'}>
          <ShowcaseNotebooks
            category={category}
            userActive={userSession.active}
            userDiscount={userSession.ppg_perc}
            notebooks={notebooksData.notebooks}
            rate={exchangeRate?.result?.rate || 0}
            currencyName={exchangeRate?.result?.currency_name || 'USD'}
          />

          <PaginationLinks totalPages={notebooksData.totalPages} />
        </div>
      )}
    </>
  )
}
