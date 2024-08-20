import React from 'react'
import { StyledCard } from '../../../shared/styled/StyledCard'
import { StyledLink, StyledText } from '../../../shared/styled/Typography'
import { SadEmoji } from '../../../shared/styled/SadEmoji'

export const EmptyCartPlaceholder = () => {
  return (
    <StyledCard>
      <StyledText>
        <SadEmoji /> Вы еще ничего не выбрали.{' '}
        <StyledLink to="/">Вернуться на главную</StyledLink>
      </StyledText>
    </StyledCard>
  )
}
