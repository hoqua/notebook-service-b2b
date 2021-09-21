import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'
import { darkBorder } from './css'

const buttonCss = css`
  font: inherit;
  text-decoration: none;
  text-align: center;
  line-height: 1rem;

  ${darkBorder};

  color: white;
  background-color: ${({ theme }) => theme.brand.dark};
  padding: 10px 23px 10px 23px;
  transition: all 0.3s ease;
  transition-property: background-color, color, border-color;

  ${({ disabled, theme }) => disabled
          ? `border-color: #D7D7D7;
   background-color: #D7D7D7;
   color: #ACACAC;`
          : `&:hover {
     background-color: white;
     cursor: pointer;
     color: ${theme.brand.dark};
   }`
  }
`

export const NavigationButton = styled(Link)`
  ${buttonCss}
`

export const AppButton = styled.button`
  ${buttonCss}
`
