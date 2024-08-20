import React from 'react'
import { StyledText } from '../../styled/Typography'
import { ReactComponent as Phone } from '../../../../assets/icons/phone.svg'
import {
  PhoneTitle,
  StyledHeaderInfoWrapper,
  StyledHeaderTitle,
  StyledPhoneWrapper
} from './styles'
import { useSession } from '../../../../service/SessonDataService'
import { NOT_ACTIVE_PHONE } from '../../../../constants/constants'
import { SpacerH5 } from '../../styled/Spacers'

export default function Info() {
  const session = useSession()
  const isUserActive = !!session?.user?.active

  return (
    <StyledHeaderInfoWrapper>
      <div>
        <StyledHeaderTitle>Курс</StyledHeaderTitle>
        <SpacerH5 />
        <StyledText>
          {session?.exchangeRate?.currency_name} {session?.exchangeRate?.rate}
        </StyledText>
      </div>

      <div>
        <StyledHeaderTitle>Баланс</StyledHeaderTitle>
        <SpacerH5 />
        <StyledText>
          {session?.user?.balance || 0} {session?.exchangeRate?.currency_name}
        </StyledText>
      </div>

      <div>
        <StyledPhoneWrapper>
          {isUserActive ? (
            <>
              <StyledText>Ваш менеджер:</StyledText>
              <StyledHeaderTitle>{session.user.mngr_name}</StyledHeaderTitle>
            </>
          ) : (
            <StyledHeaderTitle>
              Для оформления заказа свяжитесь с менеджером
            </StyledHeaderTitle>
          )}
        </StyledPhoneWrapper>

        <SpacerH5 />

        <PhoneTitle>
          <Phone /> {isUserActive ? session.user.mngr_phone : NOT_ACTIVE_PHONE}
        </PhoneTitle>
      </div>
    </StyledHeaderInfoWrapper>
  )
}
