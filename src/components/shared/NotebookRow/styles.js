import styled from 'styled-components'
import { StyledCard } from '../styled/StyledCard'

export const StyledNotebookRowWrapper = styled(StyledCard)`
  background-color: #fff;
  position: relative;
`

export const StyledNotebookRow = styled.div`
  display: grid;
  grid-template-columns: 40px repeat(9, 1fr);
  align-items: center;
`

export const NotebookRowItem = styled.div`
  height: 100%;
`
