import React, { useState } from 'react'
import { StyledText } from '../styled/Typography'
import notebookPlaceholder from '../../../assets/img/notebook-placeholder.png'
import {
  CartButton,
  ExpandButton, LookoutBadge, NewNotebookBadge,
  NotebookRowItem,
  StyledNotebookRow,
  StyledNotebookRowWrapper,
  StyledShoppingCard
} from './styles'
import { NotebookRowDetails } from './NotebookRowDetails'
import { RotatedArrow } from '../styled/RotatedArrow'

export const NotebookRow = ({ notebook, onClick }) => {
  const [isExpand, setIsExpand] = useState(false)

  return (
    <StyledNotebookRowWrapper>
      {!!notebook.is_new && <NewNotebookBadge>Новинка</NewNotebookBadge>}

      <StyledNotebookRow>
        <CartButton onClick={() => onClick(notebook)}>
          <StyledShoppingCard />
        </CartButton>

        <NotebookRowItem>
          <StyledText>{notebook.mark_name}</StyledText>
          <p>{notebook.item_name}</p>
          <StyledText>{notebook.serial_num}</StyledText>
        </NotebookRowItem>

        <img src={notebookPlaceholder} alt='notebook placeholder' />

        <NotebookRowItem>
          <StyledText>Вн. вид</StyledText>
          <div>
            <LookoutBadge classKey={notebook.lookout}>{notebook.lookout}</LookoutBadge>
          </div>
        </NotebookRowItem>

        <NotebookRowItem>
          <StyledText>Экран</StyledText>
          <p>{notebook.display}</p>
        </NotebookRowItem>

        <NotebookRowItem>
          <StyledText>Процессор</StyledText>
          <p>{notebook.proc}</p>
        </NotebookRowItem>

        <NotebookRowItem>
          <StyledText>Видеокарта</StyledText>
          <p>{notebook.video || notebook.integ_video}</p>
        </NotebookRowItem>

        <NotebookRowItem>
          <StyledText>Ram</StyledText>
          <p>{notebook.ram}</p>
        </NotebookRowItem>

        <NotebookRowItem>
          <StyledText>Накопитель</StyledText>
          <p>{notebook.hdd}</p>
        </NotebookRowItem>

        <NotebookRowItem>
          <StyledText>Цена (опт.)</StyledText>
          <p>{notebook.item_price}</p>
        </NotebookRowItem>

        {isExpand && <NotebookRowDetails notebook={notebook} />}
      </StyledNotebookRow>

      <ExpandButton onClick={() => setIsExpand(!isExpand)}>
        <RotatedArrow deg={isExpand ? 0 : 180} />
      </ExpandButton>
    </StyledNotebookRowWrapper>
  )
}
