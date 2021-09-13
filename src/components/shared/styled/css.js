import { css } from 'styled-components'

export const darkBorder = css`
  border: 1px solid ${({ theme }) => theme.brand.dark};
  border-radius: 4px;
`

export const grayBorder = css`
  border: 1px solid ${({ theme }) => theme.brand.gray};
  border-radius: 4px;
`

export const darkColor = css`
  color: ${({ theme }) => theme.brand.dark};
`

export const hoverDarkBorder = css`
  &:hover {
    ${darkBorder}
  }
`

export const smallGap = css`
  gap: 6px;
`

export const mediumGap = css`
  gap: 12px;
`

export const flexAlign = css`
  display: flex;
  align-items: center;
`
export const flexAlignJustify = css`
    ${flexAlign};
    justify-content: center;
`

export const fullPage = css`
    height: 100%;
    width: 100%;
`
