import { css, SerializedStyles, Theme } from '@emotion/react'

export const container = css`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 24px 32px;
  align-items: center;
  z-index: 20;
  > * {
    :first-child {
      margin-left: -8px;
      margin-right: 8px;
      flex: 1;
    }
    :last-child {
      margin-right: -8px;
      margin-left: 8px;
      flex: 1;
      justify-content: flex-end;
    }
  }
`

export const section = css`
  display: flex;
  gap: 8px;
`

export const icon = css`
  cursor: pointer;
  border: none;
  padding: 8px;
  background-color: transparent;
  display: flex;
  position: relative;
  width: 36px;
`

export const button = css`
  cursor: pointer;
  border: none;
  padding: 8px;
  background-color: transparent;
  display: flex;
  position: relative;
  width: 36px;
`

export const badge = (theme: Theme): SerializedStyles => css`
  position: absolute;
  right: 4px;
  top: 4px;
  height: 16px;
  width: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${theme.colors.primary};
  color: ${theme.colors['neutral-0']};
  font-family: 'Red Hat Text';
  font-size: 12px;
  font-weight: 700;
  border-radius: 100%;
`
export const mobileMenu = css`
  position: absolute;
  top: 80px;
  height: calc(100vh - 80px);
  padding: 20px 0;
  right: 0;
  left: 0;
  display: flex;
  gap: 16px;
  background-color: white;
  z-index: 10;
  flex-direction: column;
  overflow-y: scroll;
  transition: opacity 250ms ease-in-out, transform 250ms ease-in-out;
  opacity: 0;
  transform-origin: top center;
  transform: rotateX(90deg);
  &[data-enter] {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`
export const category = (theme: Theme): SerializedStyles => css`
  ${theme.typography['display-xx-small'] as any}
  color: ${theme.colors['neutral-95']};
  text-align: center;
  padding: 8px;
  text-transform: uppercase;
  text-decoration: none;
`

export const desktopMenu = css`
  display: flex;
  gap: 16px;
`
