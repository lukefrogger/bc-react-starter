import { css, Theme } from '@emotion/react'
import { CSSPrimitive } from 'unsafe-bc-react-components/dist/theme/types'

export const Heading = ({ typography, colors }: Theme): any => css`
  ${typography.overline as CSSPrimitive}
  color: ${colors['neutral-55']};
  margin-bottom: 24px;
  text-transform: uppercase;
`

export const FieldGrid = css`
  display: grid;
  grid-template-columns: 376px 376px;
  column-gap: 32px;
  row-gap: 40px;
`

export const Fieldset = css`
  margin-bottom: 48px;
`

export const ButtonGroup = css`
  display: flex;
  justify-content: center;
  gap: 20px;
`
