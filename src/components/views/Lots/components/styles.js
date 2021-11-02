import styled from 'styled-components'
import { flexAlign, smallGap } from '../../../shared/styled/css'

export const DisplayCondWrapper = styled.div`
  ${flexAlign}
`
export const StyledLotRowWrapper = styled.div`
  border-bottom:  1px solid ${({ theme }) => theme.brand.gray};
  padding-bottom: 10px;
`
export const StyledLotRow = styled.div`
  display: grid;
  grid-template-columns: .02fr .2fr .1fr .08fr .3fr .15fr .05fr .1fr;
`

export const StyledLotSubRow = styled.div`
  display: grid;
  grid-template-columns: .02fr .2fr .78fr ;
`

export const StyledSubRowTextWrapper = styled.div`
  ${flexAlign}
  ${smallGap}
`
