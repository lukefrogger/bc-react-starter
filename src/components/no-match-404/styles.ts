import { css, Theme } from '@emotion/react'

export const Container = css`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 40vh;
  padding: 24px;
`

export const Title = ({ colors }: Theme): any => css`
  font-weight: normal;
  color: ${colors['neutral-55']};
  border-right: 1px solid ${colors['neutral-30']};
  padding: 10px 23px 10px 0;
  margin-right: 20px;
`

export const Text = css`
  text-overflow: ellipsis;
  overflow: hidden;
`
