import React from 'react'
import { HeadTile, StyledText } from './Typography'
import styled from 'styled-components'
import { StyledSelect } from './StyledSelect'
import { ReactComponent as Filters } from '../../../assets/icons/filters.svg'
import { SpacerH20, SpacerH5 } from './Spacers'
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

export const PageTitleSection = (props) => {
  const {
    title,
    subtitle,
    onFilterClick,
    onPriceSortChange,
    actions = false
  } = props

  return (
    <>
      <SectionWrapper>
        <div>
          <HeadTile>{title}</HeadTile>
          {subtitle && (
            <>
              <SpacerH5 />
              <StyledText>{subtitle}</StyledText>
            </>
          )}
        </div>

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
  justify-content: flex-end;
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
