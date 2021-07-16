import { css, SerializedStyles, Theme } from '@emotion/react'
import { CSSPrimitive } from 'unsafe-bc-react-components/dist/theme/types'

export const checkbox = (theme: Theme): SerializedStyles => css`
  padding: 24px 0;
  display: flex;
  align-items: center;
  p {
    margin-left: 16px;
    display: inline-block;
    ${theme.typography['body-large'] as CSSPrimitive}
  }
  border-bottom: 2px solid ${theme.colors['neutral-15']};
  :first-of-type {
    border-top: 2px solid ${theme.colors['neutral-15']};
  }
`

export const list = css`
  display: flex;
  flex-direction: column;
`

export const footer = css`
  display: flex;
  justify-content: center;
  padding-top: 56px;
`
