import styled from 'styled-components'
import { flexAlign, flexAlignJustify, smallGap } from '../../../shared/styled/css'
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
