import styled from 'styled-components'
import { flexAlign, flexAlignJustify, mediumGap, smallGap } from '../../../shared/styled/css'
import { SmallerText } from '../../../shared/styled/Typography'
import { StyledCard } from '../../../shared/styled/StyledCard'

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

export const StyledOrderRow = styled(StyledCard)`
  display: grid;
  grid-template-columns: .2fr .2fr .2fr .1fr .1fr .2fr;
  align-items: center;
  ${mediumGap};
`

export const StyledOrderRowItem = styled.div`
  height: 100%;
`
export const StyledOrderNumber = styled.p`
  color: ${({ theme }) => theme.brand.dark};
  font-size: 1rem;
`
