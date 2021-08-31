import React from 'react'
import { StyledText } from '../../styled/Typography'
import { ReactComponent as Phone } from '../../../../assets/icons/phone.svg'
import { PhoneTitle, StyledHeaderTitle } from './styles'

export default function Info () {
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
          <PhoneTitle><Phone />  063-454-4245</PhoneTitle>
        </div>
      </div>
    </>
  )
}
