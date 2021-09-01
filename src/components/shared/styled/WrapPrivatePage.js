import styled from 'styled-components'

export const WrapPrivatePage = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: ${({ theme }) => theme.bg.light};
`

export const InnerWrapPrivatePage = styled.div`
  padding-top: 90px;
  max-width: 1170px;
  width: 100%;
`
