import React, { useEffect } from 'react'
import { WrapPageLight } from '../shared/styled/WrapPageLight'
import PrivateLayout from '../shared/layouts/PrivateLayout/PrivateLayout'
import { useFetch } from 'use-http'

export default function Main () {
  const { get: userGet } = useFetch('get-user-info.php')

  useEffect(() => {
    userGet().then(res => console.log(res))
  }, [])

  return (
    <PrivateLayout>
      <WrapPageLight>
        protected
      </WrapPageLight>
    </PrivateLayout>

  )
}
