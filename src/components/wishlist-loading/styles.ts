import { css, SerializedStyles, Theme } from '@emotion/react'

export const wishlistName = (theme: Theme): SerializedStyles => css`
  width: 80%;
  max-width: 168px;
  height: 28px;
  background: linear-gradient(
    90deg,
    ${theme.colors['neutral-10']} 1.79%,
    ${theme.colors['neutral-30']} 65%
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
    ${theme.colors['neutral-30']} 74.42%
  );
  border-radius: 14px;
`

export const wishlistType = (theme: Theme): SerializedStyles => css`
  width: 18%;
  max-width: 48px;
  height: 18px;
  background: linear-gradient(
    90deg,
    ${theme.colors['neutral-10']} 1.79%,
    ${theme.colors['neutral-30']} 86%
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
    ${theme.colors['neutral-30']} 100%
  );
  border-radius: 14px;
`
