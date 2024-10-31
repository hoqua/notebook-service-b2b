import { withAuth } from 'next-auth/middleware'
import { stringToDate } from './libs/utils/format-date'
export default withAuth({
  callbacks: {
    authorized: ({ token }) => {
      if (token?.jwt?.auth_token) {
        console.log(token.jwt.auth_token)
        const expirationDate = stringToDate(token.jwt.token_exp_time)
        return expirationDate.getTime() > Date.now()
      }

      return false
    }
  },
  pages: {
    signIn: '/sign-in',
    error: "/sign-in?error='Ошибка входа'"
  }
})

export const config = {
  matcher: ['/showcase', '/showcase/:path*']
}
