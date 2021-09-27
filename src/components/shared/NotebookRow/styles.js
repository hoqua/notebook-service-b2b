import styled from 'styled-components'
import { StyledCard } from '../styled/StyledCard'
import { ReactComponent as ShoppingCart } from '../../../assets/icons/shoping-cart.svg'
import { CARD_PADDING, mediumGap } from '../styled/css'
import { theme } from '../../../styles/theme'
import { IconButton } from '../styled/IconButton'

export const StyledNotebookRowWrapper = styled(StyledCard)`
  background-color: #fff;
  position: relative;
`

export const StyledNotebookRow = styled.div`
  display: grid;
  grid-template-columns: .05fr .15fr .1fr .08fr .07fr .23fr .1fr .05fr .1fr .07fr;
  align-items: center;
  ${mediumGap};
`

export const NotebookRowItem = styled.div`
  height: 100%;
`

export const ExpandButton = styled(IconButton)`
  position: absolute;
  right: ${CARD_PADDING};
  bottom: ${CARD_PADDING};
  height: 20px;
  width: 20px;
  padding: 0;
`

export const StyledShoppingCard = styled(ShoppingCart)`
  path {
    stroke: ${({ theme }) => theme.brand.dark};
  }
`

export const NewNotebookBadge = styled.div`
  color: #fff;
  font-size: .7rem;
  line-height: 1rem;
  background-color: #FFAC30;
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
  font-size: .9rem;
  padding: 4px 10px 4px 10px;
  background-color: ${({ classKey }) => classColorMap[classKey]};
  display: inline-block;
`
