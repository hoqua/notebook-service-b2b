import React from 'react'
import styled from 'styled-components'
import { SpacerH10, SpacerH20 } from '../styled/Spacers'
import { NavLink } from 'react-router-dom'

export const MainNavigationSectionRow = ({
  title,
  text,
  navigateTo,
  imagePath
}) => {
  return (
    <StyledWrapper>
      <StyledImageWrapper>
        <StyledHeader>{title}</StyledHeader>

        <SpacerH10 />

        <img
          src={imagePath}
          alt="Notebook image"
          height="120px"
          width="140px"
        />
      </StyledImageWrapper>

      <div>
        <StyledText>{text}</StyledText>

        <SpacerH20 />
        <NavLink to={navigateTo}>Перейти в раздел</NavLink>
      </div>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  display: flex;
  gap: 20px;

  padding-bottom: 20px;

  border-bottom: 1px solid ${({ theme }) => theme.brand.gray};

  &:last-of-type {
    border-bottom: none;
  }
`

const StyledImageWrapper = styled.div`
  flex-shrink: 0;
`
const StyledText = styled.p`
  color: ${({ theme }) => theme.typography.light};
  font-size: 1rem;
`

const StyledHeader = styled.h2`
  font-size: 1.5rem;
  font-weight: 500;
  color: ${({ theme }) => theme.brand.dark};
`
