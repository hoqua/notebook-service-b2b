import React from 'react'
import { HeadTile } from './Typography'
import styled from 'styled-components'
import { StyledSelect } from './StyledSelect'
import { ReactComponent as Filters } from '../../../assets/icons/filters.svg'
import { SpacerH20 } from './Spacers'

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
    value: 2,
    label: 'По убыванию'
  }
]

export const PageTitleSection = ({ title, onFilterClick, onPriceSortChange }) => {
  return (
    <>
      <SectionWrapper>
        <HeadTile>{title}</HeadTile>
        <ActionsWrapper>
          <StyledSelect options={PRICE_OPTIONS} onChange={e => onPriceSortChange(e.target.value)} />
          <FiltersButton onClick={() => onFilterClick()}> <Filters /> Фильтры </FiltersButton>
        </ActionsWrapper>
      </SectionWrapper>
      <SpacerH20 />
    </>
  )
}

export const ActionsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

export const SectionWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const FiltersButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  font: inherit;
  background-color: white;
  padding: 12px;
  font-size: .8rem;
  border: 1px solid ${({ theme }) => theme.brand.gray};
  color: ${({ theme }) => theme.brand.dark};
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.bg.light};
  }
`
