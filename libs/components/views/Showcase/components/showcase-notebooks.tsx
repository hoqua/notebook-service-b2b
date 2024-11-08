'use client'
import React, { useState, useTransition } from 'react'
import { Notebook } from '../../../../utils-schema/notebook.schema'
import NotebookCard from './notebook-card'
import { NotebookRow } from './notebook-row'
import { LayoutGrid, LayoutList } from 'lucide-react'
import { cn } from '../../../../utils/cn'
import { useSearchParams } from 'next/navigation'
import { stringToDate } from '../../../../utils/format-date'
import { getExcelByCategory } from '../action'
import { toast } from '../../../shared/ui/use-toast'
import Image from 'next/image'

export default function ShowcaseNotebooks({
  notebooks,
  rate,
  currencyName,
  userActive,
  category,
  userDiscount
}: {
  notebooks: Notebook[]
  rate: number
  currencyName: string
  userActive?: number
  category: string
  userDiscount: number
}) {
  const [showCards, setShowCards] = useState(false)
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const sortOption = searchParams.get('sort') || ''

  const sortedNotebooks = sortNotebooks(sortOption, notebooks)

  function handleExportExcel() {
    startTransition(async () => {
      try {
        const xlsx = await getExcelByCategory(category)
        const link = document.createElement('a')
        link.href = xlsx
        link.download = `notebooks.xlsx`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      } catch {
        toast({
          title: 'Ошибка экспорта в Excel',
          variant: 'destructive'
        })
      }
    })
  }

  return (
    <>
      <div className="items-center justify-end gap-2 flex">
        <button
          disabled={isPending}
          className="rounded-lg flex items-center gap-2 p-2 bg-white border border-transparent text-primary text-sm hover:border-primary transition-colors duration-300"
          onClick={handleExportExcel}
        >
          <Image
            src="/assets/icons/excel.svg"
            className="fill:bg-white"
            width={18}
            height={18}
            alt="excel"
          />
          <span>Выгрузка Excel</span>
        </button>
        <div className="items-center gap-2 hidden lg:flex">
          <button
            onClick={() => setShowCards(true)}
            className={cn(
              'rounded-lg p-2 hover:text-white hover:bg-primary transition-colors duration-300',
              showCards ? 'bg-primary text-white' : 'bg-white text-primary'
            )}
          >
            <LayoutGrid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setShowCards(false)}
            className={cn(
              'rounded-lg p-2 hover:text-white hover:bg-primary transition-colors duration-300',
              showCards ? 'bg-white text-primary' : 'bg-primary text-white'
            )}
          >
            <LayoutList className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="hidden lg:block">
        {showCards ? (
          <div className="notebook-card-grid">
            {sortedNotebooks.map((notebook, index) => (
              <NotebookCard
                key={`${notebook.item_id}_${index}`}
                notebook={notebook}
                rate={rate}
                userActive={userActive}
                userDiscount={userDiscount}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {sortedNotebooks.map((notebook, index) => (
              <NotebookRow
                key={`${notebook.item_id}_${index}`}
                notebook={notebook}
                rate={rate}
                currencyName={currencyName}
                userActive={userActive}
                userDiscount={userDiscount}
              />
            ))}
          </div>
        )}
      </div>

      <div className="notebook-card-grid grid lg:hidden">
        {sortedNotebooks.map((notebook, index) => (
          <NotebookCard
            key={`${notebook.item_id}_${index}`}
            notebook={notebook}
            rate={rate}
            userActive={userActive}
            userDiscount={userDiscount}
          />
        ))}
      </div>
    </>
  )
}

function sortNotebooks(sortBy: string, notebooks: Notebook[]) {
  const sortedNotebooks = [...notebooks].sort((a, b) => {
    const aStoreTime = stringToDate(a.store_time).getTime()
    const bStoreTime = stringToDate(b.store_time).getTime()

    switch (sortBy) {
      case 'price_asc':
        return a.item_price - b.item_price
      case 'price_desc':
        return b.item_price - a.item_price
      case 'store_time_asc':
        return aStoreTime - bStoreTime
      case 'store_time_desc':
        return bStoreTime - aStoreTime
      default:
        return 0
    }
  })

  return sortedNotebooks
}
