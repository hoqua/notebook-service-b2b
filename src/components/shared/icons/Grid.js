import React from 'react'

const Grid = ({ height = 24, color = '#000000' }) => {
  return (
    <svg height={height} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M10 3H3V10H10V3Z' stroke={color} strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M21 3H14V10H21V3Z' stroke={color} strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M21 14H14V21H21V14Z' stroke={color} strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M10 14H3V21H10V14Z' stroke={color} strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
    </svg>

  )
}

export default Grid