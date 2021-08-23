import { createGlobalStyle } from 'styled-components'

export const GlobalStyleReset = createGlobalStyle`
  
  html {
    box-sizing: border-box;
    font-size: 16px;
  }
  
  body, h1, h2, h3, h4, h5, h6, p, ol, ul, button, input {
    color: ${({ theme }) => theme.typography.main};
    margin: 0;
    padding: 0;
    font-weight: normal;
    font-family: 'Ubuntu', sans-serif;
  }

  ol, ul {
    list-style: none;
  }

  img {
    max-width: 100%;
    height: auto;
  }
`
