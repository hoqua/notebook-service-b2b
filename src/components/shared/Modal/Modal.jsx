import React, { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import { StyledCard } from '../styled/StyledCard'
import { IconButton } from '../styled/IconButton'
import { ReactComponent as Cross } from '../../../assets/icons/cross.svg'
import { ModalHeader, ModalWrapper } from './styles'
import { StyledTitle } from '../styled/Typography'

export const Modal = ({ title = 'No title', children, onClose }) => {
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
            <Cross height='12px' width='12px' />
          </IconButton>
        </ModalHeader>

        {children}
      </StyledCard>
    </ModalWrapper>,
    document.getElementById('modal-root')
  )
}
