import styled from 'styled-components'
import { mediumGap, smallGap } from '../../shared/styled/css'

export const LotsGrid = styled.div`
  display: grid;
`

export const StyledCheckoutWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 20px;
  ${mediumGap};
`

export const StyledPriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  ${smallGap}
`
