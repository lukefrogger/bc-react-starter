import { css } from '@emotion/react'

export const form = css`
  padding-top: 24px;
  * input {
    max-width: none;
  }
`

export const description = css`
  padding-bottom: 8px;
`

export const checkbox = css`
  display: flex;
  align-items: center;
  margin-top: 32px;
  input {
    margin-right: 8px;
    width: 24px;
    height: 24px;
    border-radius: 4px;
    &:checked {
      filter: contrast(5) brightness(90%) grayscale(100%);
    }
  }
  p {
    display: inline-block;
  }
`

export const footer = css`
  display: flex;
  justify-content: center;
  padding-top: 56px;
`
