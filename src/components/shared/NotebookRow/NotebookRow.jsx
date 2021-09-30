import React, { useState } from 'react'
import { StyledText } from '../styled/Typography'
import {
  ExpandButton, LookoutBadge, NewNotebookBadge,
  NotebookRowItem,
  StyledNotebookRow,
  StyledNotebookRowWrapper,
  StyledShoppingCard
} from './styles'
import { NotebookRowDetails } from './NotebookRowDetails'
import { RotatedArrow } from '../styled/RotatedArrow'
import { useSession } from '../../../service/SessonDataService'
import { IconButton } from '../styled/IconButton'
import { getDiscountPriceStyled } from '../../../utils/substractPercent'
import { NotebookImageSlider } from './NotebookImageSlider/NotebookImageSlider'
import { NotebookPowerOn } from './NotebookPowerOn'
import { NotebookRowDisplayCond } from './NotebookRowDisplayCond'

export const NotebookRow = ({ notebook, onClick }) => {
  const [isExpand, setIsExpand] = useState(false)
  const { user } = useSession()

  return (
    <StyledNotebookRowWrapper>
      {!!notebook.is_new && <NewNotebookBadge>Новинка</NewNotebookBadge>}

      <StyledNotebookRow>
        <IconButton onClick={() => onClick(notebook)}>
          <StyledShoppingCard />
        </IconButton>

        <NotebookRowItem>
          <StyledText>{notebook.mark_name}</StyledText>
          <p>{notebook.item_name}</p>
          <StyledText>{notebook.serial_num}</StyledText>
        </NotebookRowItem>

        <NotebookImageSlider notebook={notebook} />

        <NotebookRowItem>
          {notebook.poweron
            ? <NotebookPowerOn powerOn={notebook.poweron} />
            : <StyledText>Вн. вид</StyledText>}
          <div>
            <LookoutBadge classKey={notebook.lookout}>{notebook.lookout}</LookoutBadge>
          </div>
        </NotebookRowItem>

        <NotebookRowItem>
          {notebook.display_cond
            ? <NotebookRowDisplayCond displayCondition={notebook.display_cond} title='Экран' />
            : <StyledText>Экран</StyledText>}
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
          <p>
            {notebook.item_price} {getDiscountPriceStyled(user, notebook.item_price)}
          </p>
        </NotebookRowItem>

        {isExpand && <NotebookRowDetails notebook={notebook} />}
      </StyledNotebookRow>

      <ExpandButton onClick={() => setIsExpand(!isExpand)}>
        <RotatedArrow deg={isExpand ? 0 : 180} />
      </ExpandButton>
    </StyledNotebookRowWrapper>
  )
}
