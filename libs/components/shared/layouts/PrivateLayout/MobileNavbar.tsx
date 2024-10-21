import React from 'react'
import { Sheet, SheetContent, SheetTrigger } from '../../ui/sheet'
import { Menu } from 'lucide-react'
import { Info } from './PrivateLayout'
import Navigation from './Navigation'
import UserName from './UserName'
import { DialogTitle } from '@radix-ui/react-dialog'

export default function MobileNavbar({
  currency_name,
  rate,
  numberOrders
}: {
  currency_name: string
  rate: number
  numberOrders: number
}) {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent
        aria-describedby={undefined}
        className="flex flex-col gap-5 justify-between"
      >
        <DialogTitle hidden />
        <Info currencyName={currency_name} rate={rate} />
        <div className="flex flex-col gap-5">
          <Navigation numberOrders={numberOrders} />
          <UserName />
        </div>
      </SheetContent>
    </Sheet>
  )
}
