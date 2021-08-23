import React from 'react'
import { ProvideAuth } from './hooks/auth'
import Router from './router/Router'
import { ThemeProvider } from 'styled-components'
import { theme } from './styles/theme'
import { GlobalStyleReset } from './styles/cssReset'

function App () {
  return (
    <ProvideAuth>
      <GlobalStyleReset />
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
    </ProvideAuth>
  )
}

export default App
