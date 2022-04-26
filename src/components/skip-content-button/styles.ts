import { css, SerializedStyles, Theme } from '@emotion/react'

export const SkipContent = (theme: Theme): SerializedStyles => css`
  background: ${theme.colors['neutral-10']};
  color: ${theme.colors['neutral-100']};
  left: 5px;
  top: 5px;
  padding: 20px 12px;
  text-decoration: none;
  position: absolute;
  z-index: 999;
  transform: translateY(-110%);
  transition: transform 0.3s;
  &:focus {
    transform: translateY(0%);
  }
`
