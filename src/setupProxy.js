const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://b2b.notebook-service.com.ua/',
      changeOrigin: true
    })
  )
  app.use(
    '/media',
    createProxyMiddleware({
      target: 'https://b2b.notebook-service.com.ua/',
      changeOrigin: true
    })
  )
}
