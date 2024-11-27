import React from 'react'
import { DisplayConditions } from '../../../../constants/constants'
import { CheckIcon, CircleHelpIcon, XIcon } from 'lucide-react'
import { cn } from '../../../../utils/cn'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '../../../shared/ui/popover'

export default function DisplayCondition({ condition }: { condition: string }) {
  const { icon: Icon, title, style } = iconConditionMap[condition]
  return (
    <Popover>
      <PopoverTrigger>
        <div className="flex items-center gap-2 text-xs">
          <span>
            <Icon className={cn('w-4 h-4', style)} />
          </span>
          <p className="text-secondary-foreground">Экран</p>
        </div>
      </PopoverTrigger>
      <PopoverContent className={style}>
        <p>{title}</p>
      </PopoverContent>
    </Popover>
  )
}

const iconConditionMap = {
  [DisplayConditions.Good]: {
    icon: CheckIcon,
    title: 'Экран в отличном состоянии, без видимых дефектов.',
    style: 'text-green-500'
  },
  [DisplayConditions.Defective]: {
    icon: CheckIcon,
    title:
      'Экран в хорошем состоянии, но с небольшими косметическими дефектами, возможны мелкие потертости или минимальные засветы, заметные только при внимательном рассмотрении.',
    style: 'text-primary'
  },
  [DisplayConditions.Questionable]: {
    icon: CircleHelpIcon,
    title:
      'Экран с видимыми дефектами, возможны пятна, полосы, трещины, но они не должны критически влиять на комфорт использования.',
    style: 'text-orange-500'
  },
  [DisplayConditions.Bad]: {
    icon: XIcon,
    title: 'Экран поврежден,отсутствует',
    style: 'text-red-500'
  },
  [DisplayConditions.no]: {
    icon: XIcon,
    title: 'Не указано',
    style: 'text-gray-400'
  }
}
