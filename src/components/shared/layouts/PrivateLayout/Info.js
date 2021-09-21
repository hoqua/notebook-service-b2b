import React from 'react'
import { StyledText } from '../../styled/Typography'
import { ReactComponent as Phone } from '../../../../assets/icons/phone.svg'
import { PhoneTitle, StyledHeaderTitle } from './styles'
import { useSession } from '../../../../service/SessonDataService'

export default function Info () {
  const session = useSession()
  return (
    <>
      <div style={{ display: 'flex', columnGap: '30px' }}>
        <div>
          <StyledHeaderTitle>Курс</StyledHeaderTitle>
          <StyledText>{session?.exchangeRate?.currency_name} {session?.exchangeRate?.rate}</StyledText>
        </div>

        <div>
          <StyledHeaderTitle>Баланс</StyledHeaderTitle>
          <StyledText>{session?.user?.balance || 0} {session?.exchangeRate?.currency_name}</StyledText>
        </div>

        <div>
          {!session?.user?.active
            ? (
              <>
                <StyledHeaderTitle>
                  Для оформления заказа свяжитесь с менеджером
                </StyledHeaderTitle>
                <PhoneTitle><Phone />  063-454-4245</PhoneTitle>
              </>
              )
            : (
              <>
                <span style={{ display: 'flex', gap: '6px' }}>
                  <StyledText>Ваш менеджер:</StyledText><StyledHeaderTitle>{session.user.mngr_name}</StyledHeaderTitle>
                </span>
                <PhoneTitle st><Phone /> {session.user.mngr_phone}</PhoneTitle>
              </>
              )}

        </div>
      </div>
    </>
  )
}
