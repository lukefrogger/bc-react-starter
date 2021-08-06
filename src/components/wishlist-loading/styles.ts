import { css, SerializedStyles, Theme } from '@emotion/react'
import { getBaseStyle } from '@utils/get-base-style'

export const wishlistName = (theme: Theme): SerializedStyles => css`
  width: 80%;
  max-width: 168px;
  height: 28px;
  background: linear-gradient(
    90deg,
    ${theme.colors['neutral-10']} 1.79%,
    ${theme.colors['neutral-40']} 100.4%,
    ${theme.colors['neutral-10']} 135.12%
  );
  border-radius: 14px;
`

export const wishlistItem = (theme: Theme): SerializedStyles => css`
  width: 18%;
  max-width: 48px;
  height: 18px;
  background: linear-gradient(
    90deg,
    ${theme.colors['neutral-10']} 1.79%,
    ${theme.colors['neutral-40']} 74.42%,
    ${theme.colors['neutral-10']} 100%
  );
  border-radius: 14px;
`

export const wishlistType = (theme: Theme): SerializedStyles => css`
  width: 18%;
  max-width: 48px;
  height: 18px;
  background: linear-gradient(
    -90deg,
    ${theme.colors['neutral-10']} 1.79%,
    ${theme.colors['neutral-40']} 180.64%,
    ${theme.colors['neutral-10']} 243.62%
  );
  border-radius: 14px;
`
export const wishlistActions = css`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`

export const wishlistAction = (theme: Theme): SerializedStyles => css`
  flex-basis: 18%;
  max-width: 48px;
  height: 18px;
  margin-left: 10px;
  background: linear-gradient(
    90deg,
    ${theme.colors['neutral-10']} 1.79%,
    ${theme.colors['neutral-40']} 100.4%,
    ${theme.colors['neutral-10']} 135.12%
  );
  border-radius: 14px;
`
