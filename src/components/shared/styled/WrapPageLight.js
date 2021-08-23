import styled from 'styled-components'

export const WrapPageLight = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: ${({ theme }) => theme.bg.light};
  
  @media (min-width: 900px) {
    align-items: center;
  }
`
