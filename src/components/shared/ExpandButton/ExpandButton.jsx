import { RotatedArrow } from '../styled/RotatedArrow'
import React from 'react'
import styled from 'styled-components'
import { IconButton } from '../styled/IconButton'
import { CARD_PADDING } from '../styled/css'

export const ExpandButton = ({ isExpand, onClick }) => {
  return (
    <StyledExpandButton onClick={onClick}>
      <RotatedArrow deg={isExpand ? 0 : 180} />
    </StyledExpandButton>
  )
}

export const StyledExpandButton = styled(IconButton)`
  position: absolute;
  right: ${CARD_PADDING};
  bottom: ${CARD_PADDING};
  height: 20px;
  width: 20px;
  padding: 0;
`
