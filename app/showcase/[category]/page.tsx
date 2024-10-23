import React, { Suspense } from 'react'
import ShowcaseCategoryPage from '../../../libs/components/views/Showcase/showcase-category.page'
import { Loader2 } from 'lucide-react'
import { Breadcrumbs } from '../../../libs/components/shared/ui/breadcrumbs'
import PageTitleSection from '../../../libs/components/views/Showcase/components/page-title.section'
import {
  API_FILTERS,
  API_FILTERS_UNFINISHED,
  API_GET_EXRATE,
  API_NOTEBOOKS,
  API_NOTEBOOKS_UNFINISHED
} from '../../../libs/constants/constants'
import { fetchWrapper } from '../../../libs/service/fetch-wrapper'
import { FilterDto } from '../../../libs/utils-schema/filter.schema'
import { getFilteredAndPaginatedNotebooksData } from '../../../libs/components/views/Showcase/utils/filter-notebooks'
import { ExchangeRateDto } from '../../../libs/utils-schema/exrate.schema'

export default async function Page({
  params,
  searchParams
}: {
  params: { category: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const page = Number(searchParams.page) || 1
  const category = params.category
  const FILTERS_API =
    category === 'unfinished' ? API_FILTERS_UNFINISHED : API_FILTERS

  const NOTEBOOKS_API =
    category === 'unfinished' ? API_NOTEBOOKS_UNFINISHED : API_NOTEBOOKS

  const [notebooksData, filters, exchangeRate] = await Promise.all([
    getFilteredAndPaginatedNotebooksData(
      page,
      NOTEBOOKS_API,
      category,
      searchParams
    ),
    fetchWrapper<unknown, FilterDto>({ url: FILTERS_API }),
    fetchWrapper<unknown, ExchangeRateDto>({
      url: API_GET_EXRATE
    })
  ])

  return (
    <div className="max-w-[1170px] px-2 w-full mx-auto flex flex-col gap-5 py-5">
      <Breadcrumbs />
      <PageTitleSection
        title={renderTextByCategory[category].title}
        subtitle={renderTextByCategory[category].subtitle}
        filters={filters.result}
      />
      <Suspense
        fallback={
          <div className="flex items-center justify-center mt-20">
            <Loader2 className="w-10 h-10 animate-spin" />
          </div>
        }
      >
        <ShowcaseCategoryPage
          notebooksData={notebooksData}
          exchangeRate={exchangeRate.result}
        />
      </Suspense>
    </div>
  )
}

const renderTextByCategory: Record<
  string,
  Record<'title' | 'subtitle', string>
> = {
  finished: {
    title: 'Готовые',
    subtitle: 'Гарантия на все ноутбуки с Витрины - 1 месяц.'
  },
  unfinished: {
    title: 'Не готовые ноутбуки',
    subtitle: "Гарантия на 'Не готовые' ноутбуки не предоставляется."
  }
}
