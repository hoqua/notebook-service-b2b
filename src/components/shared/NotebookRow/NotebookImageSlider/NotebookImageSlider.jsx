import React, { useState } from 'react'
import { NotebookSlider } from '../../NotebookSlider/NotebookSlider'
import { NotebookImage } from '../NotebookImage/NotebookImage'

export const NotebookImageSlider = ({ notebook }) => {
  const [showSlider, setShowSlider] = useState(false)
  const [isError, setIsError] = useState(false)

  const onShowSlider = () => {
    console.log('kek2')
    if (isError) return null

    setShowSlider(true)
  }

  return (
    <>
      {showSlider &&
        <NotebookSlider
          title={notebook.item_name}
          notebookSerialNum={notebook.serial_num}
          onClose={() => setShowSlider(false)}
        />}

      <NotebookImage
        notebook={notebook}
        onClick={onShowSlider}
        onError={() => setIsError(true)}
      />
    </>
  )
}
