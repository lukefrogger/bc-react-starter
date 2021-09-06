import { css, SerializedStyles, Theme } from '@emotion/react'

export const button = css`
  cursor: pointer;
  border: none;
  padding: 8px;
  background-color: transparent;
  display: flex;
  position: relative;
  width: 36px;
`

export const userButton = css`
  ${button};
  width: 53px;
  display: flex;
  align-items: center;
  gap: 5px;
`

export const userMenu = (theme: Theme): SerializedStyles => css`
  padding: 2px 24px;
  background: ${theme.colors['neutral-0']};
  border: 2px solid ${theme.colors['neutral-15']};
  margin-top: 25px;
  z-index: 3;
`

export const userMenuItem = (theme: Theme): SerializedStyles => css`
  display: block;
  background: none;
  border: none;
  font-size: 19px;
  text-decoration: none;
  color: ${theme.colors['neutral-95']};
  margin: 16px 0;
  text-align: center;

  &:hover {
    color: ${theme.colors.primary};
  }

  ${theme.mq[2]} {
    text-align: left;
  }
`

export const category = (theme: Theme): SerializedStyles => css`
  ${theme.typography['display-xx-small'] as any}
  color: ${theme.colors['neutral-95']};
  text-align: center;
  padding: 8px;
  text-transform: uppercase;
  text-decoration: none;
  display: flex;
  align-items: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
  gap: 12px;
  align-self: center;
  :hover,
  &[aria-expanded='true'] {
    color: ${theme.colors.primary};
  }
`
