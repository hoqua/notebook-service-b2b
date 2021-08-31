import React from 'react'
import Router from './router/Router'
import { ThemeProvider } from 'styled-components'
import { theme } from './styles/theme'
import { GlobalStyleReset } from './styles/cssReset'
import { Provider as HttpProvider } from 'use-http'
import SnackbarProvider from 'react-simple-snackbar'
import { ProvideAuth, useAuthProvidable } from './service/AuthService'

function App () {
  const auth = useAuthProvidable()

  return (
    <SnackbarProvider>
      <ProvideAuth auth={auth}>
        <HttpProvider url={auth.API} options={auth.options}>
          <ThemeProvider theme={theme}>
            <GlobalStyleReset />

            <Router />
          </ThemeProvider>
        </HttpProvider>
      </ProvideAuth>
    </SnackbarProvider>
  )
}

export default App
