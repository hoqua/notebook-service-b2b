'use client'
import React, { ChangeEvent, useCallback, useState } from 'react'
import { Input } from '../../../shared/ui/input'
import { cn } from '../../../../utils/cn'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '../../../shared/ui/select'
import { SlidersHorizontal } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { FilterDto } from '../../../../utils-schema/filter.schema'
import Filters from './filters'
import { debounce } from 'radash'

const SORT_OPTIONS = [
  {
    value: 'default',
    label: 'По умолчанию'
  },
  {
    value: 'price_asc',
    label: 'Цена по возрастанию'
  },
  {
    value: 'price_desc',
    label: 'Цена по убыванию'
  },
  {
    value: 'store_time_desc',
    label: 'От новых к старым'
  },
  {
    value: 'store_time_asc',
    label: 'От старых к новым'
  }
]

export default function PageTitleSection({
  category,
  filters
}: {
  category: string
  filters?: FilterDto
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const searchedSerialNumber = searchParams.get('serialNumber')
  const searchedNotebookName = searchParams.get('notebookName')
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const [serialNumber, setSerialNumber] = useState(searchedSerialNumber || '')
  const [name, setName] = useState(searchedNotebookName || '')

  const debouncedSerialNumberChange = debounce(
    { delay: 300 },
    (value: string, searchParams, router, pathname) => {
      const newSearchParams = new URLSearchParams(searchParams.toString())
      if (value) {
        newSearchParams.set('serialNumber', value)
      } else {
        newSearchParams.delete('serialNumber')
      }
      router.push(pathname + '?' + newSearchParams.toString())
    }
  )

  const debouncedNameChange = debounce(
    { delay: 300 },
    (value: string, searchParams, router, pathname) => {
      const newSearchParams = new URLSearchParams(searchParams.toString())
      if (value) {
        newSearchParams.set('notebookName', value)
      } else {
        newSearchParams.delete('notebookName')
      }
      router.push(pathname + '?' + newSearchParams.toString())
    }
  )

  const handleDebouncedSerialNumberChange = useCallback(
    (value: string) =>
      debouncedSerialNumberChange(value, searchParams, router, pathname),
    [searchParams, router, pathname, debouncedSerialNumberChange]
  )

  const handleDebouncedNameChange = useCallback(
    (value: string) =>
      debouncedNameChange(value, searchParams, router, pathname),
    [searchParams, router, pathname, debouncedNameChange]
  )

  function handleSerialNumberChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    setSerialNumber(value)
    handleDebouncedSerialNumberChange(value)
  }

  function handleNameChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    setName(value)
    handleDebouncedNameChange(value)
  }

  return (
    <>
      <div className="flex items-center flex-col gap-5 justify-start lg:justify-between lg:flex-row">
        <div className="flex flex-col gap-2 w-full">
          <h1 className="text-2xl font-medium">
            {renderTextByCategory[category].title}
          </h1>
          <p className="text-secondary-foreground text-sm">
            {renderTextByCategory[category].subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2 sm:gap-5 w-full flex-col sm:flex-row">
          <Input
            value={name}
            onChange={handleNameChange}
            placeholder="Введите название"
            className={cn(
              'h-12 border-[#EAEEF1] bg-white focus-visible:outline-none focus-visible:ring-0 focus:border-primary hover:border-primary transition-all duration-300'
            )}
          />
          <Input
            value={serialNumber}
            onChange={handleSerialNumberChange}
            placeholder="Введите серийный номер"
            className={cn(
              'h-12 border-[#EAEEF1] bg-white focus-visible:outline-none focus-visible:ring-0 focus:border-primary hover:border-primary transition-all duration-300'
            )}
          />

          <SortSelect />

          {filters && (
            <button
              id="show-filters"
              aria-label="show filters"
              onClick={() => setIsFiltersOpen((prev) => !prev)}
              className="bg-white border border-transparent text-sm gap-2 w-full sm:w-auto h-12 px-2 rounded-lg hover:border-primary text-primary transition-all duration-300"
            >
              <div className="flex item-center justify-center gap-2">
                <SlidersHorizontal className="w-5 h-5" />
              </div>
            </button>
          )}
        </div>
      </div>
      {filters && isFiltersOpen && <Filters filters={filters} />}
    </>
  )
}

function SortSelect() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const searchedSortOption = searchParams.get('sort')

  function handleSortPriceChange(value: string) {
    const newSearchParams = new URLSearchParams(searchParams.toString())
    newSearchParams.set('sort', value)
    router.push(pathname + '?' + newSearchParams.toString())
  }

  return (
    <Select
      defaultValue={searchedSortOption || 'default'}
      onValueChange={handleSortPriceChange}
    >
      <SelectTrigger
        id="show-sort-trigger"
        aria-label="show sort options"
        className="w-full bg-white h-12 text-primary hover:border-primary transition-all duration-300"
      >
        <SelectValue placeholder="Сортировка" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Сортировка по</SelectLabel>
          {SORT_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value.toString()}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
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
