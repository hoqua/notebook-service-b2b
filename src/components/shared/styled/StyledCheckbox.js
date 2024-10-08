import React, { useState } from 'react'
import Checkbox from 'react-custom-checkbox'
import { useTheme } from 'styled-components'
import { ReactComponent as CheckMark } from '../../../assets/icons/check-mark.svg'

export default function StyledCheckbox({ onChange, children, error }) {
  const theme = useTheme()
  const [isChecked, setIsChecked] = useState(false)

  const checkState = (event) => {
    setIsChecked(event)
    onChange(event)
  }
  const checkedBorderColor = isChecked ? theme.brand.dark : theme.brand.gray
  const borderColor = error ? theme.status.error : checkedBorderColor

  return (
    <Checkbox
      icon={
        <div>
          <CheckMark stroke="#fff" height="11px" />
        </div>
      }
      onChange={checkState}
      borderColor={borderColor}
      style={{
        overflow: 'hidden',
        backgroundColor: isChecked ? theme.brand.dark : '#fff',
        cursor: 'pointer'
      }}
      labelStyle={{
        cursor: 'pointer',
        marginLeft: 5,
        userSelect: 'none'
      }}
      label={children}
    />
  )
}
