import { css, SerializedStyles, Theme } from '@emotion/react'

export const container = css`
  max-width: 1208px;
  margin: 0 auto;
`

export const main = css`
  display: flex;
  flex: 1;
  padding: 48px 0;
`

export const grid = (theme: Theme): SerializedStyles => css`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  ${theme.mq[1]} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-template-rows: repeat(2, minmax(0, 1fr));
  }
  ${theme.mq[4]} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-template-rows: repeat(2, minmax(0, 1fr));
  }
  img {
    max-height: none !important;
  }
`
