import styled from 'styled-components'
import { RoundButton } from '../styled/IconButton'
import { CARD_PADDING, smallGap, Z_INDEX } from '../styled/css'

export const NotebookSliderImg = styled.img`
  height: 800px;
  width: 800px;
  transition: opacity 0.3s ease;
  opacity: ${({ animate }) => animate ? 0.7 : 1};
`

export const StyledSliderButton = styled(RoundButton)`
  position: absolute;
  right: ${CARD_PADDING};
  z-index: ${Z_INDEX.modal};
  height: 35px;
  width: 35px;
  top: 50%;

  ${({ positioning }) => positioning === 'left' && `left: ${CARD_PADDING};`};
  ${({ positioning }) => positioning === 'right' && `right: ${CARD_PADDING};`};
`

export const SliderDot = styled(RoundButton)`
  background-color: ${({ isActive, theme }) => isActive ? theme.brand.gray : 'none'};
`
export const SliderDotsWrapper = styled.div`
  position: absolute;
  bottom: ${CARD_PADDING};
  z-index: ${Z_INDEX.modal};
  display: flex;
  left: 50%;
  transform: translateX(-50%);
  ${smallGap}
`
