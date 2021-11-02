import styled from 'styled-components'
import { flexAlign, flexAlignJustify, mediumGap, smallGap } from '../../../shared/styled/css'
import { SmallerText } from '../../../shared/styled/Typography'

export const ManagerCardWrapper = styled.div`
  ${flexAlignJustify}
`

export const TextWithIcon = styled(SmallerText)`
  ${smallGap}
  ${flexAlign}
`

export const SmallerTextCenter = styled(SmallerText)`
  text-align: center;
`

export const SmallerTextBold = styled(SmallerText)`
  font-weight: 500;
`

export const StyledOrderRow = styled.div`
  display: grid;
  grid-template-columns: .15fr .15fr .4fr .1fr .1fr .1fr;
  align-items: center;
  ${mediumGap};
`

export const StyledOrderNumber = styled.p`
  color: ${({ theme }) => theme.brand.dark};
  font-size: 1rem;
`
