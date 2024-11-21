import React from 'react'

export function Loading() {
  return (
    <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center  ">
      <div className="spinner-wrapper inline-block relative w-20 h-20 z-50">
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  )
}
