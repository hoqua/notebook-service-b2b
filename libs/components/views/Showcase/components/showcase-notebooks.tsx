'use client'
import React, { useState } from 'react'
import { Notebook } from '../../../../utils-schema/notebook.schema'
import NotebookCard from './notebook-card'
import { NotebookRow } from './notebook-row'
import { LayoutGrid, LayoutList } from 'lucide-react'
import { cn } from '../../../../utils/cn'

export default function ShowcaseNotebooks({
  notebooks,
  rate,
  currencyName
}: {
  notebooks: Notebook[]
  rate: number
  currencyName: string
}) {
  const [showCards, setShowCards] = useState(false)
  return (
    <>
      <div className="items-center justify-end gap-2 hidden lg:flex">
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

      <div className="hidden lg:block">
        {showCards ? (
          <div className="notebook-card-grid">
            {notebooks.map((notebook, index) => (
              <NotebookCard
                key={`${notebook.item_id}_${index}`}
                notebook={notebook}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {notebooks.map((notebook, index) => (
              <NotebookRow
                key={`${notebook.item_id}_${index}`}
                notebook={notebook}
                rate={rate}
                currencyName={currencyName}
              />
            ))}
          </div>
        )}
      </div>

      <div className="notebook-card-grid grid lg:hidden">
        {notebooks.map((notebook, index) => (
          <NotebookCard
            key={`${notebook.item_id}_${index}`}
            notebook={notebook}
          />
        ))}
      </div>
    </>
  )
}
