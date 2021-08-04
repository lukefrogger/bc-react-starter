import { css } from '@emotion/react'

export const Main = css`
  width: 100%;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  justify-items: center;
  padding: 20px 0;

  @media (min-width: 720px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: 1024px) {
    padding: 48px 0;
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`
export const Container = css`
  max-width: 1208px;
  margin: 0 20px;

  @media (min-width: 1228px) {
    margin: 0 auto;
  }
`
