import { css } from '@emotion/react'

export const Container = css`
  --horizontal-spacing: 24px;
  max-width: calc(1208px + (var(--horizontal-spacing) * 2));
  padding: 0 var(--horizontal-spacing);
  margin: 0 auto;
`

export const Card = css`
  background-position: center;
  min-height: 228px;
  margin-left: calc(var(--horizontal-spacing) * -1);
  margin-right: calc(var(--horizontal-spacing) * -1);
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
  row-gap: 24px;
  @media (min-width: 720px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-template-rows: repeat(2, minmax(0, 1fr));
    row-gap: 32px;
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

export const Pagination = css`
  padding: 56px 0 72px;
`

export const Meta = css`
  padding-bottom: 12px;
  display: flex;
  justify-content: space-between;
`
