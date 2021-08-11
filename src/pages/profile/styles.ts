import { css, SerializedStyles, Theme } from '@emotion/react'
import { CSSPrimitive } from 'unsafe-bc-react-components/dist/theme/types'

export const styles = {
  Title: css`
    padding: 60px 0;
    text-align: center;
  `,
  Form: css`
    padding: 8px 0 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  Heading: ({ typography, colors }: Theme): SerializedStyles => css`
    ${typography.overline as CSSPrimitive}
    color: ${colors['neutral-55']};
    margin-bottom: 24px;
    padding: 0 20px;
    text-transform: uppercase;
  `,
  Fieldset: css`
    margin-bottom: 48px;
    width: 100%;
    margin-left: -20px;
    margin-right: -20px;
    max-width: 800px;
  `,
  Field: (variant: string) => (): SerializedStyles =>
    css`
      margin: 0 20px 32px;

      @media (min-width: 600px) {
        width: calc(50% - 80px);
        display: ${variant === 'inline' ? 'inline-block' : 'block'};
        vertical-align: top;
      }
    `,
  Input: ({ colors }: Theme): SerializedStyles => css`
    background: ${colors['neutral-0']};
    border: 2px solid ${colors['neutral-15']};
    box-sizing: border-box;
    border-radius: 24px;
    width: 100%;
    padding: 8px 20px;
  `,
  Label: ({ typography }: Theme): SerializedStyles => css`
    ${typography['body-small'] as CSSPrimitive};
    display: block;
    font-weight: bold;
    margin-bottom: 8px;
  `,
  LabelOptional: ({ typography, colors }: Theme): SerializedStyles => css`
    ${typography['body-small'] as CSSPrimitive};
    color: ${colors['neutral-55']};
  `,
}
