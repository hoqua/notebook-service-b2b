import React from 'react'
import { StyledCard } from '../styled/StyledCard'
import { StyledInput, StyledLabeledInput, StyledLabeledSelect } from '../styled/StyledInput'
import styled from 'styled-components'
import StyledCheckbox from '../styled/StyledCheckbox'
import { StyledText } from '../styled/Typography'
import { NavigationButton } from '../styled/NavigationButton'
import { mediumGap } from '../styled/css'

export const Filters = ({ loading }) => {
  const manuf = [
    {
      value: 'Asus',
      label: 'Asus (845)'
    },
    {
      value: 'Samsung',
      label: 'Samsung (564)'
    },
    {
      value: 'HP',
      label: 'HP (458)'
    },
    {
      value: 'Lenovo',
      label: 'Lenovo (321)'
    }
  ]
  return (
    <StyledCard>
      <FiltersWrapper>
        <StyledLabeledSelect label='Производитель' onChange={val => console.log(val)} options={manuf} />
        <StyledLabeledSelect label='Процессор' onChange={val => console.log(val)} />
        <StyledLabeledSelect label='Видеокарта' onChange={val => console.log(val)} />
        <StyledLabeledSelect label='Оперативная память' onChange={val => console.log(val)} />
        <StyledLabeledSelect label='Накопитель' onChange={val => console.log(val)} />

        <StyledLabeledSelect label='Экран' onChange={val => console.log(val)} />
        <StyledLabeledSelect label='Внешний вид' onChange={val => console.log(val)} />
        <StyledLabeledSelect label='Работоспособность' onChange={val => console.log(val)} />
        <PriceRangeWrapper>
          <StyledLabeledInput label='Цена' onChange={val => console.log(val)} width='96px' placeholder='От' />
          <StyledInput placeholder='До' width='96px' />
        </PriceRangeWrapper>

        <ActionsWrapper>
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
