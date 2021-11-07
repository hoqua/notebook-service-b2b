import styled from 'styled-components'
import { flexAlign, flexAlignJustify, fullPage, largeGap, scrollFix, smallGap, Z_INDEX } from '../../styled/css'
export const StyledHeaderTitle = styled.p`
  font-size: 0.9rem;
  font-weight: 500;
  line-height: 1rem;
`

export const PhoneTitle = styled(StyledHeaderTitle)`
  ${flexAlign};
  ${smallGap};
`

export const StyledHeader = styled.header`
  width: 100%;
  position: fixed;
  display: flex;
  justify-content: center;
  height: 62px;
  background-color: #fff;
  box-shadow: 0 3px 20px rgba(17, 40, 120, 0.07);
  z-index: ${Z_INDEX.header};
  ${scrollFix}
`

export const InnerHeaderContainer = styled.header`
  max-width: 1170px;
  ${fullPage};
  ${flexAlignJustify};
  justify-content: space-between;
`

export const StyledPhoneWrapper = styled.span`
  display: flex;
  ${smallGap}
`

export const StyledHeaderInfoWrapper = styled.div`
  display: flex;
  ${largeGap}
`
