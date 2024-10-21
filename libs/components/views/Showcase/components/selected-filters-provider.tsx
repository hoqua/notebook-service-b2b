'use client'
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState
} from 'react'
import { Filter } from '../../../../utils-schema/filter.schema'
import { useSearchParams } from 'next/navigation'

export type SelectedFiltersContextType = {
  filters: Record<string, Set<string>>
  setSelectedFilters: Dispatch<SetStateAction<Record<string, Set<string>>>>
}

export const selectedFiltersContext = createContext<SelectedFiltersContextType>(
  {
    filters: {},
    setSelectedFilters: () => {}
  }
)

export default function SelectedFiltersProvider({
  children
}: {
  children: ReactNode
}) {
  const searchParams = useSearchParams()
  const [filters, setFilters] = useState<Record<string, Set<string>>>(() => {
    const initialFilters: Record<string, Set<string>> = {}

    searchParams.forEach((value, key) => {
      if (initialFilters[key]) {
        initialFilters[key].add(value)
      } else {
        initialFilters[key] = new Set([value])
      }
    })
    return initialFilters
  })

  return (
    <selectedFiltersContext.Provider
      value={{ filters, setSelectedFilters: setFilters }}
    >
      {children}
    </selectedFiltersContext.Provider>
  )
}
