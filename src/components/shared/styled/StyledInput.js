import React from 'react'
import styled from 'styled-components'
import { SpacerH10 } from './Spacers'
import { StyledSelect } from './StyledSelect'
import { darkBorder, grayBorder, hoverDarkBorder } from './css'

export const StyledInput = styled.input`
  height: 38px;
  box-sizing: border-box;
  ${grayBorder};
  padding: 0 12px 0 12px;

  &:focus {
    outline: none;
    ${({ error }) => !error && darkBorder}
  }

  ${({ error }) => !error && hoverDarkBorder};

  &:focus-visible {
    outline: none;
  }

  ${({ error, theme }) => error && `border-color: ${theme.status.error};`}
  ${({ width }) => width && `width: ${width}`}
  
  
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`

export const StyledLabeledInput = ({
  label,
  placeholder,
  width = '100%',
  onChange,
  type = 'text'
}) => {
  return (
    <StyledLabeledInputWrapper>
      <StyledLabel htmlFor={label}>{label}</StyledLabel>
      <SpacerH10 />
      <StyledInput
        name={label}
        placeholder={placeholder}
        type={type}
        width={width}
        onChange={({ target }) => onChange(target.value)}
      />
    </StyledLabeledInputWrapper>
  )
}

export const StyledLabeledSelect = ({
  label,
  options,
  width = '100%',
  onChange,
  multi
}) => {
  return (
    <StyledLabeledInputWrapper>
      <StyledLabel htmlFor={label}>{label}</StyledLabel>
      <SpacerH10 />
      <StyledSelect
        options={options}
        onChange={onChange}
        width={width}
        multi={multi}
      />
    </StyledLabeledInputWrapper>
  )
}

const StyledLabeledInputWrapper = styled.div``
const StyledLabel = styled.label`
  display: block;
  color: ${({ theme }) => theme.typography.light};
  font-size: 0.8rem;
`
