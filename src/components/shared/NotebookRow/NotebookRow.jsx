import React, { useState } from 'react'
import { StyledTopNavLink } from '../styled/StyledNavLink'
import { ReactComponent as ShoppingCart } from '../../../assets/icons/shoping-cart.svg'
import { StyledText } from '../styled/Typography'
import notebookPlaceholder from '../../../assets/img/notebook-placeholder.png'
import { useTheme } from 'styled-components'
import { ExpandButton, NotebookRowItem, StyledNotebookRow, StyledNotebookRowWrapper } from './styles'
import { NotebookRowDetails } from './NotebookRowDetails'
import { ReactComponent as ArrowDown } from '../../../assets/icons/arrow-down.svg'
import { ReactComponent as ArrowUp } from '../../../assets/icons/arrow-up.svg'

export const NotebookRow = ({ notebook, onClick }) => {
  const theme = useTheme()
  const [isExpand, setIsExpand] = useState(false)
  return (
    <StyledNotebookRowWrapper>
      <StyledNotebookRow>
        <StyledTopNavLink to='#' color={theme.brand.dark} onClick={() => onClick(notebook.item_id)}>
          <ShoppingCart />
        </StyledTopNavLink>

        <NotebookRowItem>
          <StyledText>{notebook.mark_name}</StyledText>
          <p>{notebook.item_name}</p>
          <StyledText>{notebook.item_id}</StyledText>
        </NotebookRowItem>

        <img src={notebookPlaceholder} alt='notebook placeholder' />

        <NotebookRowItem>
          <StyledText>Вн. вид</StyledText>
          <StyledText>{notebook.lookuot}</StyledText>
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
      </StyledNotebookRow>

      {isExpand && <NotebookRowDetails notebook={notebook} />}
      <ExpandButton onClick={() => setIsExpand(!isExpand)}>
        {isExpand ? <ArrowUp /> : <ArrowDown />}
      </ExpandButton>
    </StyledNotebookRowWrapper>
  )
}
