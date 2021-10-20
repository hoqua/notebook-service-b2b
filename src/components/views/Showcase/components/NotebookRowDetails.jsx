import React from 'react'
import { RowItem } from '../../../shared/RowItem/RowItem'

export const NotebookRowDetails = ({ notebook }) => {
  return (
    <>
      <div />
      <div />
      <div />
      <div />

      <RowItem title='Батарея'>
        <p>{notebook.battery}</p>
      </RowItem>

      <RowItem title='Прим:'>
        <p>{notebook.note}</p>
      </RowItem>
    </>
  )
}
