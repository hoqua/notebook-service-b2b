import styled from 'styled-components'
export const StyledHeaderTitle = styled.p`
  font-size: 0.9rem;
  font-weight: 500;
  line-height: 1rem;
`

export const PhoneTitle = styled(StyledHeaderTitle)`
  display: flex;
  align-items: center;
`

export const StyledHeader = styled.header`
  width: 100%;
  position: fixed;
  display: flex;
  justify-content: center;
  height: 62px;
  background-color: #fff;
  box-shadow: 0 3px 20px rgba(17, 40, 120, 0.07);
`

export const InnerHeaderContainer = styled.header`
  height: 100%;
  width: 100%;
  max-width: 1170px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
