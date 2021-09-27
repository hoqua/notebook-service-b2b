import React, { useEffect, useRef, useState } from 'react'
import { Modal } from '../Modal/Modal'
import { NotebookSliderImg, SliderDot, SliderDotsWrapper, StyledSliderButton } from './styles'
import { RotatedArrow } from '../styled/RotatedArrow'
import { Loading } from '../Loading/Loading'

const IMG_IDS = [1, 2, 3, 4]
const LAST_IMG_INDEX = IMG_IDS.length - 1

export const NotebookSlider = ({ onClose, notebookSerialNum }) => {
  const image = useRef()
  const [activeItemIndex, setActiveItemIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const activeItem = IMG_IDS[activeItemIndex]

  useEffect(() => {
    if (!image.current.complete) setLoading(true)
  }, [activeItemIndex])

  const decrease = () => {
    const nextIndex = activeItemIndex - 1
    const isInBounds = nextIndex >= 0
    if (isInBounds) {
      setActiveItemIndex(LAST_IMG_INDEX)
    } else {
      setActiveItemIndex(nextIndex)
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

  return (
    <Modal title={notebookSerialNum} onClose={onClose}>
      <SliderButton positioning='left' onClick={decrease} />
      <SliderButton positioning='right' onClick={increase} />

      {loading && <Loading />}
      <NotebookSliderImg
        animate={loading}
        ref={image}
        src={`media/img/${notebookSerialNum}/${activeItem}.jpg`}
        alt='notebook full size img'
        onLoad={() => setLoading(false)}
      />

      <SliderDots items={IMG_IDS} activeItem={activeItem} setActiveItemIndex={setActiveItemIndex} />
    </Modal>
  )
}

const SliderButton = ({ positioning = 'right', onClick }) => {
  return (
    <StyledSliderButton positioning={positioning} onClick={onClick}>
      <RotatedArrow height='12px' width='12px' deg={positioning === 'right' ? 90 : 270} />
    </StyledSliderButton>
  )
}

const SliderDots = ({ items, activeItem, setActiveItemIndex }) => {
  return (
    <SliderDotsWrapper>
      {items.map((item, index) =>
        <SliderDot
          onClick={() => setActiveItemIndex(index)}
          key={item}
          isActive={item === activeItem}
        />)}
    </SliderDotsWrapper>
  )
}
