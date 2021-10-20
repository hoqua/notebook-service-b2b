import { StyledCard } from '../styled/StyledCard'
import { StyledText } from '../styled/Typography'
import React from 'react'

export const EmptyResult = () => {
  return (
    <StyledCard>
      <StyledText>По вашему запросу ничего не найдено.</StyledText>
    </StyledCard>
  )
}
