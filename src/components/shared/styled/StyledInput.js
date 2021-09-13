import React from 'react'
import styled from 'styled-components'
import { SpacerH10 } from './Spacers'
import { StyledSelect } from './StyledSelect'
import { darkBorder, grayBorder, hoverDarkBorder } from './css'

export const StyledInput = styled.input`
  height: 38px;
  box-sizing: border-box;
  ${grayBorder};
  transition: border 0.3s ease;
  padding: 0 12px 0 12px;

  &:focus {
    outline: none;
    ${darkBorder}
  }
  
  ${hoverDarkBorder};

  &:focus-visible {
    outline: none;
  }

  ${({ error, theme }) => error && `border-color: ${theme.status.error};`}
  ${({ width }) => width && `width: ${width}`}
`

export const StyledLabeledInput = ({ label, placeholder, width = '100%', onChange }) => {
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

export const StyledLabeledSelect = ({ label, options, width = '100%', onChange, multi }) => {
  return (
    <StyledLabeledInputWrapper>
      <StyledLabel htmlFor={label}>{label}</StyledLabel>
      <SpacerH10 />
      <StyledSelect
        options={options}
        onChange={onChange}
        width={width}
        multi
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
