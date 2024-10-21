import React from 'react'
import { OpenFiltersSectionProvider } from '../../../libs/components/views/Showcase/components/openfilters-provider'
import { Breadcrumbs } from '../../../libs/components/shared/ui/breadcrumbs'
import PageTitleSection from '../../../libs/components/views/Showcase/components/page-title.section'
import Filters from '../../../libs/components/views/Showcase/components/filters'
import { fetchWrapper } from '../../../libs/service/fetch-wrapper'
import { FilterDto } from '../../../libs/utils-schema/filter.schema'
import {
  API_FILTERS,
  API_FILTERS_UNFINISHED
} from '../../../libs/constants/constants'
import SelectedFiltersProvider from '../../../libs/components/views/Showcase/components/selected-filters-provider'

export default async function Layout({
  children,
  params
}: {
  children: React.ReactNode
  params: { category: string }
}) {
  const category = params.category
  const FILTERS_API =
    category === 'unfinished' ? API_FILTERS_UNFINISHED : API_FILTERS
  const filters = await fetchWrapper<unknown, FilterDto>({ url: FILTERS_API })

  return (
    <OpenFiltersSectionProvider>
      <SelectedFiltersProvider>
        <div className="max-w-[1170px] px-2 w-full mx-auto flex flex-col gap-5 py-5">
          <Breadcrumbs />
          <PageTitleSection
            title={renderTextByCategory[category].title}
            subtitle={renderTextByCategory[category].subtitle}
          />
          <Filters filters={filters.result} />
          {children}
        </div>
      </SelectedFiltersProvider>
    </OpenFiltersSectionProvider>
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
