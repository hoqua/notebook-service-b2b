import type { LoginResponse } from './libs/utils-schema/auth.schema'

declare module 'next-auth' {
  export type User = LoginResponse

  export interface Session {
    jwt: LoginResponse
    error?: 'AccessTokenExpired'
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    jwt: LoginResponse
    error?: 'AccessTokenExpired'
  }
}
