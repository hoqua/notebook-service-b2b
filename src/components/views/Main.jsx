import React, { useEffect } from 'react'
import { WrapPageLight } from '../shared/styled/WrapPageLight'
import PrivateLayout from '../shared/layouts/PrivateLayout/PrivateLayout'
import { useFetch } from 'use-http'
import { useLocalStorage } from '../../hooks/useLocalStorage'

export default function Main () {
  const [token] = useLocalStorage('token')
  const { get, response } = useFetch(`/get-user-info.php?auth_token=${token}`)

  useEffect(() => {
    get()
  }, [])
  console.log(response)

  return (
    <PrivateLayout>
      <WrapPageLight>
        protected
      </WrapPageLight>
    </PrivateLayout>

  )
}
