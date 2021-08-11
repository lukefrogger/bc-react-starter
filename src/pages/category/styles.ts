import { css, SerializedStyles, Theme } from '@emotion/react'
import { CSSPrimitive } from 'unsafe-bc-react-components/dist/theme/types'

export const Container = css`
  max-width: 1208px;
  margin: 0 auto;
`
export const Main = css`
  display: flex;
  flex: 1;
  padding: 48px 0;
`
export const Grid = css`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  justify-items: center;
  @media (min-width: 720px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-template-rows: repeat(2, minmax(0, 1fr));
  }
  img {
    max-height: none !important;
  }
`

export const Content = css`
  width: 100%;
  @media (min-width: 1024px) {
    margin-right: -24px;
  }
`

export const Meta = css`
  padding: 0 24px 12px;
  display: flex;
  justify-content: space-between;
`
