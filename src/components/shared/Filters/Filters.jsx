import React, { useEffect, useState } from 'react'
import { StyledCard } from '../styled/StyledCard'
import { StyledInput, StyledLabeledInput, StyledLabeledSelect } from '../styled/StyledInput'
import styled from 'styled-components'
import StyledCheckbox from '../styled/StyledCheckbox'
import { StyledText } from '../styled/Typography'
import { NavigationButton } from '../styled/NavigationButton'
import { mediumGap } from '../styled/css'
import { useFetch } from 'use-http'

export const Filters = ({ onFiltersSubmit, onFilterChange, loading }) => {
  const { get, response: { data } } = useFetch('get-filters.php')
  const [filters, setFilters] = useState({
    display: [],
    hdd: [],
    lookout: [],
    mark: [],
    proc: [],
    ram: [],
    video: [],
    new: false,
    min_price: '',
    max_price: ''
  })

  useEffect(() => get(), [])
  useEffect(() => onFilterChange(filters), [filters])

  if (!data?.filters) return null

  const { display, hdd, lookout, mark, proc, ram, video } = data.filters

  const onSelect = (filterName) => (selected) => setFilters({ ...filters, [filterName]: selected })
  const applyFilters = () => onFiltersSubmit()

  return (
    <StyledCard>
      <FiltersWrapper>
        <StyledLabeledSelect label='Производитель' onChange={onSelect('mark')} options={mark} />
        <StyledLabeledSelect label='Процессор' onChange={onSelect('proc')} options={proc} />
        <StyledLabeledSelect label='Видеокарта' onChange={onSelect('video')} options={video} />
        <StyledLabeledSelect label='Оперативная память' onChange={onSelect('ram')} options={ram} />
        <StyledLabeledSelect label='Накопитель' onChange={onSelect('hdd')} options={hdd} />

        <StyledLabeledSelect label='Экран' onChange={onSelect('display')} options={display} />
        <StyledLabeledSelect label='Внешний вид' onChange={onSelect('lookout')} options={lookout} />

        {/* <StyledLabeledSelect label='Работоспособность' onChange={onSelect('mark')} options={mark} /> */}

        <PriceRangeWrapper>
          <StyledLabeledInput label='Цена' onChange={onSelect('min_price')} width='96px' placeholder='От' />
          <StyledInput placeholder='До' onChange={e => onSelect('max_price')(e.target.value)} width='96px' />
        </PriceRangeWrapper>

        <div />

        <ActionsWrapper>
          <StyledCheckbox
            onChange={onSelect('new')}
          >
            <StyledText>Показать новинки</StyledText>
          </StyledCheckbox>
          <NavigationButton
            to='#' onClick={applyFilters}
            disabled={loading}
          >
            Применить
          </NavigationButton>
        </ActionsWrapper>

      </FiltersWrapper>
    </StyledCard>
  )
}

const FiltersWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  ${mediumGap};
`

const PriceRangeWrapper = styled.div`
  display: flex;
  align-items: end;
  justify-content: space-between;
`

const ActionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
