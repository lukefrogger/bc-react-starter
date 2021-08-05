import { css, SerializedStyles, Theme } from '@emotion/react'
import { CSSPrimitive } from 'unsafe-bc-react-components/dist/theme/types'

export const Container = css`
  max-width: 832px;
  margin: 0 auto 60px;
  padding: 0 20px;
`

export const Centered = css`
  text-align: center;
  display: block;
  margin: 0 auto;
`

export const Link = (theme: Theme): SerializedStyles => css`
  ${theme.typography['body-small'] as CSSPrimitive};
  color: ${theme.colors['neutral-95']};
`

export const Field = css`
  margin-bottom: 32px;
`

export const Optional = ({ typography, colors }: Theme): any => css`
  ${typography['body-small'] as CSSPrimitive}
  color: ${colors['neutral-55']};
`

export const Description = css`
  margin: 40px 0 64px;
  text-align: center;
`

export const Button = css`
  margin: 32px auto 24px;
`

export const Heading = ({ typography, colors }: Theme): any => css`
  ${typography.overline as CSSPrimitive}
  color: ${colors['neutral-55']};
  margin-bottom: 24px;
  text-transform: uppercase;
`

export const FieldGrid = css`
  grid-template-columns: 1fr;
  display: grid;

  @media (min-width: 452px) {
    grid-template-columns: minmax(210px, 376px) minmax(210px, 376px);
    column-gap: 32px;
  }
`

export const Fieldset = css`
  margin-bottom: 48px;
`
