import { css, SerializedStyles, Theme } from '@emotion/react'

export const SkipContent = (theme: Theme): SerializedStyles => css`
  background: #f5f5f5;
  color: #000;
  left: 5px;
  top: 5px;
  padding: 20px 12px;
  text-decoration: none;
  position: absolute;
  z-index: 999;
  transform: translateY(-100%);
  transition: transform 0.3s;
  &:focus {
    transform: translateY(0%);
  }
`
