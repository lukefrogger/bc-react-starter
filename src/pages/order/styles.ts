import { css, Theme } from '@emotion/react'
import { CSSPrimitive } from 'unsafe-bc-react-components/dist/theme/types'

export const Container = css`
  max-width: 1292px;
  padding: 0 20px;
  margin: 0 auto 60px;
`

export const Header = css`
  position: relative;
  padding: 64px 0;
`

export const Title = css`
  text-align: center;
`

export const Button = css`
  margin-top: 40px;
`

export const Link = ({ typography, colors }: Theme): any => css`
  ${typography['body-small'] as CSSPrimitive}
  color: ${colors['neutral-90']};
  text-decoration: none;
  text-align: center;
  display: block;

  @media (min-width: 1024px) {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }

  &:hover {
    text-decoration: underline;
  }

  svg {
    margin-right: 16px;
  }
`

export const Grid = css`
  display: flex;
  flex-direction: column;

  @media (min-width: 1024px) {
    flex-direction: row;
    column-gap: 144px;
  }
`

export const List = css`
  flex: 1;
  margin-bottom: 48px;
`

export const Detail = css`
  min-width: 376px;
`
