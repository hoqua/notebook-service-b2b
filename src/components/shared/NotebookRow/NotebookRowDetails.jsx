import React from 'react'
import { StyledText } from '../styled/Typography'
import styled from 'styled-components'
import { NotebookRowItem } from './styles'

export const NotebookRowDetails = ({ notebook }) => {
  return (
    <NotebookDetailsRow>
      <div />

      <NotebookRowItem>
        <StyledText>Батарея</StyledText>
        <p>{notebook.battery}</p>
      </NotebookRowItem>

      <NotebookRowItem>
        <StyledText>Прим:</StyledText>
        <p>{notebook.battery}</p>
      </NotebookRowItem>
    </NotebookDetailsRow>
  )
}

const NotebookDetailsRow = styled.div`
  display: grid;
  grid-template-columns: 400px 100px 1fr;
`
