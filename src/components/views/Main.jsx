import React from 'react'
import { WrapPageLight } from '../shared/styled/WrapPageLight'
import PrivateLayout from '../shared/layouts/PrivateLayout/PrivateLayout'

export default function Main () {
  return (
    <PrivateLayout>
      <WrapPageLight>
        protected
      </WrapPageLight>
    </PrivateLayout>

  )
}
