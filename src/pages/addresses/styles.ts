import { css } from '@emotion/react'

export const Container = css`
  max-width: 1208px;
  padding: 0 20px;
  margin: 0 auto 60px;
`

export const Title = css`
  text-align: center;
  margin: 64px 0 50px;
`

export const Button = css`
  margin: 0 auto 60px;
  display: block;
`

export const Grid = css`
  display: grid;
  max-width: 792px;
  column-gap: 40px;
  row-gap: 40px;
  margin: 0 auto;
  justify-items: stretch;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`
