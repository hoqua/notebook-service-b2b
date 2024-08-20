import React from 'react'
import styled from 'styled-components'
import { StyledText } from '../styled/Typography'
import { SpacerH10 } from '../styled/Spacers'

export const RowItem = ({ title, children }) => {
  return (
    <StyledRowItem>
      {typeof title === 'string' ? ( // render styled paragraph if string provided
        <StyledText>{title}</StyledText>
      ) : (
        title
      )}

      <SpacerH10 />

      {children}
    </StyledRowItem>
  )
}

export const StyledRowItem = styled.div`
  height: 100%;
`
