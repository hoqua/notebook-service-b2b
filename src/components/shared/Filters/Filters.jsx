import React, { useEffect, useState } from 'react'
import { StyledCard } from '../styled/StyledCard'
import {
  StyledInput,
  StyledLabeledInput,
  StyledLabeledSelect
} from '../styled/StyledInput'
import styled from 'styled-components'
import StyledCheckbox from '../styled/StyledCheckbox'
import { StyledText } from '../styled/Typography'
import { AppButton } from '../styled/NavigationButton'
import { mediumGap } from '../styled/css'
import { useFetch } from 'use-http'
import {
  API_FILTERS,
  API_FILTERS_UNFINISHED
} from '../../../constants/constants'

export const VIDEO_OPTIONS = [
  {
    label: 'Дискретная',
    value: true
  },
  {
    label: 'Встроенная',
    value: false
  }
]

export const Filters = ({
  onFiltersSubmit,
  loading,
  hideFilters,
  isUnfinished = false
}) => {
  const API = isUnfinished ? API_FILTERS_UNFINISHED : API_FILTERS
  const {
    get,
    response: { data },
    loading: loadingFilters
  } = useFetch(API)
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

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        await get()
      } catch (error) {
        console.log('Error fetching notebooks', error)
      }
    }

    fetchFilters()
  }, [])

  const { display, hdd, lookout, mark, proc, ram, poweron } =
    data?.filters || {}

  const onSelect = (filterName) => (selected) =>
    setFilters({ ...filters, [filterName]: selected })
  const applyFilters = () => onFiltersSubmit(filters)

  return (
    <StyledCard $hide={hideFilters}>
      <FiltersWrapper>
        <StyledLabeledSelect
          label="Производитель"
          onChange={onSelect('mark')}
          options={mark}
        />
        <StyledLabeledSelect
          label="Процессор"
          onChange={onSelect('proc')}
          options={proc}
        />
        <StyledLabeledSelect
          label="Дискретная видеокарта"
          onChange={onSelect('discrete_video')}
          options={VIDEO_OPTIONS}
        />
        <StyledLabeledSelect
          label="Оперативная память"
          onChange={onSelect('ram')}
          options={ram}
        />
        <StyledLabeledSelect
          label="Накопитель"
          onChange={onSelect('hdd')}
          options={hdd}
        />

        <StyledLabeledSelect
          label="Экран"
          onChange={onSelect('display')}
          options={display}
        />
        <StyledLabeledSelect
          label="Внешний вид"
          onChange={onSelect('lookout')}
          options={lookout}
        />
        {isUnfinished && (
          <StyledLabeledSelect
            label="Работоспособность"
            onChange={onSelect('poweron')}
            options={poweron}
          />
        )}
        <PriceRangeWrapper>
          <StyledLabeledInput
            type="number"
            label="Цена"
            onChange={onSelect('min_price')}
            width="96px"
            placeholder="От"
          />
          <StyledInput
            type="number"
            placeholder="До"
            onChange={(e) => onSelect('max_price')(e.target.value)}
            width="96px"
          />
        </PriceRangeWrapper>
        {!isUnfinished && <div />}

        <ActionsWrapper>
          <StyledCheckbox onChange={onSelect('new')}>
            <StyledText>Показать новинки</StyledText>
          </StyledCheckbox>
          <AppButton
            onClick={applyFilters}
            disabled={loading || loadingFilters}
          >
            Применить
          </AppButton>
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
