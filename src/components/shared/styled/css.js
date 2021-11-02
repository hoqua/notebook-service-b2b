import { css } from 'styled-components'

export const Z_INDEX = {
  header: 1,
  select: 1,
  modal: 999,
  modalLoading: 1000
}

export const CARD_PADDING = '20px'
export const NOTEBOOK_IMG_HEIGHT = '70px'

export const darkBorder = css`
  border: 1px solid ${({ theme }) => theme.brand.dark};
  border-radius: 4px;
  transition: border 0.3s ease;
`

export const grayBorder = css`
  border: 1px solid ${({ theme }) => theme.brand.gray};
  border-radius: 4px;
  transition: border 0.3s ease;
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

export const largeGap = css`
  gap: 30px;
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

export const scrollFix = css`
  padding-left: calc(100vw - 100%);
`
