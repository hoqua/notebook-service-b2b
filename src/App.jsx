import React from 'react'
import Router from './router/Router'
import { ThemeProvider } from 'styled-components'
import { theme } from './styles/theme'
import { GlobalStyleReset } from './styles/cssReset'
import { Provider as HttpProvider } from 'use-http'
import SnackbarProvider from 'react-simple-snackbar'
import { ProvideAuth, useAuthProvidable } from './service/AuthService'

const API = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/api' : 'https://oborot.in/nbs/api/'

function App () {
  const auth = useAuthProvidable()

  return (
    <SnackbarProvider>
      <ProvideAuth auth={auth}>
        <HttpProvider url={API} options={auth.options}>
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
