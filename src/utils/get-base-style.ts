import { Theme } from '@emotion/react'
import type {
  CSS,
  CSSPrimitive,
} from 'unsafe-bc-react-components/dist/theme/types'

export function getBaseStyle(base: CSS, theme: Theme): CSSPrimitive {
  if (!base) return undefined
  if (typeof base === 'function') return base(theme)
  return base
}
