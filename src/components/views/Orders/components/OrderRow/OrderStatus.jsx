import React from 'react'
import { SpacerH5 } from '../../../../shared/styled/Spacers'
import styled from 'styled-components'
import { flexAlign, smallGap } from '../../../../shared/styled/css'
import { ReactComponent as Check } from '../../../../../assets/icons/check-mark.svg'
import { ReactComponent as Loader } from '../../../../../assets/icons/loader.svg'

export const OrderStatus = ({ satus }) => {
  return (
    <>
      {satus
        ? <StyledWrapper> <StyledCheck /> Выполнен </StyledWrapper>
        : <StyledWrapper> <Loader /> В обработке</StyledWrapper>}
      <SpacerH5 />
    </>
  )
}

const StyledWrapper = styled.p`
  ${flexAlign}
  ${smallGap}
`

const StyledCheck = styled(Check)`
  stroke:  ${({ theme }) => theme.status.success};
  height: 10px;
`
