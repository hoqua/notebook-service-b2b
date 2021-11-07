import React, { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import { StyledCard } from '../styled/StyledCard'
import { IconButton } from '../styled/IconButton'
import { ReactComponent as Cross } from '../../../assets/icons/cross.svg'
import { ModalHeader, ModalWrapper } from './styles'
import { StyledTitle } from '../styled/Typography'
import { useTheme } from 'styled-components'
import { SpacerH20 } from '../styled/Spacers'

export const Modal = ({ title = 'No title', children, onClose }) => {
  const theme = useTheme()
  const modalRef = useRef(null)

  const handleClickOutside = event => {
    const isTargetOfEventInsideModal = modalRef.current && !modalRef.current.contains(event.target)
    if (isTargetOfEventInsideModal) return onClose?.()
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
    <ModalWrapper>
      <StyledCard ref={modalRef}>
        <ModalHeader>
          <StyledTitle>{title}</StyledTitle>

          <IconButton onClick={() => onClose?.()}>
            <Cross stroke={theme.brand.dark} height='12px' />
          </IconButton>
        </ModalHeader>
        <SpacerH20 />

        {children}
      </StyledCard>
    </ModalWrapper>,
    document.getElementById('modal-root')
  )
}
