import { css, SerializedStyles, Theme } from '@emotion/react'

export const container = (theme: Theme): SerializedStyles => css`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 18px 32px;
  align-items: center;
  z-index: 20;
  ${theme.mq[2]} {
    padding: 24px 32px;
  }
  > * {
    :first-of-type {
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

export const logo = css`
  background-color: transparent;
  border: none;
  cursor: pointer;
`

export const icon = css`
  cursor: pointer;
  border: none;
  padding: 8px;
  background-color: transparent;
  display: flex;
  position: relative;
  width: 36px;
  z-index: 20;
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
  top: 48px;
  height: calc(100vh - 48px);
  padding: 60px 0 20px;
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

export const subcategory = (theme: Theme): SerializedStyles => css`
  ${category(theme)}
  ${theme.typography.body as any}
  text-transform: none;
  justify-content: space-between;
`

export const popover = (theme: Theme): SerializedStyles => css`
  background-color: ${theme.colors['neutral-0']};
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border: 2px solid ${theme.colors['neutral-15']};
  border-top-color: ${theme.colors.primary};
  a,
  button {
    width: 100%;
    padding-left: 20px;
    padding-right: 32px;
  }
`
export const popoverNested = (theme: Theme): SerializedStyles => css`
  ${popover(theme)}
  background-color: ${theme.colors['neutral-10']};
  border: none;
`

export const disclosure = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 8px;
`

export const disclosureNested = (theme: Theme): SerializedStyles => css`
  ${disclosure}
  background-color: ${theme.colors['neutral-10']};
  margin: -8px 0;
  padding: 8px;
`

export const desktopMenu = css`
  display: flex;
  gap: 16px;
`
