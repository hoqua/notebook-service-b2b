import styled from 'styled-components'
import { FullPage } from '../styled/Fullpage'
import { flexAlign, flexAlignJustify, scrollFix, Z_INDEX } from '../styled/css'

export const ModalWrapper = styled(FullPage)`
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  height: 100vh;
  max-height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: ${Z_INDEX.modal};

  ${scrollFix}
  ${flexAlignJustify}
`

export const ModalHeader = styled.div`
  ${flexAlign};
  justify-content: space-between;
`
