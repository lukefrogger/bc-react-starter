import { css, SerializedStyles, Theme } from '@emotion/react'

export const OrderRow = (theme: Theme): SerializedStyles => css`
  ${theme.components.OrderRow.OrderRow as any};
  display: grid;
  column-gap: 48px;
  row-gap: 24px;
  border-bottom: 2px solid ${theme.colors['neutral-15']};
  padding: 56px 0;

  &:first-of-type {
    border-top: 2px solid ${theme.colors['neutral-15']};
  }
  ${theme.mq[1]} {
    grid-template-columns: 250px auto 272px;
  }
`
export const Header = (theme: Theme): SerializedStyles => css`
  ${theme.components.OrderRow.Header as any};
`

export const Products = (theme: Theme): SerializedStyles => css`
  ${theme.components.OrderRow.Products as any};
`

export const InfoRow = (theme: Theme): SerializedStyles => css`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`

export const OrderNumber = (theme: Theme): SerializedStyles => css`
  width: 80%;
  max-width: 168px;
  height: 16px;
  background: linear-gradient(
    90deg,
    ${theme.colors['neutral-10']} 1.79%,
    ${theme.colors['neutral-40']} 100.4%,
    ${theme.colors['neutral-10']} 135.12%
  );
  border-radius: 14px;
  margin-bottom: 16px;
`
export const OrderStatus = (theme: Theme): SerializedStyles => css`
  width: 100%;
  max-width: 228px;
  height: 28px;
  background: linear-gradient(
    90deg,
    ${theme.colors['neutral-10']} 1.79%,
    ${theme.colors['neutral-40']} 74.42%,
    ${theme.colors['neutral-10']} 100%
  );
  border-radius: 14px;
  margin-bottom: 23px;
`

export const OrderDetails = (theme: Theme): SerializedStyles => css`
  width: 50%;
  max-width: 94px;
  height: 16px;
  background: linear-gradient(
    90deg,
    ${theme.colors['neutral-10']} 1.79%,
    ${theme.colors['neutral-40']} 180.64%,
    ${theme.colors['neutral-10']} 243.62%
  );
  border-radius: 14px;
`

export const ProductDetails = (theme: Theme): SerializedStyles => css`
  ${theme.components.OrderRow.Product as any};
`

export const ProductImage = (theme: Theme): SerializedStyles => css`
  width: 79px;
  height: 80px;
  background: linear-gradient(
    90deg,
    ${theme.colors['neutral-10']} 1.79%,
    ${theme.colors['neutral-40']} 255.11%,
    ${theme.colors['neutral-10']} 344.3%
  );
`
export const ProductWrapper = css`
  flex: 1;
`

export const ProductName = (theme: Theme): SerializedStyles => css`
  width: 100%;
  max-width: 167px;
  height: 16px;
  background: linear-gradient(
    90deg,
    ${theme.colors['neutral-10']} -61.98%,
    ${theme.colors['neutral-40']} 57.82%,
    ${theme.colors['neutral-10']} 100%
  );
  border-radius: 14px;
  display: block;
  margin-bottom: 16px;
`

export const ProductDesc = (theme: Theme): SerializedStyles => css`
  width: 50%;
  max-width: 87px;
  height: 16px;
  background: linear-gradient(
    90deg,
    ${theme.colors['neutral-10']} -120.69%,
    ${theme.colors['neutral-40']} 111.39%,
    ${theme.colors['neutral-10']} 193.1%
  );
  border-radius: 14px;
  display: block;
`

export const Ordered = (theme: Theme): SerializedStyles => css`
  width: 70%;
  max-width: 60px;
  height: 16px;
  background: linear-gradient(
    90deg,
    ${theme.colors['neutral-10']} 1.79%,
    ${theme.colors['neutral-40']} 333.89%,
    ${theme.colors['neutral-10']} 450.83%
  );
  border-radius: 14px;
  display: block;
`

export const OrderedTotal = (theme: Theme): SerializedStyles => css`
  width: 90%;
  max-width: 93px;
  height: 16px;
  background: linear-gradient(
    90deg,
    ${theme.colors['neutral-10']} 1.79%,
    ${theme.colors['neutral-40']} 215.58%,
    ${theme.colors['neutral-10']} 290.86%
  );
  border-radius: 14px;
  display: block;
`

export const OrderedDate = (theme: Theme): SerializedStyles => css`
  width: 100%;
  max-width: 105px;
  height: 16px;
  background: linear-gradient(
    90deg,
    ${theme.colors['neutral-10']} -155.24%,
    ${theme.colors['neutral-40']} 33.53%,
    ${theme.colors['neutral-10']} 100%
  );
  border-radius: 14px;
  display: block;
`

export const OrderedPrice = (theme: Theme): SerializedStyles => css`
  width: 100%;
  max-width: 105px;
  height: 16px;
  background: linear-gradient(
    90deg,
    ${theme.colors['neutral-10']} -156.67%,
    ${theme.colors['neutral-40']} 33.16%,
    ${theme.colors['neutral-10']} 100%
  );
  border-radius: 14px;
  display: block;
`
