import React from 'react'
import { HeadTile } from './Typography'
import styled from 'styled-components'
import { StyledSelect } from './StyledSelect'
import { ReactComponent as Filters } from '../../../assets/icons/filters.svg'
import { SpacerH20 } from './Spacers'
import { darkColor, flexAlign, grayBorder, hoverDarkBorder, mediumGap, smallGap } from './css'

const PRICE_OPTIONS = [
  {
    value: 0,
    label: 'Цена'
  },
  {
    value: 1,
    label: 'По возрастанию'
  },
  {
    value: -1,
    label: 'По убыванию'
  }
]

export const PageTitleSection = ({ title, onFilterClick, onPriceSortChange, actions = false }) => {
  return (
    <>
      <SectionWrapper>
        <HeadTile>{title}</HeadTile>
        {actions &&
          <ActionsWrapper>
            <StyledSelect options={PRICE_OPTIONS} onChange={value => onPriceSortChange(value)} />
            <FiltersButton onClick={() => onFilterClick()}> <Filters /> Фильтры </FiltersButton>
          </ActionsWrapper>}
      </SectionWrapper>
      <SpacerH20 />
    </>
  )
}

export const ActionsWrapper = styled.div`
  ${flexAlign};
  ${mediumGap};
`

export const SectionWrapper = styled.div`
  ${flexAlign};
  justify-content: space-between;
`

export const FiltersButton = styled.button`
  ${flexAlign};
  font: inherit;
  background-color: white;
  padding: 12px;
  font-size: .8rem;
  cursor: pointer;
  ${smallGap};
  ${darkColor};
  ${grayBorder}
  ${hoverDarkBorder};
`
