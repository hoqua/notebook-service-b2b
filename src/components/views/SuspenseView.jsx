import React from 'react'
import { WrapPageLight } from '../shared/styled/WrapPageLight'
import PublicLayout from '../shared/layouts/PublicLayout'

export default function SuspenseView () {
  return (
    <PublicLayout>
      <WrapPageLight>
        Loading
      </WrapPageLight>
    </PublicLayout>
  )
}
