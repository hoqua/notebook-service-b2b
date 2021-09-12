import React from 'react'
import styled from 'styled-components'
import { SpacerH10 } from './Spacers'

export const StyledInput = styled.input`
  height: 38px;
  border: 1px solid #EAEEF1;
  box-sizing: border-box;
  border-radius: 4px;
  transition: border 0.3s ease;
  padding: 0 12px 0 12px;

  &:focus {
    outline: none;
    border: 1px solid ${({ theme }) => theme.brand.dark};
  }

  &:focus-visible {
    outline: none;
  }

  ${({ error, theme }) => error && `border-color: ${theme.status.error};`}
  ${({ width }) => width && `width: ${width}`}
`

export const StyledLabeledInput = ({ label, placeholder, width, onChange }) => {
  return (
    <StyledLabeledInputWrapper>
      <StyledLabel htmlFor={label}>{label}</StyledLabel>
      <SpacerH10 />
      <StyledInput
        name={label}
        placeholder={placeholder}
        type='text'
        width={width}
        onChange={({ target }) => onChange(target.value)}
      />
    </StyledLabeledInputWrapper>
  )
}

const StyledLabeledInputWrapper = styled.div``
const StyledLabel = styled.label`
  display: block;
  color: ${({ theme }) => theme.typography.light};
  font-size: .8rem;
`
