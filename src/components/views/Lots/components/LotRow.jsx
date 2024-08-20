import React from 'react'
import { RowItem } from '../../../shared/RowItem/RowItem'
import { NotebookPowerOn } from '../../Showcase/components/NotebookPowerOn'
import { NotebookRowDisplayCond } from '../../Showcase/components/NotebookRowDisplayCond'
import {
  DisplayCondWrapper,
  StyledLotRow,
  StyledLotRowWrapper,
  StyledLotSubRow,
  StyledSubRowTextWrapper
} from './styles'
import { SmallerText, StyledText } from '../../../shared/styled/Typography'
import { SpacerH5 } from '../../../shared/styled/Spacers'

export const LotRow = (props) => {
  const first = props.countNum === 1
  return (
    <StyledLotRowWrapper>
      <StyledLotRow>
        <RowItem title={first && '№'}>
          <p>{props.countNum}</p>
        </RowItem>

        <RowItem title={first && 'Название'}>
          <p>{props.item_name}</p>
        </RowItem>

        <RowItem title={first && 'Состояние'}>
          <NotebookPowerOn powerOn={props.poweron} big />
        </RowItem>

        <RowItem title={first && 'Экран'}>
          <DisplayCondWrapper>
            <NotebookRowDisplayCond displayCondition={props.display_cond} />
            {props.display}
          </DisplayCondWrapper>
        </RowItem>

        <RowItem title={first && 'Процессор'}>
          <p>{props.proc}</p>
        </RowItem>

        <RowItem title={first && 'Видеокарта'}>
          <p>{props.video || props.integ_video}</p>
        </RowItem>

        <RowItem title={first && 'Ram'}>
          <p>{props.ram}</p>
        </RowItem>

        <RowItem title={first && 'Накопитель'}>
          <p>{props.hdd}</p>
        </RowItem>
      </StyledLotRow>
      <SpacerH5 />
      <StyledLotSubRow>
        <div />
        {props?.battery ? (
          <StyledSubRowTextWrapper>
            <StyledText>Батарея:</StyledText>
            <SmallerText>{props.battery}</SmallerText>
          </StyledSubRowTextWrapper>
        ) : (
          <div />
        )}
        {props?.note ? (
          <StyledSubRowTextWrapper>
            <StyledText>Прим.:</StyledText>
            <SmallerText>{props.note}</SmallerText>
          </StyledSubRowTextWrapper>
        ) : (
          <div />
        )}
      </StyledLotSubRow>
    </StyledLotRowWrapper>
  )
}
