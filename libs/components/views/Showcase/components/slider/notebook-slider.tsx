import React, { useState } from 'react'
import { NotebookImage } from '../notebook-image'
import { Dialog, DialogTrigger } from '../../../../shared/ui/dialog'
import SliderContent from './slider-content'

export default function NotebookSlider({
  mark_name,
  serial_num,
  item_name,
  imageClassName,
  has_icon
}: {
  mark_name: string
  serial_num: string
  item_name: string
  has_icon: boolean
  imageClassName?: string
}) {
  const [isOpen, setIsOpen] = useState(false)

  const onShowSlider = () => {
    if (!has_icon) return null

    setIsOpen((prev) => !prev)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onShowSlider}>
      <DialogTrigger asChild>
        <button disabled={!has_icon}>
          <NotebookImage
            isSlider={true}
            className={imageClassName}
            mark_name={mark_name}
            serial_num={serial_num}
            has_icon={has_icon}
            lazy={false}
          />
        </button>
      </DialogTrigger>
      <SliderContent
        item_name={item_name}
        serial_num={serial_num}
        has_icon={has_icon}
      />
    </Dialog>
  )
}
