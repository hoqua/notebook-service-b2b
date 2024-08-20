import { StyledCard } from '../../styled/StyledCard'
import { StyledText } from '../../styled/Typography'
import React from 'react'
import { SadEmoji } from '../../styled/SadEmoji'

export const ErrorNotActiveUser = () => {
  return (
    <StyledCard>
      <StyledText>
        <SadEmoji /> Функционал не пока не доступен. Менеджер должен подтвердить
        ваши данные.
      </StyledText>
    </StyledCard>
  )
}
