import React from 'react'
import { ReactComponent as Cross } from '../../../../assets/icons/cross.svg'
import { ReactComponent as Check } from '../../../../assets/icons/check-mark.svg'
import styled from 'styled-components'
import { flexAlign, smallGap } from '../../../shared/styled/css'

export const NotebookPowerOn = ({ powerOn, $big = false }) => {
  const isPowerOn = powerOn === 'Да'

  return isPowerOn ? (
    <StyledWrapper $big={$big}>
      {' '}
      <StyledCheck title="Ноутбук включается, показывает изображение" /> Рабочий{' '}
    </StyledWrapper>
  ) : (
    <StyledWrapper $big={$big}>
      {' '}
      <StyledCross title="Ноутбук не включается или не показывает картинку" />{' '}
      Не вкл-ся{' '}
    </StyledWrapper>
  )
}

const StyledWrapper = styled.span`
  color: ${({ theme, $big }) =>
    $big ? theme.typography.main : theme.typography.light};
  font-size: ${({ $big }) => ($big ? '1' : '.8')}rem;
  ${flexAlign}
  ${smallGap}
`

const StyledCheck = styled(Check)`
  cursor: pointer;
  stroke: ${({ theme }) => theme.status.success};
  height: 10px;
`

const StyledCross = styled(Cross)`
  cursor: pointer;
  stroke: ${({ theme }) => theme.status.error};
  height: 10px;
`
