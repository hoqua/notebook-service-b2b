import React from 'react'
import { ProvideAuth, useProvideAuth } from './hooks/auth'
import Router from './router/Router'
import { ThemeProvider } from 'styled-components'
import { theme } from './styles/theme'
import { GlobalStyleReset } from './styles/cssReset'
import { Provider as HttpProvider } from 'use-http'
import SnackbarProvider from 'react-simple-snackbar'

const API = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/api' : 'https://oborot.in/nbs/api/'

function App () {
  const auth = useProvideAuth()

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
