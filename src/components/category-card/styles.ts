import { css, SerializedStyles, Theme } from '@emotion/react'

export const Card =
  (image?: string) =>
  (theme: Theme): SerializedStyles =>
    css`
      ${theme.typography['display-small'] as any};
      background: ${theme.colors['neutral-15']};
      color: ${theme.colors['neutral-95']};
      width: 100%;
      min-height: 200px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      background-size: cover;
      background-position: center;
      background-image: url(${image});
      padding: 24px;
      text-align: center;
    `
