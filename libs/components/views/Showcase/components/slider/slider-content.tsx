import React, { useEffect, useRef, useState } from 'react'
import {
  DialogContent,
  DialogHeader,
  DialogTitle
} from '../../../../shared/ui/dialog'
import Image from 'next/image'
import { cn } from '../../../../../utils/cn'
import { Loading } from '../../../../shared/styled/loading'
import { ChevronLeftCircle, ChevronRightCircle } from 'lucide-react'

const IMG_IDS = [1, 2, 3, 4]
const LAST_IMG_INDEX = IMG_IDS.length - 1

export default function SliderContent({
  serial_num,
  item_name,
  has_icon
}: {
  serial_num: string
  item_name: string
  has_icon: boolean
}) {
  const [loading, setLoading] = useState(true)
  const [activeItemIndex, setActiveItemIndex] = useState(0)
  const image = useRef<HTMLImageElement>(null)
  const activeItem = IMG_IDS[activeItemIndex]
  const src = `${process.env['NEXT_PUBLIC_MEDIA_URL']}/img/${serial_num}/${activeItem}.jpg`

  useEffect(() => {
    if (!image.current?.complete) setLoading(true)
  }, [activeItemIndex])

  const decrease = () => {
    const nextIndex = activeItemIndex - 1
    setActiveItemIndex(nextIndex < 0 ? LAST_IMG_INDEX : nextIndex)
  }

  const increase = () => {
    const nextIndex = activeItemIndex + 1
    setActiveItemIndex(nextIndex > LAST_IMG_INDEX ? 0 : nextIndex)
  }

  return (
    <DialogContent className="flex flex-col gap-2 items-center max-w-[800px]">
      <DialogHeader>
        <DialogTitle>{item_name}</DialogTitle>
      </DialogHeader>

      <div className="flex items-center justify-center gap-5 w-full h-full relative ">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 z-10">
            <Loading />
          </div>
        )}

        <button onClick={decrease}>
          <ChevronLeftCircle className="w-7 h-7" />
        </button>

        <div className="relative w-full h-full aspect-square">
          <Image
            className={cn(
              'transition-opacity duration-300',
              loading ? 'opacity-70' : ''
            )}
            ref={image}
            src={!has_icon ? '/assets/icons/notebook-icon.svg' : src}
            fill
            sizes="800"
            alt="notebook full size img"
            onLoadingComplete={() => {
              setLoading(false)
            }}
          />
        </div>
        <button onClick={increase}>
          <ChevronRightCircle className="w-7 h-7" />
        </button>
      </div>
    </DialogContent>
  )
}
