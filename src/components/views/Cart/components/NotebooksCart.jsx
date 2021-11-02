import React from 'react'
import { CartRow, PriceText, PriceWrapper } from '../styles'
import { StyledCard } from '../../../shared/styled/StyledCard'
import { StyledText, StyledTitle } from '../../../shared/styled/Typography'
import { NotebookImage } from '../../Showcase/components/NotebookImage/NotebookImage'
import { getDiscountPriceStyled } from '../../../../utils/substractPercent'
import { ActionsWrapper } from '../../../shared/styled/PageTitleSection'
import { IconButton } from '../../../shared/styled/IconButton'
import { ReactComponent as Trash } from '../../../../assets/icons/trash.svg'

import { useSession } from '../../../../service/SessonDataService'
import { SpacerH10 } from '../../../shared/styled/Spacers'

export const NotebooksCart = ({ notebookCart, removeNotebook }) => {
  const { user } = useSession()

  return (
    <StyledCard>
      <StyledTitle>Ноутбуки</StyledTitle>
      <SpacerH10 />

      {notebookCart.map(notebook =>
        <CartRow key={notebook.serial_num}>
          <NotebookImage notebook={notebook} />

          <div>
            <StyledText>{notebook.mark_name}</StyledText>
            <p>{notebook.item_name}</p>
            <StyledText>{notebook.serial_num}</StyledText>
          </div>

          <PriceText>Цена: <PriceWrapper>{notebook.item_price} {getDiscountPriceStyled(user, notebook.item_price)}</PriceWrapper></PriceText>

          <ActionsWrapper>
            <IconButton onClick={() => removeNotebook(notebook)}>
              <Trash />
            </IconButton>
          </ActionsWrapper>
        </CartRow>)}
    </StyledCard>
  )
}
