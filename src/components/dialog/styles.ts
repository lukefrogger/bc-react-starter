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
  padding: 20px;
  overflow-y: scroll;
  ${theme.mq[1]} {
    width: calc(100vw - 56px);
    padding: 40px;
  }
`

export const header = css`
  position: relative;
  /*   padding-bottom: 32px; */
  padding-bottom: 56px;
  padding-top: 8px;
`

export const title = css`
  margin: 0 56px;
  text-align: center;
`

export const close = (theme: Theme): SerializedStyles => css`
  --padding: 8px;
  --spacing: 40px;
  position: absolute;
  top: calc(var(--spacing) - var(--padding));
  right: var(--spacing);
  z-index: 1;
  padding: var(--padding);
  margin-right: calc(var(--padding) * -1);
  border: none;
  background-color: transparent;
  cursor: pointer;
  color: ${theme.colors.neutral};
  :hover {
    opacity: 0.8;
  }
`
export const back = (theme: Theme): SerializedStyles => css`
  ${close(theme)}
  right: initial;
  margin-right: initial;
  left: var(--spacing);
  margin-left: calc(var(--padding) * -1);
`
