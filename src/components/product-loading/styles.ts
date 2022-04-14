import { css, SerializedStyles, Theme } from '@emotion/react'

export const container = (): SerializedStyles => css`
  width: 100%;
  --horizontal-spacing: 24px;
  max-width: calc(1208px + (var(--horizontal-spacing) * 2));
  margin: 0 auto;
  padding: 16px;
`

export const galleryWrapper = (): SerializedStyles => css`
  display: flex;
  flex-direction: column-reverse;

  @media (min-width: 768px) {
    display: grid;
    grid-gap: 40px;
    grid-column: span 1 / span 1;
    grid-template-columns: 80px 1fr;
  }

  @media (min-width: 1024px) {
    grid-column: span 7 / span 7;
  }

  .image-gallery-thumbnails-wrapper {
    margin-top: 40px;
    display: flex;
    flex-direction: row;

    @media (min-width: 768px) {
      margin-top: 0;
      margin-right: 40px;
      flex-direction: column;
    }
  }
`

export const galleryImage = (theme: Theme): SerializedStyles => css`
  display: block;
  float: right;
  width: 100%;
  max-width: 584px;
  max-height: 584px;
  background: linear-gradient(
    90deg,
    ${theme.colors['neutral-10']} 1.79%,
    ${theme.colors['neutral-30']} 127.36%,
    ${theme.colors['neutral-10']} 171.58%
  );
  aspect-ratio: 1/1;
`

export const galleryThumbnail = (theme: Theme): SerializedStyles => css`
  display: block;
  width: 80px;
  height: 80px;
  background: linear-gradient(
    90deg,
    ${theme.colors['neutral-10']} 1.79%,
    ${theme.colors['neutral-30']} 127.36%,
    ${theme.colors['neutral-10']} 171.58%
  );
  aspect-ratio: 1/1;
  margin-top: 0;
  margin-right: 24px;

  @media (min-width: 768px) {
    margin-top: 24px;
    margin-right: 0;

    &:first-child {
      margin-top: 0;
    }
  }
`

export const wishlistActions = css`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`

export const productDescriptionRow = (theme: Theme): SerializedStyles => css`
  flex-basis: 18%;
  max-width: 48px;
  height: 18px;
  margin-left: 10px;
  background: linear-gradient(
    90deg,
    ${theme.colors['neutral-10']} 1.79%,
    ${theme.colors['neutral-30']} 100%
  );
  border-radius: 14px;
`

export const productBrand = (theme: Theme): SerializedStyles => css`
  display: block;
  border-radius: 8px;
  width: 168px;
  height: 16px;
  background: linear-gradient(
    90deg,
    ${theme.colors['neutral-10']} 1.79%,
    ${theme.colors['neutral-30']} 100%
  );
`

export const productName = (theme: Theme): SerializedStyles => css`
  display: block;
  margin-top: 28px;
  border-radius: 14px;
  width: 100%;
  height: 28px;
  background: linear-gradient(
    90deg,
    ${theme.colors['neutral-10']} 1.79%,
    ${theme.colors['neutral-30']} 74.42%,
    ${theme.colors['neutral-10']} 100%
  );
`

export const productPrice = (theme: Theme): SerializedStyles => css`
  display: block;
  margin-top: 34px;
  border-radius: 8px;
  width: 64px;
  height: 16px;
  background: linear-gradient(
    90deg,
    ${theme.colors['neutral-10']} 1.79%,
    ${theme.colors['neutral-30']} 434.39%,
    ${theme.colors['neutral-10']} 586.72%
  );
`

export const productRating = (theme: Theme): SerializedStyles => css`
  display: block;
  margin-top: 28px;
  border-radius: 8px;
  width: 168px;
  height: 16px;
  background: linear-gradient(
    90deg,
    ${theme.colors['neutral-10']} 1.79%,
    ${theme.colors['neutral-30']} 165.99%,
    ${theme.colors['neutral-10']} 223.81%
  );
`

export const productOption = (theme: Theme): SerializedStyles => css`
  display: block;
  margin-top: 40px;
  border-radius: 8px;
  width: 92px;
  height: 16px;
  background: linear-gradient(
    90deg,
    ${theme.colors['neutral-10']} 1.79%,
    ${theme.colors['neutral-30']} 302.73%,
    ${theme.colors['neutral-10']} 408.7%
  );
`

export const productAddToCart = (theme: Theme): SerializedStyles => css`
  display: block;
  margin-top: 20px;
  border-radius: 24px;
  width: 100%;
  height: 48px;
  background: linear-gradient(
    90deg,
    ${theme.colors['neutral-10']} 1.79%,
    ${theme.colors['neutral-30']} 74.42%,
    ${theme.colors['neutral-10']} 100%
  );
`

export const productDetailRow = (): SerializedStyles => css`
  margin-bottom: 40px;
  padding-top: 40px;

  @media (min-width: 960px) {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  }
`

export const productDetailColumnLeft = (): SerializedStyles => css`
  max-width: 272px;

  @media (min-width: 960px) {
    flex: 0 1 272px;
  }
`

export const productDetailColumnRight = (): SerializedStyles => css`
  flex: 1;

  @media (min-width: 960px) {
    padding-left: 144px;
  }
`

export const productDetailLabel = (theme: Theme): SerializedStyles => css`
  display: block;
  border-radius: 14px;
  width: 100%;
  height: 28px;
  background: linear-gradient(
    90deg,
    ${theme.colors['neutral-10']} 1.79%,
    ${theme.colors['neutral-30']} 74.42%,
    ${theme.colors['neutral-10']} 100%
  );
`

export const productDetailLine1 = (theme: Theme): SerializedStyles => css`
  display: block;
  border-radius: 8px;
  width: 90%;
  height: 16px;
  background: linear-gradient(
    90deg,
    ${theme.colors['neutral-10']} 1.79%,
    ${theme.colors['neutral-30']} 81.81%,
    ${theme.colors['neutral-10']} 109.98%
  );
`

export const productDetailLine2 = (theme: Theme): SerializedStyles => css`
  display: block;
  margin-top: 20px;
  border-radius: 8px;
  width: 78%;
  height: 16px;
  background: linear-gradient(
    90deg,
    ${theme.colors['neutral-10']} 1.79%,
    ${theme.colors['neutral-30']} 94.4%,
    ${theme.colors['neutral-10']} 127.01%
  );
`

export const productDetailLine3 = (theme: Theme): SerializedStyles => css`
  display: block;
  margin-top: 20px;
  border-radius: 8px;
  width: 98%;
  height: 16px;
  background: linear-gradient(
    90deg,
    ${theme.colors['neutral-10']} 1.79%,
    ${theme.colors['neutral-30']} 75.77%,
    ${theme.colors['neutral-10']} 101.83%
  );
`
