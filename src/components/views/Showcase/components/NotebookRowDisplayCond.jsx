import React from 'react'
import { ReactComponent as Check } from '../../../../assets/icons/check-mark.svg'
import { ReactComponent as Cross } from '../../../../assets/icons/cross.svg'
import { ReactComponent as Question } from '../../../../assets/icons/question-mark.svg'
import styled, { useTheme } from 'styled-components'
import { flexAlign, smallGap } from '../../../shared/styled/css'
import { StyledText } from '../../../shared/styled/Typography'
import { DisplayConditions } from '../../../../constants/constants'

export const NotebookRowDisplayCond = ({ displayCondition, title }) => {
  const theme = useTheme()

  return (
    <StyledWrapper>
      {iconConditionMap[displayCondition](theme)}
      <StyledText>{title}</StyledText>
    </StyledWrapper>
  )
}

const iconConditionMap = {
  [DisplayConditions.Good]: (theme) => <CheckGreen theme={theme} />,
  [DisplayConditions.Defective]: (theme) => <CheckOrange theme={theme} />,
  [DisplayConditions.Questionable]: () => <QuestionMark />,
  [DisplayConditions.Bad]: (theme) => <CrossRed theme={theme} />
}

const CheckGreen = ({ theme }) => <Check stroke={theme.status.success} title='Рабочее состояние' style={iconStyles} />
const CheckOrange = ({ theme }) => <Check stroke={theme.status.warning} title='Показывает но есть дефекты в виде полос или засветов' style={iconStyles} />
const QuestionMark = () => <Question stroke='#7547D1' fill='#7547D1' title='Нет возможности проверить, без видимых дефектов' style={iconStyles} />
const CrossRed = ({ theme }) => <Cross stroke={theme.status.error} title='Разбит или отсутствует' style={iconStyles} />

const iconStyles = {
  height: '10px',
  cursor: 'pointer'
}

const StyledWrapper = styled.div`
  ${flexAlign}
  ${smallGap}
`
