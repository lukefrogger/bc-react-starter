import { css, SerializedStyles, Theme } from '@emotion/react'

export const Container = (theme: Theme): SerializedStyles => css`
  width: 100%;
  background: grey;
  text-align: center;
  background: ${theme.colors['neutral-10']};
  overflow: auto;
  white-space: nowrap;
`

export const Link =
  (isActive: boolean) =>
  (theme: Theme): SerializedStyles =>
    css`
      ${theme.typography['body-small'] as any};
      color: ${theme.colors[isActive ? 'primary-60' : 'neutral-95']};
      display: inline-block;
      padding: 16px 40px 14px;
      text-decoration: none;
      border-bottom: 2px solid
        ${theme.colors[isActive ? 'primary-60' : 'neutral-10']};

      &:hover {
        color: ${theme.colors['primary-60']};
      }
    `
