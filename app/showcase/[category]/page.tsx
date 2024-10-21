import React, { Suspense } from 'react'
import ShowcaseCategoryPage from '../../../libs/components/views/Showcase/showcase-category.page'
import { OpenFiltersSectionProvider } from '../../../libs/components/views/Showcase/components/openfilters-provider'
import { Loader2 } from 'lucide-react'

export default async function Page({
  params,
  searchParams
}: {
  params: { category: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const page = Number(searchParams.page) || 1

  return (
    <OpenFiltersSectionProvider>
      <Suspense
        fallback={
          <div className="flex items-center justify-center mt-20">
            <Loader2 className="w-10 h-10 animate-spin" />
          </div>
        }
      >
        <ShowcaseCategoryPage
          currentPage={page}
          category={params.category}
          searchParams={searchParams}
        />
      </Suspense>
    </OpenFiltersSectionProvider>
  )
}
