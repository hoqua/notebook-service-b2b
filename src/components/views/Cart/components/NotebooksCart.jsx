import React, { useEffect } from 'react'
import { CartRow, PriceText, PriceWrapper } from '../styles'
import { StyledCard } from '../../../shared/styled/StyledCard'
import { StyledText, StyledTitle } from '../../../shared/styled/Typography'
import { NotebookImage } from '../../Showcase/components/NotebookImage/NotebookImage'
import { getDiscountPriceStyled } from '../../../../utils/substractPercent'
import { ActionsWrapper } from '../../../shared/styled/PageTitleSection'
import { IconButton } from '../../../shared/styled/IconButton'
import { ReactComponent as Trash } from '../../../../assets/icons/trash.svg'
import { getNotebookPriceSum, getSumCounts } from '../service'
import { useNotify } from '../../../../hooks/useSnakbar'
import { useSession } from '../../../../service/SessonDataService'
import { SpacerH10 } from '../../../shared/styled/Spacers'

export const NotebooksCart = ({ fetchedNotebooks, notebookCart, removeNotebook, updateNotebooksCart }) => {
  const { user } = useSession()
  const { showError } = useNotify()
  const { currentSum } = getSumCounts(notebookCart, user)

  useEffect(() => {
    if (!fetchedNotebooks) return

    if (notebookCart.length > fetchedNotebooks.length) {
      showError('Некоторые ноутбуки больше не доступны и были удалены из корзины.')
    } else if (currentSum !== getNotebookPriceSum(fetchedNotebooks)) {
      showError('Цена товаров была изменена.')
    }
    updateNotebooksCart()
  }, [fetchedNotebooks])

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
