'use client'
import React, { createContext, Dispatch, SetStateAction } from 'react'

export interface OpenFiltersSectionContextType {
  isOpen: boolean
  toggleOpen: Dispatch<SetStateAction<boolean>>
}

export const openFiltersSectionContext =
  createContext<OpenFiltersSectionContextType>({
    isOpen: false,
    toggleOpen: () => {}
  })

export function OpenFiltersSectionProvider({
  children
}: {
  children: React.ReactNode
}) {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <openFiltersSectionContext.Provider
      value={{ isOpen, toggleOpen: setIsOpen }}
    >
      {children}
    </openFiltersSectionContext.Provider>
  )
}
