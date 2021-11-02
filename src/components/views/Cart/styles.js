import styled from 'styled-components'
import { flexAlignJustify, largeGap } from '../../shared/styled/css'

export const CartWrapper = styled.div`
  display: grid;
  grid-template-columns: .7fr .3fr;
  ${largeGap}
`

export const CartRow = styled.div`
  display: grid;
  grid-template-columns: .2fr .4fr .2fr .2fr;
  align-items: center;
  align-content: center;
  padding-top: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid ${({ theme }) => theme.brand.gray};

  ${largeGap}
  &:last-of-type {
    border-bottom: none;
  }
`

export const ActionsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`

export const PriceText = styled.p`
  display: flex;
  justify-content: space-between;
  font-size: .9rem;
`

export const PriceWrapper = styled.span`
  font-weight: 500;
`

export const ActionWrapper = styled.div`
  ${flexAlignJustify}
`
