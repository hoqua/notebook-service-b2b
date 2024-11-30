import React from 'react'
import { Lot } from '../../../../utils-schema/lots.schema'
import { Minus } from 'lucide-react'
import { NotebookPowerOn } from '../../Showcase/components/notebook-poweron'
import { renderSpecs } from '../../../shared/render-specs'
import DisplayCondition from '../../Showcase/components/dispaly-condition'
import { NotebookNote } from '../../Showcase/components/notebook-card'

export default function LotRow({ lots }: { lots: Lot[] }) {
  return (
    <ul className="flex flex-col">
      {lots.map((lot) => (
        <li
          key={lot.serial_num}
          className="grid grid-cols-1 md:grid-cols-8 lg:grid-cols-12  items-center border-b gap-5 py-3 "
        >
          <p className="font-md md:col-span-2">{lot.item_name}</p>
          <p className="flex gap-2 items-center md:col-span-2">
            {lot.display_cond ? (
              <DisplayCondition condition={lot.display_cond} />
            ) : (
              <span>Экран</span>
            )}
            <span>{lot.display || <Minus />}</span>
          </p>
          <p className="md:col-span-2">
            <NotebookPowerOn
              powerOn={lot.poweron}
              className="text-base text-black"
            />
          </p>
          <p className="md:col-span-7 lg:col-span-5 text-secondary-foreground">
            {renderSpecs(lot.proc)} {renderSpecs(lot.ram)}{' '}
            {renderSpecs(lot.hdd)}
            {renderSpecs(lot.video || lot.integ_video)}
            {renderBattery(lot.battery)}
          </p>
          {lot.note && (
            <div className="place-self-end">
              <NotebookNote note={lot.note} />
            </div>
          )}
        </li>
      ))}
    </ul>
  )
}

function renderBattery(battery?: string) {
  return !battery || battery === 'Нет'
    ? 'АКБ Отсутствует'
    : battery === 'Есть'
      ? 'АКБ Присутствует'
      : renderSpecs(battery)
}
