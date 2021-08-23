import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const NavigationButton = styled(Link)`
  font: inherit;
  text-decoration: none;

  color: white;
  background-color: ${({ theme }) => theme.brand.dark};
  padding: 12px 23px 12px 23px;
  border: 1px solid ${({ theme }) => theme.brand.dark};
  border-radius: 4px;

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
