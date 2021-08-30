import React from 'react'
import { StyledText } from '../../styled/Typography'
import Phone from '../../icons/Phone'
import { useTheme } from 'styled-components'
import { PhoneTitle, StyledHeaderTitle } from './styles'
import { SpacerW5 } from '../../styled/Spacers'

export default function Info () {
  const theme = useTheme()

  return (
    <>
      <div style={{ display: 'flex', columnGap: '30px' }}>
        <div>
          <StyledHeaderTitle>Курс</StyledHeaderTitle>
          <StyledText>100 USD</StyledText>
        </div>

        <div>
          <StyledHeaderTitle>Баланс</StyledHeaderTitle>
          <StyledText>100 USD</StyledText>
        </div>

        <div>
          <StyledHeaderTitle>Для оформления заказа свяжитесь с менеджером</StyledHeaderTitle>
          <PhoneTitle><Phone color={theme.brand.dark} /> <SpacerW5 /> 063-454-4245</PhoneTitle>
        </div>
      </div>
    </>
  )
}
