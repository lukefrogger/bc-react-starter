import { css, SerializedStyles, Theme } from '@emotion/react'

export const Container = css`
  min-width: 260px;
`

export const AddressName = (theme: Theme): SerializedStyles => css`
  display: block;
  width: 80%;
  height: 30px;
  background: linear-gradient(
    90deg,
    ${theme.colors['neutral-10']} 2%,
    ${theme.colors['neutral-30']} 89%
  );
  border-radius: 14px;
`

export const AddressLines = css`
  display: block;
  height: 24px;
  border-radius: 14px;
  margin-bottom: 15px;
`

export const AddressLine1 = (theme: Theme): SerializedStyles => css`
  width: 60%;
  background: linear-gradient(
    90deg,
    ${theme.colors['neutral-10']} 0.8%,
    ${theme.colors['neutral-30']} 60%
  );
`

export const AddressLine2 = (theme: Theme): SerializedStyles => css`
  width: 80%;
  background: linear-gradient(
    90deg,
    ${theme.colors['neutral-10']} 6%,
    ${theme.colors['neutral-30']} 72%
  );
`
export const AddressLine3 = (theme: Theme): SerializedStyles => css`
  width: 40%;
  background: linear-gradient(
    90deg,
    ${theme.colors['neutral-10']} 4%,
    ${theme.colors['neutral-30']} 83%
  );
`

export const AddressBtns = css`
  padding-left: 0;
`

export const AddressBtnsTxt = (theme: Theme): SerializedStyles => css`
  width: 50px;
  margin-bottom: 0;
  background: linear-gradient(
    90deg,
    ${theme.colors['neutral-10']} 3%,
    ${theme.colors['neutral-30']} 65%
  );
`
