import React from 'react'
import { ReactComponent as Check } from '../../../assets/icons/check-mark.svg'
import { ReactComponent as Cross } from '../../../assets/icons/cross.svg'
import { ReactComponent as Question } from '../../../assets/icons/question-mark.svg'
import styled, { useTheme } from 'styled-components'
import { flexAlign, smallGap } from '../styled/css'
import { StyledText } from '../styled/Typography'

export const NotebookRowDisplayCond = ({ displayCondition, title }) => {
  const theme = useTheme()

  const getIconByCondition = (displayCondition) => {
    if (displayCondition === 'Хорошая') return <Cross stroke={theme.status.success} height='10px' />
    if (displayCondition === 'С дефектом') return <Check stroke={theme.status.warning} height='10px' />
    if (displayCondition === 'Под вопросом') return <Question stroke='#7547D1' fill='#7547D1' height='10px' />
    if (displayCondition === 'Плохая') return <Cross stroke={theme.status.error} height='10px' />
  }
  return <StyledWrapper>{getIconByCondition(displayCondition)} <StyledText>{title}</StyledText></StyledWrapper>
}

const StyledWrapper = styled.div`
  ${flexAlign}
  ${smallGap}
`
