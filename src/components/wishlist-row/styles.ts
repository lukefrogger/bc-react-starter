import { css, SerializedStyles, Theme } from '@emotion/react'

export const container = (theme: Theme): SerializedStyles => css`
  display: flex;
  justify-content: space-between;
  padding: 56px 0;
  flex-wrap: wrap;
  gap: 16px;
  ${theme.mq[2]} {
    gap: 42px;
  }
  border-bottom: 2px solid ${theme.colors['neutral-15']};
  :first-of-type {
    border-top: 2px solid ${theme.colors['neutral-15']};
  }
`

export const columnLeft = (theme: Theme): SerializedStyles => css`
  display: flex;
  justify-content: space-between;
  gap: 32px;
  width: 100%;
  align-items: flex-start;
  ${theme.mq[2]} {
    flex: 1;
  }
`
export const columnRight = (theme: Theme): SerializedStyles => css`
  ${columnLeft(theme)}
  flex-wrap: wrap;
`

export const name = css`
  font-family: 'Red Hat Display';
  font-size: 26px;
  font-style: normal;
  font-weight: 700;
  color: #000;
  text-decoration: none;
  :hover {
    text-decoration: underline;
  }
`
export const items = css`
  display: flex;
  gap: 8px;
  white-space: nowrap;
`

export const status = css`
  display: flex;
  gap: 8px;
  align-items: center;
`

export const actions = css`
  display: flex;
  gap: 16px;
`

export const action = css`
  padding-left: 0;
  padding-right: 0;
  display: flex;
  gap: 8px;
  align-items: center;
`
