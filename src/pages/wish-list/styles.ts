import { css, SerializedStyles, Theme } from '@emotion/react'
import { CSSPrimitive } from 'unsafe-bc-react-components/dist/theme/types'

export const container = css`
  --horizontal-spacing: 32px;
  max-width: calc(1208px + var(--horizontal-spacing));
  margin: 0 auto;
  padding-bottom: 120px;
  padding: var(--horizontal-spacing);
`
export const header = (theme: Theme): SerializedStyles => css`
  display: flex;
  padding: 48px 0 8px;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 32px;
  white-space: nowrap;
  > * {
    :first-of-type,
    :last-of-type {
      flex: 1;
    }
    :last-of-type {
      ${theme.mq[1]} {
        justify-content: flex-end;
      }
    }
  }
`

export const title = css`
  white-space: normal;
`

export const titleWrapper = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const statusWrapper = (theme: Theme): SerializedStyles => css`
  display: flex;
  padding-bottom: 32px;
  ${theme.mq[1]} {
    padding-bottom: 64px;
    justify-content: center;
  }
`

export const actions = css`
  background-color: red;
`

export const back = (theme: Theme): SerializedStyles => css`
  ${theme.typography['body-small'] as CSSPrimitive}
  svg {
    margin-right: 16px;
  }
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
`

export const wrapper = css`
  max-width: 688px;
  margin: 0 auto;
`

export const badge = (theme: Theme): SerializedStyles => css``
