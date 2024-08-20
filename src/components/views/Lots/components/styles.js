import styled from 'styled-components'
import { flexAlign, smallGap } from '../../../shared/styled/css'

export const DisplayCondWrapper = styled.div`
  ${flexAlign}
`
export const StyledLotRowWrapper = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.brand.gray};
  padding-bottom: 10px;
`
export const StyledLotRow = styled.div`
  display: grid;
  grid-template-columns: 0.02fr 0.2fr 0.1fr 0.08fr 0.3fr 0.15fr 0.05fr 0.1fr;
`

export const StyledLotSubRow = styled.div`
  display: grid;
  grid-template-columns: 0.02fr 0.2fr 0.78fr;
`

export const StyledSubRowTextWrapper = styled.div`
  ${flexAlign}
  ${smallGap}
`
