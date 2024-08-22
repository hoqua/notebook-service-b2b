import { SliderDot, SliderDotsWrapper, StyledSliderButton } from '../styles'
import { RotatedArrow } from '../../../../../shared/styled/RotatedArrow'
import React from 'react'

export const SliderButton = ({ $positioning = 'right', onClick }) => {
  return (
    <StyledSliderButton $positioning={$positioning} onClick={onClick}>
      <RotatedArrow
        height="12px"
        width="12px"
        deg={$positioning === 'right' ? 90 : 270}
      />
    </StyledSliderButton>
  )
}

export const SliderDots = ({ items, activeItem, setActiveItemIndex }) => {
  return (
    <SliderDotsWrapper>
      {items.map((item, index) => (
        <SliderDot
          onClick={() => setActiveItemIndex(index)}
          key={item}
          $isActive={item === activeItem}
        />
      ))}
    </SliderDotsWrapper>
  )
}
