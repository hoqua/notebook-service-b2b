import styled from 'styled-components'
import { CARD_PADDING } from './css'

export const StyledCard = styled.div`
  position: relative;
  padding: ${CARD_PADDING};
  box-shadow: 0 3px 20px rgba(17, 40, 120, 0.07);
  border-radius: 4px;
  background-color: white;
  height: fit-content;
  ${({ hide }) => hide && 'display: none'};
`
