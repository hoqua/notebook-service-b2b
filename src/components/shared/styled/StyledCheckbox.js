import React from 'react'
import Checkbox from 'react-custom-checkbox'
import { useTheme } from 'styled-components'
import { ReactComponent as CheckMark } from '../../../assets/icons/check-mark.svg'

export default function StyledCheckbox ({ onChange, children, error }) {
  const theme = useTheme()
  return (
    <Checkbox
      icon={
        <div
          style={{
            display: 'flex',
            flex: 1,
            backgroundColor: theme.brand.dark,
            alignSelf: 'stretch',
            alignItems: 'center'
          }}
        >
          <CheckMark fill='#fff' height='18px' />
        </div>
      }
      onChange={onChange}
      borderColor={error ? '#C61717FF' : theme.brand.gray}
      style={{
        cursor: 'pointer',
        overflow: 'hidden'
      }}
      labelStyle={{
        marginLeft: 5,
        userSelect: 'none'
      }}
      label={children}
    />
  )
}
