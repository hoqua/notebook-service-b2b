import React from 'react'
import Router from './router/Router'
import { ThemeProvider } from 'styled-components'
import { theme } from './styles/theme'
import { GlobalStyleReset } from './styles/cssReset'
import { Provider as HttpProvider } from 'use-http'
import { ProvideAuth, useAuthProvidable } from './service/AuthService'
import { Toaster } from './components/shared/Toaster/toaster'

function App() {
  const auth = useAuthProvidable()

  return (
    <ProvideAuth auth={auth}>
      <HttpProvider url={auth.API_ROOT} options={auth.options}>
        <ThemeProvider theme={theme}>
          <GlobalStyleReset />

          <Router />
          <Toaster />
        </ThemeProvider>
      </HttpProvider>
    </ProvideAuth>
  )
}

export default App
