import { StyledCard } from '../styled/StyledCard'
import { StyledText } from '../styled/Typography'
import React from 'react'
import { SadEmoji } from '../styled/SadEmoji'

export const EmptyResult = () => {
  return (
    <StyledCard>
      <StyledText><SadEmoji /> Ничего не найдено.</StyledText>
    </StyledCard>
  )
}
