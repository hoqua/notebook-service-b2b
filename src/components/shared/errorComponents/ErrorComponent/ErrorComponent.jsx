import React from 'react'
import { StyledCard } from '../../styled/StyledCard'
import styled from 'styled-components'

export const ErrorComponent = () => {
  return (
    <StyledCard>
      <StyledErrorText>Произошла ошибка загрузки данных. </StyledErrorText>
    </StyledCard>
  )
}

const StyledErrorText = styled.p`
  color: ${({ theme }) => theme.status.error};
  font-size: 0.8rem;
`
