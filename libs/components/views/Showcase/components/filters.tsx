'use client'
import React, { useContext, useState } from 'react'
import { FilterDto } from '../../../../utils-schema/filter.schema'
import { openFiltersSectionContext } from './openfilters-provider'
import { cn } from '../../../../utils/cn'
import { DropdownMenuCheckboxItemProps } from '@radix-ui/react-dropdown-menu'
import { DisplayFiltersTypes } from '../../../../constants/constants'
import { MultiSelect } from '../../../shared/ui/multi-select'
import { buttonClass } from '../../../shared/styled/action-button'
import { Checkbox } from '../../../shared/ui/checkbox'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { selectedFiltersContext } from './selected-filters-provider'

type Checked = DropdownMenuCheckboxItemProps['checked']

export default function Filters({ filters: data }: { filters: FilterDto }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { isOpen } = useContext(openFiltersSectionContext)
  const { filters } = useContext(selectedFiltersContext)
  const [showNewItems, setShowNewItems] = useState<Checked>(
    searchParams.get('new') === '1' ? true : false
  )

  function applyFilters() {
    const newSearchParams = new URLSearchParams(searchParams.toString())

    for (const [key, selectedFilters] of Object.entries(filters)) {
      const currentValues = newSearchParams.getAll(key)
      const updatedValues = new Set()

      for (let value of currentValues) {
        if (selectedFilters.has(value)) {
          updatedValues.add(value)
        }
      }

      selectedFilters.forEach((value) => {
        updatedValues.add(value)
      })
      newSearchParams.delete(key)
      updatedValues.forEach((value) =>
        newSearchParams.append(key, value as string)
      )
    }

    newSearchParams.set('new', showNewItems ? '1' : '0')
    newSearchParams.set('page', '1')
    router.replace(pathname + '?' + newSearchParams.toString())
  }

  console.log(filters)

  return (
    <div
      className={cn(
        'relative p-5 shadow-lg rounded-md bg-white h-fit',
        !isOpen && 'hidden'
      )}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3">
        {Object.keys(data.filters).map((key) => {
          return (
            <div key={key}>
              <p className="text-secondary-foreground text-sm">
                {DisplayFiltersTypes[key]}
              </p>
              <MultiSelect selectedKey={key} options={data.filters[key]} />
            </div>
          )
        })}
        <div className="w-full place-self-end flex flex-col gap-2">
          <div className="flex items-center gap-2 justify-center">
            <Checkbox
              id="new"
              checked={showNewItems}
              onCheckedChange={setShowNewItems}
            />
            <label htmlFor="new" className="text-sm text-secondary-foreground">
              Показать новинки
            </label>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              applyFilters()
            }}
            className={cn(buttonClass(false), 'h-10 w-full')}
          >
            Применить
          </button>
        </div>
      </div>
    </div>
  )
}
