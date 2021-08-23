import React from 'react'
import Checkbox from 'react-custom-checkbox'
import { theme } from '../../../styles/theme'
import CheckMark from '../icons/CheckMark'

export default function StyledCheckbox ({ onChange, children, error }) {
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
      borderColor={error ? '#C61717FF' : '#EAEEF1'}
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
