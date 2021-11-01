import React, { useState } from 'react'
import { StyledText } from '../../../shared/styled/Typography'
import {
  LookoutBadge,
  NewNotebookBadge,
  StyledNotebookRow
} from './styles'
import { NotebookRowDetails } from './NotebookRowDetails'
import { useSession } from '../../../../service/SessonDataService'
import { getDiscountPriceStyled } from '../../../../utils/substractPercent'
import { NotebookImageOrSlider } from './NotebookImageOrSlider/NotebookImageOrSlider'
import { NotebookPowerOn } from './NotebookPowerOn'
import { NotebookRowDisplayCond } from './NotebookRowDisplayCond'
import { ExpandButton } from '../../../shared/ExpandButton/ExpandButton'
import { RowItem } from '../../../shared/RowItem/RowItem'
import { ShoppingCartButton } from '../../../shared/ShoppingCartButton/ShoppingCartButton'

export const NotebookRow = ({ notebook, onClick }) => {
  const [isExpand, setIsExpand] = useState(false)
  const { user } = useSession()

  return (
    <StyledNotebookRow>

      {!!notebook.is_new && <NewNotebookBadge>Новинка</NewNotebookBadge>}

      <ShoppingCartButton onClick={() => onClick(notebook)} />

      <RowItem title={notebook.mark_name}>
        <p>{notebook.item_name}</p>
        <StyledText>{notebook.serial_num}</StyledText>
      </RowItem>

      <NotebookImageOrSlider notebook={notebook} />

      <RowItem
        title={notebook.poweron ? <NotebookPowerOn powerOn={notebook.poweron} /> : 'Вн. вид'}
      >
        <LookoutBadge classKey={notebook.lookout}>{notebook.lookout}</LookoutBadge>
      </RowItem>

      <RowItem
        title={notebook.display_cond
          ? <NotebookRowDisplayCond displayCondition={notebook.display_cond} title='Экран' />
          : 'Экран'}
      >
        <p>{notebook.display}</p>
      </RowItem>

      <RowItem title='Процессор'>
        <p>{notebook.proc}</p>
      </RowItem>

      <RowItem title='Видеокарта'>
        <p>{notebook.video || notebook.integ_video}</p>
      </RowItem>

      <RowItem title='Ram'>
        <p>{notebook.ram}</p>
      </RowItem>

      <RowItem title='Накопитель'>
        <p>{notebook.hdd}</p>
      </RowItem>

      <RowItem title='Цена (опт.)'>
        <p>
          {notebook.item_price} {getDiscountPriceStyled(user, notebook.item_price)}
        </p>
      </RowItem>

      {isExpand && <NotebookRowDetails notebook={notebook} />}

      <ExpandButton isExpand={isExpand} onClick={() => setIsExpand(!isExpand)} />

    </StyledNotebookRow>

  )
}
