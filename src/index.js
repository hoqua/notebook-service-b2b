import React from 'react'
import * as Sentry from '@sentry/react'
import App from './App'
import { SENTRY_DSN } from './constants/constants'
import { createRoot } from 'react-dom/client'
import './index.css'

Sentry.init({
  dsn: SENTRY_DSN,
  integrations: [Sentry.browserTracingIntegration()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0
})

const root = createRoot(document.getElementById('root'))

root.render(<App />)
