import React from 'react'
import styled from 'styled-components'
import { mediumGap } from '../../../shared/styled/css'
import { RowItem } from '../../../shared/RowItem/RowItem'
import { NotebookPowerOn } from '../../Showcase/components/NotebookPowerOn'
import { NotebookRowDisplayCond } from '../../Showcase/components/NotebookRowDisplayCond'
import { DisplayCondWrapper } from './styles'

export const LotRow = (props) => {
  const first = props.countNum === 1
  return (
    <StyledLotRow>
      <RowItem title={first && '№'}>
        <p>{props.countNum}</p>
      </RowItem>

      <RowItem title={first && 'Название'}>
        <p>{props.item_name}</p>
      </RowItem>

      <RowItem
        title={first && 'Состояние'}
      >
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
  )
}

export const StyledLotRow = styled.div`
  display: grid;
  grid-template-columns: .1fr .2fr .1fr .1fr .2fr .1fr .1fr .1fr;
  align-items: center;
  ${mediumGap};
  border-top:  1px solid ${({ theme }) => theme.brand.gray};
  
  &:first-of-type {
    border-top:  none;
  }
`
