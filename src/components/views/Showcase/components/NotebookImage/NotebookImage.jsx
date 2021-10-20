import React, { useState } from 'react'
import notebookFallback from '../../../../../assets/icons/notebook-icon.svg'
import { NotebookImageWrapper } from './styles'

export const NotebookImage = ({ notebook, onClick, onError }) => {
  const [isError, setIsError] = useState(false)

  const handleImageError = event => {
    event.target.src = notebookFallback
    setIsError(true)
    onError?.()
  }

  return (
    <NotebookImageWrapper isError={isError}>
      <img
        onError={handleImageError}
        onClick={() => onClick?.()}
        loading='lazy'
        src={`media/img/${notebook.serial_num}/icon.jpg`}
        alt={`${notebook.mark_name} notebook image`}
      />
    </NotebookImageWrapper>
  )
}
