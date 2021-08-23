import styled from 'styled-components'

export const StyledInput = styled.input`
  height: 38px;
  border: 1px solid #EAEEF1;
  box-sizing: border-box;
  border-radius: 4px;
  transition: border 0.3s ease;
  padding: 0 12px 0 12px;

  &:focus {
    outline: none;
    border: 1px solid ${({ theme }) => theme.brand.dark};
  }
  
  &:focus-visible {
    outline: none;
  }

  ${({ error }) => error && 'border-color: #C61717FF;'}
`
