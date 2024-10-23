import React from 'react'
import PaginationLinks from './components/pagination-links'

import { ExchangeRateDto } from '../../../utils-schema/exrate.schema'
import ShowcaseNotebooks from './components/showcase-notebooks'
import { Notebook } from '../../../utils-schema/notebook.schema'
import EmptyResult from '../../shared/errorComponents/empty-result'

export default function ShowcaseCategoryPage({
  exchangeRate,
  notebooksData
}: {
  exchangeRate: ExchangeRateDto
  notebooksData: {
    notebooks: Notebook[]
    totalPages: number
  }
}) {
  return (
    <>
      {notebooksData.notebooks.length === 0 ? (
        <EmptyResult />
      ) : (
        <div className={'flex flex-col gap-5 w-full'}>
          <ShowcaseNotebooks
            notebooks={notebooksData.notebooks}
            rate={exchangeRate.rate}
            currencyName={exchangeRate.currency_name}
          />
          <PaginationLinks totalPages={notebooksData.totalPages} />
        </div>
      )}
    </>
  )
}
