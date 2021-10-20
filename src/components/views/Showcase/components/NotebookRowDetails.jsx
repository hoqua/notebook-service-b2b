import React from 'react'
import { StyledText } from '../../../shared/styled/Typography'
import { NotebookRowItem } from './styles'

export const NotebookRowDetails = ({ notebook }) => {
  return (
    <>
      <div />
      <div />
      <div />
      <div />

      <NotebookRowItem>
        <StyledText>Батарея</StyledText>
        <p>{notebook.battery}</p>
      </NotebookRowItem>

      <NotebookRowItem>
        <StyledText>Прим:</StyledText>
        <p>{notebook.note}</p>
      </NotebookRowItem>
    </>
  )
}