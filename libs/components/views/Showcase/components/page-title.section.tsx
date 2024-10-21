'use client'
import React, { ChangeEvent, useContext, useState } from 'react'
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
import { openFiltersSectionContext } from './openfilters-provider'

const PRICE_OPTIONS = [
  {
    value: 'default',
    label: 'По умолчанию'
  },
  {
    value: 'asc',
    label: 'По возрастанию'
  },
  {
    value: 'desc',
    label: 'По убыванию'
  }
]

export default function PageTitleSection({
  title,
  subtitle
}: {
  title: string
  subtitle?: string
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const searchedSerialNumber = searchParams.get('serialNumber')
  const { isOpen, toggleOpen } = useContext(openFiltersSectionContext)
  const [serialNumber, setSerialNumber] = useState(searchedSerialNumber || '')
  function handleSerialNumberChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    setSerialNumber(value)
    const newSearchParams = new URLSearchParams(searchParams.toString())
    newSearchParams.set('serialNumber', value)
    router.push(pathname + '?' + newSearchParams.toString())
  }

  return (
    <div className="flex items-center flex-col gap-5 justify-start md:justify-between md:flex-row">
      <div className="flex flex-col gap-2 w-full">
        <h1 className="text-2xl font-medium">{title}</h1>
        <p className="text-secondary-foreground text-sm">{subtitle}</p>
      </div>

      <div className="flex items-center gap-2 sm:gap-5 w-full flex-col sm:flex-row">
        <Input
          value={serialNumber}
          onChange={handleSerialNumberChange}
          placeholder="Введите серийный номер"
          className={cn(
            'h-12 border-[#EAEEF1] bg-white focus-visible:outline-none focus-visible:ring-0 focus:border-primary hover:border-primary transition-all duration-300'
          )}
        />

        <SortPriceSelect />

        <button
          onClick={() => toggleOpen((prev) => !prev)}
          className="bg-white border border-transparent text-sm gap-2 w-full sm:w-auto h-12 px-2 rounded-lg hover:border-primary text-primary transition-all duration-300"
        >
          <div className="flex item-center justify-center gap-2">
            <SlidersHorizontal className="w-5 h-5" />
          </div>
        </button>
      </div>
    </div>
  )
}

function SortPriceSelect() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  function handleSortPriceChange(value: string) {
    const newSearchParams = new URLSearchParams(searchParams.toString())
    newSearchParams.set('sortPrice', value)
    router.push(pathname + '?' + newSearchParams.toString())
  }

  return (
    <Select defaultValue="default" onValueChange={handleSortPriceChange}>
      <SelectTrigger className="w-full bg-white h-12 text-primary hover:border-primary transition-all duration-300">
        <SelectValue placeholder="Сортировка по цене" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Цена</SelectLabel>
          {PRICE_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value.toString()}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
