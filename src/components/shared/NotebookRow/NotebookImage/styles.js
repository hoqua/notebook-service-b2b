import styled, { css } from 'styled-components'
import { darkColor, flexAlignJustify, grayBorder, hoverDarkBorder } from '../../styled/css'
import Zoom from '../../../../assets/icons/zoom.svg'

export const NotebookImageWrapper = styled.div(
  ({ isError }) => css`
    height: 100%;
    padding: 8px;
    transition: border 0.3s ease;

    ${flexAlignJustify};
    ${grayBorder};
    
    ${!isError && css`
      cursor: pointer;
      ${hoverDarkBorder};
      
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
      
      img {
        transition: opacity 0.3s ease;
        &:hover {
          opacity: .1;
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
