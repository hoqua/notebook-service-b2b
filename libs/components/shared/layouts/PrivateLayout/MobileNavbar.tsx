'use client'
import React, { useState } from 'react'
import { Sheet, SheetContent, SheetTrigger } from '../../ui/sheet'
import { Menu } from 'lucide-react'
import { Info } from './PrivateLayout'
import Navigation from './Navigation'
import UserName from './UserName'
import { DialogTitle } from '@radix-ui/react-dialog'
import { User } from '../../../../utils-schema/auth.schema'

export default function MobileNavbar({
  currency_name,
  rate,
  numberOrders,
  user
}: {
  currency_name: string
  rate: number
  numberOrders: number
  user: User
}) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="flex items-center gap-2 h-full">
      <Navigation numberOrders={numberOrders} />
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger id="mobile-menu" aria-label="mobile menu trigger">
          <Menu />
        </SheetTrigger>
        <SheetContent
          aria-describedby={undefined}
          className="flex flex-col gap-5 justify-between"
        >
          <DialogTitle hidden />
          <Info currencyName={currency_name} rate={rate} user={user} />
          <div className="flex flex-col gap-5">
            <UserName username={user.client_name} />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
