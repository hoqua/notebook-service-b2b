import React from 'react'
import { signOut, useSession } from 'next-auth/react'

export default function UserName() {
  const session = useSession()

  return (
    <>
      <div className="flex">
        <div className="min-[1000px]:text-right">
          <p className="text-sm font-medium">
            {session.data?.user.client_name}
          </p>
          <a
            className="text-sm text-[#112878]"
            href="#"
            onClick={() => {
              signOut({ callbackUrl: '/sign-in' })
            }}
          >
            Выйти
          </a>
        </div>
      </div>
    </>
  )
}
