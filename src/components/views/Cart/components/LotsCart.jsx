import React from 'react'
import { StyledTitle } from '../../../shared/styled/Typography'
import { SpacerH10 } from '../../../shared/styled/Spacers'
import { StyledCard } from '../../../shared/styled/StyledCard'
import { CartRow, PriceText, PriceWrapper } from '../styles'
import { ActionsWrapper } from '../../../shared/styled/PageTitleSection'
import { IconButton } from '../../../shared/styled/IconButton'
import { ReactComponent as Trash } from '../../../../assets/icons/trash.svg'

export const LotsCart = ({ lotsCart, removeLot }) => {
  return (
    <StyledCard>
      <StyledTitle>Лоты</StyledTitle>
      <SpacerH10 />
      {lotsCart.map(lot =>
        <CartRow key={lot.lot_name}>

          <p>{lot.lot_name}</p>

          <div />

          <PriceText>Цена: <PriceWrapper>{lot.lot_sum}</PriceWrapper></PriceText>

          <ActionsWrapper>
            <IconButton onClick={() => removeLot(lot)}>
              <Trash />
            </IconButton>
          </ActionsWrapper>
        </CartRow>)}
    </StyledCard>
  )
}
