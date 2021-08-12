import { css, SerializedStyles, Theme } from '@emotion/react'

export const container = css`
  padding: 32px 0;
`

export const link = (theme: Theme): SerializedStyles => css`
  ${theme.typography['body-small'] as any};
  color: ${theme.colors['neutral-55']};
  text-decoration: none;

  &:hover {
    color: ${theme.colors['neutral-95']};
  }

  &:after {
    content: '/';
    color: ${theme.colors['neutral-55']};
    display: inline-block;
    padding: 0 8px;
  }

  &:last-child {
    color: ${theme.colors['neutral-95']};

    &:after {
      display: none;
    }
  }
`
