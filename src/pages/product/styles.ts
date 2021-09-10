import { css, SerializedStyles, Theme } from '@emotion/react'

import { getBaseStyle } from '@utils/get-base-style'

export const container = css`
  --horizontal-spacing: 24px;
  max-width: calc(1208px + (var(--horizontal-spacing) * 2));
  margin: 0 auto;
  padding: 16px 0;
`

export const grid = (isLimited?: boolean): ReturnType<typeof css> => css`
  padding-bottom: ${isLimited ? 0 : 48}px;
  display: grid;
  grid-gap: 40px;
  align-items: flex-start;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  @media (min-width: 1024px) {
    grid-template-columns: repeat(12, minmax(0, 1fr));
  }
`

export const gallery = (theme: Theme): SerializedStyles => css`
  grid-column: span 1 / span 1;
  @media (min-width: 1024px) {
    grid-column: span 7 / span 7;
  }
  .image-gallery-thumbnails-wrapper.left {
    margin: 0;
    margin-right: 24px;
    width: 80px;
    .image-gallery-thumbnail {
      width: 80px;
      &.active,
      &:hover {
        border-width: 3px;
        border-color: ${theme.colors['primary-60']};
      }
      + .image-gallery-thumbnail {
        margin-top: 12px;
      }
    }
  }
  .image-gallery-icon:hover {
    color: ${theme.colors.primary};
  }
  .image-gallery-bullets .image-gallery-bullet:hover {
    border-color: ${theme.colors['neutral-40']};
    background: ${theme.colors['neutral-40']};
  }
`

export const product = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media (min-width: 1024px) {
    grid-column: span 5 / span 5;
  }
`

export const productDescription = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
`
export const productOptions = css`
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`

export const starRow = css`
  display: flex;
  align-items: center;
  gap: 16px;
`

export const link = (theme: Theme): SerializedStyles => css`
  ${getBaseStyle(theme.components.Button.variants?.link, theme)}
`

export const row = css`
  display: flex;
  gap: 16px;
  padding-top: 16px;
  flex-wrap: wrap;
`

export const productDetail = css`
  --horizontal-setback: 104px;
  @media (min-width: 1024px) {
    padding-left: var(--horizontal-setback);
  }
  > * {
    :not(:first-of-type) {
      border-top: 2px solid #eaeaea;
    }
  }
`
export const productDetailRow = css`
  display: flex;
  justify-content: space-between;
  padding-top: 40px;
  padding-bottom: 40px;
  gap: 40px;
  > * {
    max-width: 580px;
  }
  flex-direction: column;
  @media (min-width: 1024px) {
    flex-direction: row;
  }
`

export const reviewList = css`
  > * {
    padding-bottom: 20px;
    :not(:first-of-type) {
      padding-top: 20px;
      border-top: 2px solid #eaeaea;
    }
  }
`

export const relatedProducts = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  @media (min-width: 1024px) {
    flex-wrap: nowrap;
  }
`
