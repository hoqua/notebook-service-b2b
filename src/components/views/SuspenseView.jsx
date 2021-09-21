import React from 'react'
import { WrapPageLight } from '../shared/styled/WrapPageLight'
import PublicLayout from '../shared/layouts/PublicLayout'
import { Loading } from '../shared/Loading/Loading'

export default function SuspenseView () {
  return (
    <PublicLayout>
      <WrapPageLight>
        <Loading />
      </WrapPageLight>
    </PublicLayout>
  )
}
