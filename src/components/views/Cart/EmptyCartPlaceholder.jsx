import React from 'react'
import { StyledCard } from '../../shared/styled/StyledCard'
import { StyledLink, StyledText } from '../../shared/styled/Typography'

export const EmptyCartPlaceholder = () => {
  return (
    <StyledCard>
      <StyledText>Вы еще ничего не выбрали. <StyledLink to='/'>Вернуться на главную</StyledLink></StyledText>
    </StyledCard>
  )
}
