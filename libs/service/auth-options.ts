import { NextAuthOptions } from 'next-auth'
import { API_ROOT } from '../constants/constants'
import { LoginDto, LoginResponse } from '../utils-schema/auth.schema'
import CredentialsProvider from 'next-auth/providers/credentials'
import { stringToDate } from '../utils/format-date'

export const nextAuthOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/sign-in',
    error: '/sign-in'
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },

      async authorize(credentials) {
        if (!credentials) {
          return null
        }

        const creds = LoginDto.safeParse(credentials).data

        if (!creds) {
          return null
        }

        const { email, password } = creds

        const response = await fetch(
          `${API_ROOT}/login.php?u=${email}&p=${password}`,
          {
            cache: 'no-store'
          }
        )

        if (!response.ok) {
          return null
        }

        const result = await response.json()

        if (result.error !== 0) {
          return null
        }

        return result
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user && account) {
        return { ...token, jwt: user as LoginResponse }
      }

      const tokenExpiry = stringToDate(token.jwt.token_exp_time).getTime()

      if (Date.now() >= tokenExpiry) {
        return { ...token, expired: true }
      }

      return { ...token, expired: false }
    },
    async session({ session, token }) {
      session.jwt = token.jwt
      return session
    }
  }
}
