import { css, SerializedStyles, Theme } from '@emotion/react'
import { CSSPrimitive } from 'unsafe-bc-react-components/dist/theme/types'

export const container = (theme: Theme): SerializedStyles => css`
  width: 100%;
  padding: 48px;
  background-color: ${theme.colors['neutral-10']};
`

export const wrapper = (theme: Theme): SerializedStyles => css`
  display: flex;
  max-width: 1208px;
  margin: 0 auto;
  flex-direction: column;
  justify-content: center;
  gap: 40px;
  padding-top: 40px;
  text-align: center;
  ${theme.mq[1]} {
    flex-flow: wrap;
    justify-content: space-between;
    > * {
      width: calc(50% - 40px);
    }
  }
  ${theme.mq[2]} {
    text-align: start;
    > * {
      align-items: flex-start;
      width: calc(25% - 40px);
    }
  }
`

export const logo = css`
  background-color: transparent;
  border: none;
  cursor: pointer;
`

export const group = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`

export const link = (theme: Theme): SerializedStyles => css`
  ${theme.typography.body as CSSPrimitive}
  color: ${theme.colors['neutral-95']};
  text-decoration: none;
  :hover {
    text-decoration: underline;
  }
`

export const social = (theme: Theme): SerializedStyles => css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 48px;
  a {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  ${theme.mq[2]} {
    margin-top: 24px;
  }
`

export const rights = (theme: Theme): SerializedStyles => css`
  ${theme.typography['body-small'] as CSSPrimitive}
  display: flex;
  padding-top: 48px;
  gap: 16px;
  max-width: 1208px;
  margin: 0 auto;
  justify-content: center;
  align-items: baseline;
  flex-wrap: wrap;
  text-align: center;
  ${theme.mq[1]} {
    padding-top: 72px;
    justify-content: space-between;
  }
`

export const icons = (theme: Theme): SerializedStyles => css`
  fill: ${theme.colors['neutral-95']};

  &:hover {
    fill: ${theme.colors.primary};
  }
`
