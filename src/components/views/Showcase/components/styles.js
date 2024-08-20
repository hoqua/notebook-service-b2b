import styled from 'styled-components'
import { mediumGap } from '../../../shared/styled/css'
import { theme } from '../../../../styles/theme'
import { StyledCard } from '../../../shared/styled/StyledCard'

export const StyledNotebookRow = styled(StyledCard)`
  display: grid;
  grid-template-columns: 0.05fr 0.15fr 0.1fr 0.08fr 0.07fr 0.23fr 0.1fr 0.05fr 0.1fr 0.07fr;
  align-items: center;
  ${mediumGap};
`

export const NewNotebookBadge = styled.div`
  color: #fff;
  font-size: 0.7rem;
  line-height: 1rem;
  background-color: #ffac30;
  display: block;
  position: absolute;
  top: 10px;
  left: 10px;
  padding-right: 5px;
  padding-left: 5px;
`

const classColorMap = {
  'Класс A': theme.status.success,
  'Класс B': '#BCDB57',
  'Класс C': '#AFAE72'
}

export const LookoutBadge = styled.div`
  color: #fff;
  font-size: 0.9rem;
  padding: 4px 10px 4px 10px;
  background-color: ${({ classKey }) => classColorMap[classKey]};
  display: inline-block;
`

export const StyledRowsGrid = styled.div`
  display: grid;
  ${mediumGap}
`
