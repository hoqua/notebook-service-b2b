import React from 'react'
import styled from 'styled-components'
import notebook from '../../../assets/img/notebook.avif'
import { flexAlignJustify } from './css'

const ContentContainer = styled.div`
  background-color: white;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  width: 100%;
  max-width: 1170px;
  min-height: 670px;
`
const LeftContainer = styled.div`
  ${flexAlignJustify};
  padding: 35px 60px 35px 60px;
`
const RightContainer = styled.div`
  background-image: url(${notebook});
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`

export const PublicContentContainer = ({ children }) => {
  return (
    <ContentContainer>
      <LeftContainer>{children}</LeftContainer>

      <RightContainer />
    </ContentContainer>
  )
}
