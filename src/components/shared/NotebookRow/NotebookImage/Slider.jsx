import React, { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import { FullPage } from '../../styled/Fullpage'
import styled from 'styled-components'
import { StyledCard } from '../../styled/StyledCard'
import { flexAlignJustify } from '../../styled/css'

export const Slider = ({ onClose }) => {
  const modalRef = useRef(null)

  const handleClickOutside = event => {
    const isTargetOfEventInsideModal = modalRef.current && !modalRef.current.contains(event.target)
    if (isTargetOfEventInsideModal) return onClose()
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, false)
    document.body.style.overflow = 'hidden' // prevent scrolling in modal

    return () => {
      document.removeEventListener('click', handleClickOutside, false)
      document.body.style.overflow = 'auto'
    }
  })

  return ReactDOM.createPortal(
    <SliderWrapper>
      <StyledCard ref={modalRef}>
        modal
      </StyledCard>
    </SliderWrapper>,
    document.getElementById('modal-root')
  )
}

const SliderWrapper = styled(FullPage)`
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  height: 100vh;
  max-height: 100%;
  background-color: ${({ theme }) => theme.bg.light};

  ${flexAlignJustify}
`
