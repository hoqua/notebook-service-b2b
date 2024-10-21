import { withAuth } from 'next-auth/middleware'

export default withAuth({
  callbacks: {
    authorized: ({ token }) => !!token
  },
  pages: {
    signIn: '/sign-in',
    error: "/sign-in?error='Ошибка входа'"
  }
})

export const config = {
  matcher: ['/showcase', '/showcase/:path*']
}
