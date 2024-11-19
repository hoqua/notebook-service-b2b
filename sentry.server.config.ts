import * as Sentry from '@sentry/nextjs'
import { SENTRY_DSN } from './libs/constants/constants'

Sentry.init({
  dsn: SENTRY_DSN,
  tracesSampleRate: 1,
  debug: false
})
