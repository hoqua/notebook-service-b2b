import React from 'react'
import { ProvideAuth } from './hooks/auth'
import Router from './router/Router'
import { ThemeProvider } from 'styled-components'
import { theme } from './styles/theme'
import { GlobalStyleReset } from './styles/cssReset'
import { Provider as HttpProvider } from 'use-http'
import { useAuthOptions } from './service/Auth'
import SnackbarProvider from 'react-simple-snackbar'

const API = 'https://oborot.in/nbs/api/'

function App () {
  const options = useAuthOptions()

  return (
    <SnackbarProvider>

      <ProvideAuth>
        <HttpProvider url={API} options={options}>

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
