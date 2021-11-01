import styled from 'styled-components'
import { flexAlign } from '../../../shared/styled/css'

export const DisplayCondWrapper = styled.div`
  ${flexAlign}
`

export const StyledLotRow = styled.div`
  display: grid;
  grid-template-columns: .02fr .2fr .1fr .08fr .3fr .15fr .05fr .1fr;
  align-items: center;
  border-bottom:  1px solid ${({ theme }) => theme.brand.gray};
  padding-top: 5px;
  padding-bottom: 5px;
`
