import { css, SerializedStyles, Theme } from '@emotion/react'

export const backdrop = css`
  background-color: rgba(25, 25, 25, 0.8);
  position: fixed;
  inset: 0px;
  z-index: 999;
`

export const dialog = (theme: Theme): SerializedStyles => css`
  background-color: ${theme.colors['neutral-0']};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-height: calc(100vh - 56px);
  outline: 0px;
  z-index: 999;
  max-width: 792px;
  width: calc(100vw - 32px);
  padding: 16px 20px 20px;
  ${theme.mq[1]} {
    width: calc(100vw - 56px);
    padding: 48px 56px 56px;
  }
`

export const header = css`
  position: relative;
  padding-bottom: 56px;
`

export const title = css`
  margin: 0 40px;
  text-align: center;
`

export const close = (theme: Theme): SerializedStyles => css`
  position: absolute;
  top: 4px;
  right: 0;
  padding: 8px;
  margin-right: -8px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  color: ${theme.colors.neutral};
  :hover {
    opacity: 0.8;
  }
`
