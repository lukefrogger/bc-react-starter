import { css, SerializedStyles, Theme } from '@emotion/react'

import { getBaseStyle } from '@utils/get-base-style'

export const Container = css`
  --horizontal-spacing: 24px;
  max-width: calc(1208px + (var(--horizontal-spacing) * 2));
  margin: 0 auto;
  padding: 0 var(--horizontal-spacing);
`

export const Title = css`
  padding: 0 0 24px;
  text-transform: uppercase;
`

export const Grid = css`
  @media (min-width: 1024px) {
    display: flex;
    flex-wrap: wrap;
    column-gap: 10%;
    > * {
      min-width: 320px;
    }
  }
`

export const ProductList = css`
  margin-bottom: 48px;
  flex: 1;
  @media (min-width: 1024px) {
    margin-bottom: inherit;
  }
`

export const Checkout = (theme: Theme): SerializedStyles => css`
  ${getBaseStyle(theme.components.Button.variants?.primary, theme)}
  margin-top: 48px;
  display: block;
  text-decoration: none;
`

export const Features = css`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(176px, 1fr));
  grid-gap: 2rem;
  align-items: center;
  padding: 48px 0;
  @media (min-width: 768px) {
    padding: 80px 0;
  }
`

export const Feature = css`
  display: flex;
  align-items: center;
  gap: 16px;
`
