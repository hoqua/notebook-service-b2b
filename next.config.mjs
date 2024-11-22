/** @type {import('next').NextConfig} */

import { withSentryConfig } from '@sentry/nextjs'

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.notebook-service.com.ua'
      }
    ]
  },
  async rewrites() {
    return [
      {
        source: '/service/:path*',
        destination: process.env['API_URL'] + '/:path*'
      },
      {
        source: '/media/:path*',
        destination: process.env['NEXT_PUBLIC_MEDIA_URL'] + '/:path*'
      }
    ]
  }
}

export default withSentryConfig(nextConfig, {
  silent: true,
  org: 'notebook-service-0v',
  project: 'notebook-service-0v',
  authToken: process.env['SENTRY_AUTH_TOKEN'],
  widenClientFileUpload: true,
  hideSourceMaps: true,
  disableLogger: true,
  automaticVercelMonitors: true,
  __SENTRY_DEBUG__: true
})
