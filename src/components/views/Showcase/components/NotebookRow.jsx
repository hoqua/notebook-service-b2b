import React, { useState } from 'react'
import { StyledText } from '../../../shared/styled/Typography'
import { LookoutBadge, NewNotebookBadge, StyledNotebookRow } from './styles'
import { NotebookRowDetails } from './NotebookRowDetails'
import { useSession } from '../../../../service/SessonDataService'
import { getDiscountPriceStyled } from '../../../../utils/substractPercent'
import { NotebookImageOrSlider } from './NotebookImageOrSlider/NotebookImageOrSlider'
import { NotebookPowerOn } from './NotebookPowerOn'
import { NotebookRowDisplayCond } from './NotebookRowDisplayCond'
import { ExpandButton } from '../../../shared/ExpandButton/ExpandButton'
import { RowItem } from '../../../shared/RowItem/RowItem'
import { ShoppingCartButton } from '../../../shared/ShoppingCartButton/ShoppingCartButton'
import { IfAble, USER_ACTION } from '../../../../permissions/permissions'

export const NotebookRow = ({ notebook, onClick }) => {
  const [isExpand, setIsExpand] = useState(false)
  const { user, exchangeRate } = useSession()

  const priceInUAH = Math.floor(notebook.item_price * exchangeRate.rate)

  return (
    <StyledNotebookRow>
      {!!notebook.is_new && <NewNotebookBadge>Новинка</NewNotebookBadge>}

      <IfAble toDo={[USER_ACTION.DO_ORDER]} errorComponent={<div />}>
        <ShoppingCartButton onClick={() => onClick(notebook)} />
      </IfAble>

      <RowItem title={notebook.mark_name}>
        <p>{notebook.item_name}</p>
        <StyledText>{notebook.serial_num}</StyledText>
      </RowItem>

      <NotebookImageOrSlider notebook={notebook} />

      <RowItem
        title={
          notebook.poweron ? (
            <NotebookPowerOn powerOn={notebook.poweron} />
          ) : (
            'Вн. вид'
          )
        }
      >
        <LookoutBadge $classKey={notebook.lookout}>
          {notebook.lookout}
        </LookoutBadge>
      </RowItem>

      <RowItem
        title={
          notebook.display_cond ? (
            <NotebookRowDisplayCond
              displayCondition={notebook.display_cond}
              title="Экран"
            />
          ) : (
            'Экран'
          )
        }
      >
        <p>{notebook.display}</p>
      </RowItem>

      <RowItem title="Процессор">
        <p>{notebook.proc}</p>
      </RowItem>

      <RowItem title="Видеокарта">
        <p>{notebook.video || notebook.integ_video}</p>
      </RowItem>

      <RowItem title="Ram">
        <p>{notebook.ram}</p>
      </RowItem>

      <RowItem title="Накопитель">
        <p>{notebook.hdd}</p>
      </RowItem>

      <RowItem title="Цена (опт.)">
        <p>
          {notebook.item_price} USD
          {getDiscountPriceStyled(user, notebook.item_price)}
        </p>
        <p>{priceInUAH} UAH</p>
      </RowItem>

      {isExpand && <NotebookRowDetails notebook={notebook} />}

      <ExpandButton
        isExpand={isExpand}
        onClick={() => setIsExpand(!isExpand)}
      />
    </StyledNotebookRow>
  )
}
