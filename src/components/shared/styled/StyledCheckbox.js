import React from 'react'
import Checkbox from 'react-custom-checkbox'
import CheckMark from '../icons/CheckMark'
import { useTheme } from 'styled-components'

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
          <CheckMark color='#fff' height={15} />
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
