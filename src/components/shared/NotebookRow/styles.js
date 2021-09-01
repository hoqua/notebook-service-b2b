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

export const ExpandButton = styled.button`
  position: absolute;
  right: 25px;
  bottom: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20px;
  width: 20px;
  border: 1px solid ${({ theme }) => theme.brand.dark};
  border-radius: 4px;
  background: none;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover{
    background-color: ${({ theme }) => theme.brand.gray};
  }
`
