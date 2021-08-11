import { css, SerializedStyles, Theme } from '@emotion/react'

import { getBaseStyle } from '@utils/get-base-style'

export const container = css`
  --horizontal-spacing: 32px;
  max-width: calc(1208px + var(--horizontal-spacing));
  margin: 0 auto;
  padding-bottom: 120px;
  padding: var(--horizontal-spacing);
`

export const title = css`
  text-align: center;
  padding: 48px 0;
`

export const button = (theme: Theme): SerializedStyles => css`
  ${getBaseStyle(theme.components.Button.variants?.secondary, theme)}
  margin: 0 auto 56px;
  display: block;
`
