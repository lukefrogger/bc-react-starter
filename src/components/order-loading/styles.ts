import { css, SerializedStyles, Theme } from '@emotion/react'

import { getBaseStyle } from '@utils/get-base-style'

export const OrderRow = (theme: Theme): SerializedStyles => css`
  ${getBaseStyle(theme.components.OrderRow.OrderRow, theme)}
`
export const Header = (theme: Theme): SerializedStyles => css`
  ${getBaseStyle(theme.components.OrderRow.Header, theme)}
`

export const Products = (theme: Theme): SerializedStyles => css`
  ${getBaseStyle(theme.components.OrderRow.Products, theme)}
`

export const InfoRow = (theme: Theme): SerializedStyles => css`
  ${getBaseStyle(theme.components.OrderRow.InfoRow, theme)}
`

export const OrderNumber = (theme: Theme): SerializedStyles => css`
  width: 80%;
  max-width: 168px;
  height: 16px;
  background: linear-gradient(
    90deg,
    ${theme.colors['neutral-10']} 1.79%,
    ${theme.colors['neutral-30']} 100.4%
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
    ${theme.colors['neutral-10']} 12%,
    ${theme.colors['neutral-30']} 78%
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
    ${theme.colors['neutral-30']} 90%
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
    ${theme.colors['neutral-30']} 80%
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
    ${theme.colors['neutral-10']} 10.98%,
    ${theme.colors['neutral-30']} 57.82%
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
    ${theme.colors['neutral-10']} 1.79%,
    ${theme.colors['neutral-30']} 98%
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
    ${theme.colors['neutral-10']} 5%,
    ${theme.colors['neutral-30']} 86%
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
    ${theme.colors['neutral-30']} 80%
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
    ${theme.colors['neutral-10']} 3%,
    ${theme.colors['neutral-30']} 86%
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
    ${theme.colors['neutral-10']} 7%,
    ${theme.colors['neutral-30']} 96%
  );
  border-radius: 14px;
  display: block;
`
