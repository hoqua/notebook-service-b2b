import styled from 'styled-components'
import { ReactComponent as ArrowUp } from '../../../assets/icons/arrow-up.svg'

export const RotatedArrow = styled(ArrowUp)`
  transform: rotate(${({ deg }) => deg}deg);
  transition: transform 0.3s ease;
  path {
    fill: ${({ theme, color }) => color || theme.brand.dark};
    stroke: ${({ theme, color }) => color || theme.brand.dark};
  }
`
