import styled from 'styled-components'

export const RegistrationForm = styled.form`
  display: grid;
  align-items: center;

  grid-gap: 15px;
  
  @media (min-width: 900px) {
    
    grid-template-columns: 150px 1fr;
    grid-gap: 15px;
   

    label {
      grid-column: 1 / 2;
    }

    input,
    button {
      grid-column: 2 / 3;
    }
  }
`

export const ActionsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

export const RegistrationContainer = styled.div`
  width: 100%;
  height: 100%;
`
