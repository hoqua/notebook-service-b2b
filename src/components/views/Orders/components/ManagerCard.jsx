import React from 'react'
import { ManagerCardWrapper, SmallerTextBold, SmallerTextCenter, TextWithIcon } from './styles'
import { ReactComponent as Phone } from '../../../../assets/icons/phone.svg'
import { ReactComponent as Telegram } from '../../../../assets/icons/telegram.svg'
import { ReactComponent as Viber } from '../../../../assets/icons/viber.svg'
import { SpacerH10, SpacerH5 } from '../../../shared/styled/Spacers'
import { StyledCard } from '../../../shared/styled/StyledCard'

export const ManagerCard = ({ manager }) => {
  return (
    <StyledCard>
      <ManagerCardWrapper>
        <div>
          <SmallerTextCenter>Ваш менеджер</SmallerTextCenter>
          <SpacerH5 />
          <SmallerTextBold>{manager?.mngr_name}</SmallerTextBold>
          <SpacerH10 />

          {manager?.mngr_phone &&
            <>
              <TextWithIcon><Phone /> {manager.mngr_phone}</TextWithIcon>
              <SpacerH10 />
            </>}

          {manager?.mngr_telegram &&
            <>
              <TextWithIcon><Telegram /> {manager.mngr_telegram}</TextWithIcon>
              <SpacerH10 />
            </>}

          {manager?.mngr_viber && <TextWithIcon><Viber /> {manager.mngr_viber}</TextWithIcon>}
        </div>
      </ManagerCardWrapper>
    </StyledCard>
  )
}
