import React from 'react'
import styled from 'styled-components'
import Arrow from '../../../assets/icons/arrow-up.svg'

export const StyledSelect = ({ options, onChange }) => {
  return (
    <SelectWrapper>
      <Select name='select' onChange={event => onChange(event)}>
        {options.map(option => <option key={option.label} value={option.value}>{option.label}</option>)}
      </Select>
    </SelectWrapper>
  )
}

const ARROW_SIZE = '8px'
const PADDING = '12px'

export const SelectWrapper = styled.div`
  position: relative;

  &:after {
    content: '';
    background-image: url(${Arrow});
    position: absolute;
    background-size: ${ARROW_SIZE} ${ARROW_SIZE};
    height: ${ARROW_SIZE};
    width: ${ARROW_SIZE};
    background-position: center;
    background-repeat: no-repeat;
    transform: rotate(180deg);
    right: ${PADDING};
    top: calc(50% - ${ARROW_SIZE} / 2);
  }
`

export const Select = styled.select`
  position: relative;
  padding: ${PADDING};
  color: ${({ theme }) => theme.brand.dark};
  font-size: .8rem;
  font-family: inherit;
  border: 1px solid ${({ theme }) => theme.brand.gray};
  border-radius: 4px;
  appearance: none;
  min-width: 150px;
  cursor: pointer;

  &:focus-visible {
    border: 1px solid ${({ theme }) => theme.brand.dark};
    outline: none;
  }
`
