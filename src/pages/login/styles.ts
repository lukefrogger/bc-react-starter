import { css, SerializedStyles, Theme } from '@emotion/react'
import { CSSPrimitive } from 'unsafe-bc-react-components/dist/theme/types'

export const container = css`
  max-width: 416px;
  padding: 0 20px;
  margin: 0 auto 120px;
`

export const centered = css`
  text-align: center;
  display: block;
  margin: 0 auto;
`

export const link = (theme: Theme): SerializedStyles => css`
  ${theme.typography['body-small'] as CSSPrimitive};
  color: ${theme.colors['neutral-95']};
`

export const field = css`
  margin-bottom: 32px;
`

export const description = css`
  margin: 40px 0 64px;
  text-align: center;
`

export const button = css`
  margin: 32px auto 24px;
`

export const forgotLink = (theme: Theme): SerializedStyles => css`
  ${link(theme)};
  ${centered}
`
