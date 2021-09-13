import styled from 'styled-components'
import { flexAlign, fullPage } from './css'

export const WrapPageLight = styled.div`
  min-height: 100vh;
  ${fullPage};
  display: flex;
  justify-content: center;
  background-color: ${({ theme }) => theme.bg.light};

  @media (min-width: 900px) {
    ${flexAlign}
  }
`
