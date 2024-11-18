import React from 'react'
import { LookoutConditions } from '../../../../constants/constants'
import { Minus } from 'lucide-react'
import { cn } from '../../../../utils/cn'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '../../../shared/ui/popover'

export default function NotebookLookout({ lookout }: { lookout: string }) {
  const { title, style } = iconConditionMap[lookout]
  return (
    <Popover>
      <PopoverTrigger>
        <div
          className={cn(
            'text-white text-sm text-center rounded-sm px-1 py-2',
            style
          )}
        >
          {lookout || <Minus />}
        </div>
      </PopoverTrigger>
      <PopoverContent className={style}>
        <p className="text-white">{title}</p>
      </PopoverContent>
    </Popover>
  )
}

const iconConditionMap = {
  [LookoutConditions.classA]: {
    title: 'Экран в отличном состоянии, без видимых дефектов.',
    style: 'bg-[#5FD071]'
  },
  [LookoutConditions.classB]: {
    title:
      'Экран в хорошем состоянии, но с небольшими косметическими дефектами, возможны мелкие потертости или минимальные засветы, заметные только при внимательном рассмотрении.',
    style: 'bg-[#BCDB57]'
  },
  [LookoutConditions.classC]: {
    title:
      'Экран с видимыми дефектами, возможны пятна, полосы, трещины, но они не должны критически влиять на комфорт использования.',
    style: 'bg-[#AFAE72]'
  }
}
