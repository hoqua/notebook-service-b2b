import React, { useState } from 'react'
import notebookFallback from '../../../../assets/icons/notebook-icon.svg'
import { NotebookImageWrapper } from './styles'
import { Slider } from './Slider'

const isImgWithError = (event) => {
  return event.target.src === notebookFallback
}

export const NotebookImage = ({ notebook }) => {
  const [isError, setIsError] = useState(false)
  const [showSlider, setShowSlider] = useState(false)

  const handleImageError = event => {
    event.target.src = notebookFallback
    setIsError(true)
  }

  const onShowSlider = (event) => {
    if (isImgWithError(event)) return null

    setShowSlider(true)
  }

  return (
    <>
      {showSlider && <Slider notebookSerialNum={notebook.serial_num} onClose={() => setShowSlider(false)} />}
      <NotebookImageWrapper isError={isError}>
        <img
          onError={handleImageError}
          onClick={onShowSlider}
          loading='lazy'
          src={`media/img/${notebook.serial_num}/icon.jpg`}
          alt={`${notebook.mark_name} notebook image`}
        />
      </NotebookImageWrapper>
    </>
  )
}
