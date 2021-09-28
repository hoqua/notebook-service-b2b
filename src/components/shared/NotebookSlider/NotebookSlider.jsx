import React, { useEffect, useRef, useState } from 'react'
import { Modal } from '../Modal/Modal'
import { NotebookSliderImg } from './styles'
import { Loading } from '../Loading/Loading'
import { SliderButton, SliderDots } from './components/NotebookSliderComponents'
import { Z_INDEX } from '../styled/css'
import notebookFallback from '../../../assets/icons/notebook-icon.svg'

const IMG_IDS = [1, 2, 3, 4]
const LAST_IMG_INDEX = IMG_IDS.length - 1

export const NotebookSlider = ({ onClose, notebookSerialNum, title }) => {
  const image = useRef()
  const [activeItemIndex, setActiveItemIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const activeItem = IMG_IDS[activeItemIndex]

  useEffect(() => {
    if (!image.current.complete) setLoading(true) // after one iteration of the event loop it checks if image load complete (loaded from cache) and if not turns on loading animation
  }, [activeItemIndex])

  const decrease = () => {
    const nextIndex = activeItemIndex - 1
    const isInBounds = nextIndex >= 0
    if (isInBounds) {
      setActiveItemIndex(nextIndex)
    } else {
      setActiveItemIndex(LAST_IMG_INDEX)
    }
  }

  const increase = () => {
    const nextIndex = activeItemIndex + 1
    const isInBounds = nextIndex <= LAST_IMG_INDEX
    if (isInBounds) {
      setActiveItemIndex(nextIndex)
    } else {
      setActiveItemIndex(0)
    }
  }

  const handleImageError = event => {
    event.target.src = notebookFallback
  }

  return (
    <Modal title={title} onClose={onClose}>
      <SliderButton positioning='left' onClick={decrease} />
      <SliderButton positioning='right' onClick={increase} />

      {loading && <Loading zIndex={Z_INDEX.modalLoading} />}
      <NotebookSliderImg
        animate={loading}
        ref={image}
        src={`media/img/${notebookSerialNum}/${activeItem}.jpg`}
        alt='notebook full size img'
        onLoad={() => setLoading(false)}
        onError={handleImageError}
      />

      <SliderDots items={IMG_IDS} activeItem={activeItem} setActiveItemIndex={setActiveItemIndex} />
    </Modal>
  )
}
