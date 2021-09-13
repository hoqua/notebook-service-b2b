import styled from 'styled-components'
import { mediumGap } from './css'

export const PublicForm = styled.form`
  display: grid;
  align-items: center;

  ${mediumGap};
  
  @media (min-width: 900px) {
    
    grid-template-columns: 150px 1fr;

    label {
      grid-column: 1 / 2;
    }

    input,
    button {
      grid-column: 2 / 3;
    }
  }
`

export const PublicFromActionsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`
