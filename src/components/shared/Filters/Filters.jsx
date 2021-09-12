import React from 'react'
import { StyledCard } from '../styled/StyledCard'
import { StyledInput, StyledLabeledInput } from '../styled/StyledInput'
import styled from 'styled-components'
import StyledCheckbox from '../styled/StyledCheckbox'
import { StyledText } from '../styled/Typography'
import { NavigationButton } from '../styled/NavigationButton'

export const Filters = ({ loading }) => {
  return (
    <StyledCard>
      <FiltersWrapper>
        <StyledLabeledInput label='Производитель' onChange={val => console.log(val)} />
        <StyledLabeledInput label='Процессор' onChange={val => console.log(val)} />
        <StyledLabeledInput label='Видеокарта' onChange={val => console.log(val)} />
        <StyledLabeledInput label='Оперативная память' onChange={val => console.log(val)} />
        <StyledLabeledInput label='Накопитель' onChange={val => console.log(val)} />

        <StyledLabeledInput label='Экран' onChange={val => console.log(val)} />
        <StyledLabeledInput label='Внешний вид' onChange={val => console.log(val)} />
        <StyledLabeledInput label='Работоспособность' onChange={val => console.log(val)} />
        <PriceRangeWrapper>
          <StyledLabeledInput label='Цена' onChange={val => console.log(val)} width='96px' placeholder='От' />
          <StyledInput placeholder='До' width='96px' />
        </PriceRangeWrapper>
        <div>
          <StyledCheckbox
            onChange={isAgreed => console.log(isAgreed)}
          >
            <StyledText>Показать новинки</StyledText>
          </StyledCheckbox>
          <NavigationButton
            to='#' onClick={() => console.log('click')}
            disabled={loading}
          >
            Применить
          </NavigationButton>
        </div>

      </FiltersWrapper>
    </StyledCard>
  )
}

const FiltersWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;
`

const PriceRangeWrapper = styled.div`
  display: flex;
  align-items: end;
  justify-content: space-between;
`
