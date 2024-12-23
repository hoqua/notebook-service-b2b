import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'
export default withAuth(
  async function middleware(req) {
    const token = req.nextauth?.token
    const baseUrl = req.nextUrl.origin
    if (!token || token.expired) {
      return NextResponse.redirect(`${baseUrl}/sign-in`)
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
