import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const HeadTile = styled.h1`
  font-size: 1.5rem;
  `
export const StyledText = styled.p`
  color: #818895;
  font-size: .8rem;
`
export const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.brand.dark};
  font-size: .8rem;
`
