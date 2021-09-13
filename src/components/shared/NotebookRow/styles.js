import styled from 'styled-components'
import { StyledCard } from '../styled/StyledCard'
import { ReactComponent as ShoppingCart } from '../../../assets/icons/shoping-cart.svg'
import { flexAlignJustify, grayBorder, mediumGap } from '../styled/css'

export const StyledNotebookRowWrapper = styled(StyledCard)`
  background-color: #fff;
  position: relative;
`

export const StyledNotebookRow = styled.div`
  display: grid;
  grid-template-columns: .05fr .15fr .1fr .05fr .08fr .25fr .1fr .05fr .1fr .07fr;
  align-items: center;
  ${mediumGap};
`

export const NotebookRowItem = styled.div`
  height: 100%;
`

export const CartButton = styled.button`
  ${flexAlignJustify};
  background: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  padding: 8px;
  ${grayBorder}

  &:hover{
    background-color: ${({ theme }) => theme.brand.gray};
  }
`

export const ExpandButton = styled(CartButton)`
  position: absolute;
  right: 25px;
  bottom: 25px;
  height: 20px;
  width: 20px;
  padding: 0;
`

export const StyledShoppingCard = styled(ShoppingCart)`
  path {
    stroke: ${({ theme }) => theme.brand.dark};
  }
`
