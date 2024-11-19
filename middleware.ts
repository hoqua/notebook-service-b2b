import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'
export default withAuth(
  async function middleware(req) {
    const token = req.nextauth?.token
    const baseUrl = req.nextUrl.origin
    if (!token || token.expired) {
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
        return !!token && !token.expired
      }
    }
  }
)

export const config = {
  matcher: ['/showcase', '/showcase/:path*']
}
