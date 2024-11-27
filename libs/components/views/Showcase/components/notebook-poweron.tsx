import { Check, X } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '../../../shared/ui/popover'
import { cn } from '../../../../utils/cn'

export function NotebookPowerOn({
  powerOn,
  className
}: {
  powerOn: string
  className?: string
}) {
  const isPowerOn = powerOn === 'Да'
  return (
    <Popover>
      {' '}
      <PopoverTrigger>
        {isPowerOn ? (
          <span
            className={cn(
              'pointer text-secondary-foreground text-xs flex items-center gap-2',
              className
            )}
          >
            <Check className="w-4 h-4 pointer text-green-500" />
            Рабочий
          </span>
        ) : (
          <span
            className={cn(
              'pointer text-secondary-foreground text-xs flex items-center gap-2',
              className
            )}
          >
            <X className="w-4 h-4 text-red-500" />
            Не вкл-ся
          </span>
        )}
      </PopoverTrigger>
      <PopoverContent>
        {isPowerOn ? (
          <p className=" text-green-500">
            Ноутбук включается, прошел первичную проверку, неисправностей не
            обнаружено.{' '}
          </p>
        ) : (
          <p className=" text-red-500">Ноутбук не включается.</p>
        )}
      </PopoverContent>
    </Popover>
  )
}
