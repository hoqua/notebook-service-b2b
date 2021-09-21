import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import Arrow from '../../../assets/icons/arrow-up.svg'
import { ReactComponent as Cross } from '../../../assets/icons/cross.svg'
import { darkBorder, darkColor, flexAlign, grayBorder, hoverDarkBorder, smallGap } from './css'

export const StyledSelect = ({ options = [], onChange, multi = false, width }) => {
  const [selectedValues, setSelectedValues] = useState([])
  const selectRef = useRef(null)

  const onMultiChange = (value) => {
    if (selectedValues.includes(value)) return

    setSelectedValues([value, ...selectedValues])
  }

  const removeSelected = (value) => {
    const index = selectedValues.indexOf(value)
    if (index === -1) return

    selectedValues.splice(index, 1)
    setSelectedValues([...selectedValues])
    selectRef.current.value = selectedValues.toString() // to clear last selected item and fix bug
  }

  useEffect(() => {
    onChange(selectedValues)
  }, [selectedValues])

  return (
    <SelectWrapper multi={multi}>
      <MultiWrapper>
        {multi && selectedValues.map(selected =>
          <SelectedItem key={selected}>
            <Deselect onClick={() => removeSelected(selected)}>
              <Cross />
            </Deselect>
            {selected}
          </SelectedItem>
        )}
      </MultiWrapper>

      <Select
        ref={selectRef}
        name='select-component'
        multi={multi}
        width={width}
        onChange={({ target }) => multi ? onMultiChange(target.value) : onChange(target.value)}
      >
        {multi && <option hidden />}
        {options.map(option => <option key={option.label} value={option.value} onChange={() => multi && onMultiChange(option.value)}>{option.label}</option>)}
      </Select>
    </SelectWrapper>
  )
}

const ARROW_SIZE = '8px'
const PADDING = '12px'

export const SelectWrapper = styled.div`
  position: relative;

  ${({ width }) => width && `width: ${width}`}

  ${({ multi }) => !multi && `
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
  `}
`

export const Select = styled.select`
  ${({ width }) => width && `width: ${width}`};
  position: relative;
  padding: ${PADDING};
  color: ${({ theme, multi }) => multi ? 'transparent' : theme.brand.dark};
  font-size: .8rem;
  font-family: inherit;
  appearance: none;
  min-width: 150px;
  cursor: pointer;

  option {
    ${darkColor};
  }

  &:focus-visible {
    ${darkBorder};
    outline: none;
  }
  
  ${hoverDarkBorder};
  ${grayBorder};
`

export const SelectedItem = styled.div`
  font-size: .8rem;
  z-index: 2;
  pointer-events: none;
  height: 22px;
  white-space: nowrap;
  padding: 4px ${PADDING} 4px ${PADDING};
  ${flexAlign};
  ${smallGap};
  ${darkColor};
  ${grayBorder};
`

export const MultiWrapper = styled.div`
  ${flexAlign};
  ${smallGap};
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: calc(100% - 12px);
  z-index: 1;
  pointer-events: none;
  overflow: hidden;
  padding-left: ${PADDING};
  padding-right: ${PADDING};
`

export const Deselect = styled.div`
  ${flexAlign};
  pointer-events: all;
  cursor: pointer;
  height: 15px;
  width: 13px;
`
