import styled, { css } from 'styled-components'
import {
  darkColor,
  flexAlignJustify,
  grayBorder,
  hoverDarkBorder,
  NOTEBOOK_IMG_HEIGHT
} from '../../../../shared/styled/css'
import Zoom from '../../../../../assets/icons/zoom.svg'

const PADDING = '5px'
export const NotebookImageWrapper = styled.div(
  ({ isError }) => css`
    height: calc(${NOTEBOOK_IMG_HEIGHT} + ${PADDING});
    width: calc(${NOTEBOOK_IMG_HEIGHT} + ${PADDING});
    padding: ${PADDING};

    ${flexAlignJustify};
    ${grayBorder};
    
    ${!isError && css`
      cursor: pointer;
      ${hoverDarkBorder};
      
      img {
        height: 100%;
        transition: opacity 0.3s ease;
      }
      &:hover {
        img {
          opacity: .3;
        }
      }
      
      &:hover{
        &:before {
          ${darkColor};
          content: '';
          background-image: url(${Zoom});
          position: absolute;
          width: 26px;
          height: 26px;
          background-position: center;
          background-repeat: no-repeat;
        }
      }
      &:after{ // hack for preloading hover icon
        content: '';
        background-image: url(${Zoom});
        height: 0;
        width: 0;
        pointer-events: none;
      }
    `}
  `
)
