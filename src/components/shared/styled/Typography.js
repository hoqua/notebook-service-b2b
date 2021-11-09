import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { darkColor } from './css'

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
  font-size: .9rem;
  ${darkColor};
`

export const StyledTitle = styled.p`
  font-size: 1rem;
  font-weight: 500;
  line-height: 1rem;
`

export const SmallerText = styled.p`
  font-size: .8rem;
`
