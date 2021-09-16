import { css, SerializedStyles, Theme } from '@emotion/react'
import { CSSPrimitive } from 'unsafe-bc-react-components/dist/theme/types'

import { getBaseStyle } from '@utils/get-base-style'

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

export const link = (theme: Theme): SerializedStyles => css`
  ${getBaseStyle(theme.components.Button.variants?.link, theme)}
  text-decoration: none;
  em {
    text-decoration: underline;
    text-underline-offset: 4px;
  }
  width: fit-content;
  padding: 16px;
  margin-left: -16px;
  margin-top: 8px;
`
