import styled from 'styled-components'
import { flexAlignJustify, grayBorder } from './css'

export const IconButton = styled.button`
  ${flexAlignJustify};
  background: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  padding: 8px;
  ${grayBorder}

  &:hover{
    background-color: ${({ theme }) => theme.brand.gray};
  }
`

export const RoundButton = styled(IconButton)`
  border-radius: 50%;
`
