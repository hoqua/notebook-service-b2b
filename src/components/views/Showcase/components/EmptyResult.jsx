import { StyledCard } from '../../../shared/styled/StyledCard'
import { StyledText } from '../../../shared/styled/Typography'
import React from 'react'

export const EmptyResult = () => {
  return (
    <StyledCard>
      <StyledText>По вашему запросу ничего не найдено.</StyledText>
    </StyledCard>
  )
}
