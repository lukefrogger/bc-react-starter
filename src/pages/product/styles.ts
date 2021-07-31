import { css, SerializedStyles, Theme } from '@emotion/react'
import { getBaseStyle } from '@utils/get-base-style'

export const container = css`
  --horizontal-spacing: 24px;
  max-width: calc(1208px + (var(--horizontal-spacing) * 2));
  margin: 0 auto;
  padding: 0 var(--horizontal-spacing);
`

export const grid = (isLimited?: boolean): ReturnType<typeof css> => css`
  --horizontal-setback: 104px;
  padding-bottom: ${isLimited ? 0 : 48}px;
  @media (min-width: 1024px) {
    padding-left: var(--horizontal-setback);
    display: flex;
    column-gap: 40px;
    > * {
      min-width: ${isLimited ? 368 : 480}px;
    }
  }
`

export const image = (isLimited?: boolean): ReturnType<typeof css> => css`
  background-color: gainsboro;
  height: 340px;
  width: 100%;
  position: relative;

  margin-bottom: 20px;
  @media (min-width: 1024px) {
    margin-bottom: inherit;
    height: ${isLimited ? 368 : 584}px;
    width: ${isLimited ? 368 : 584}px;

    ::before {
      position: absolute;
      width: 84px;
      height: 84px;
      background-color: gainsboro;
      content: '';
      left: -104px;
    }
  }
`

export const product = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const productDescription = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
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
  gap: 12px;
  padding-top: 16px;
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
