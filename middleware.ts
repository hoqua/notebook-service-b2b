import { withAuth } from 'next-auth/middleware'
import { stringToDate } from './libs/utils/format-date'
import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
    const baseUrl = req.nextUrl.origin
    if (
      token &&
      Date.now() >= stringToDate(token.jwt.token_exp_time).getTime()
    ) {
      const response = NextResponse.redirect(`${baseUrl}/sign-in`)
      response.cookies.set('next-auth.session-token', '', { maxAge: 0 })
      response.cookies.set('next-auth.csrf-token', '', { maxAge: 0 })
      return response
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        return !!token
      }
    }
  }
)

export const config = {
  matcher: ['/showcase', '/showcase/:path*']
}
