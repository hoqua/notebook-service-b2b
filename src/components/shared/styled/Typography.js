import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const HeadTile = styled.h1`
  font-size: 1.5rem;
  font-weight: 500;
  `
export const StyledText = styled.p`
  color: ${({ theme }) => theme.typography.light};
  font-size: .8rem;
`
export const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.brand.dark};
  font-size: .8rem;
`
