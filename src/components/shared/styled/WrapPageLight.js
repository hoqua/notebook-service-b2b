import styled from 'styled-components'
import media from 'styled-media-query'

export const WrapPageLight = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: ${({ theme }) => theme.bg.light};
  
  ${media.greaterThan('medium')`
    /* screen width is greater than 1170px (large) */
      align-items: center;
  `}
`
