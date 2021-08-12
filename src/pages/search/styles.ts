import { css, SerializedStyles, Theme } from '@emotion/react'

export const Container = css`
  max-width: 1248px;
  margin: 0 auto 60px;
  padding: 0 20px;
`

export const Title = css`
  padding: 60px 0;
  text-align: center;
`

export const SearchBox = css`
  position: relative;
  max-width: 584px;
  margin: 0 auto;
`

export const SearchField = css`
  input {
    max-width: 100%;
  }
`

export const SearchIcon = css`
  position: absolute;
  right: 0;
  top: 0px;
  background: no-repeat;
  border: none;
  height: 100%;
  width: 60px;
  cursor: pointer;
`

export const Tabs = css`
  margin: 32px auto 48px;
  text-align: center;
`

export const Tab = (theme: Theme): any => css`
  ${theme.typography['body-small'] as any};
  text-align: center;
  background: none;
  border: none;
  width: 146px;
  padding: 16px 0;
  cursor: pointer;

  &[aria-selected='true'] {
    color: ${theme.colors.primary};
    border-bottom: 2px solid ${theme.colors.primary};
  }
`

export const Results = css`
  padding-top: 64px;
`

export const ProductGrid = (theme: Theme): SerializedStyles => css`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  justify-items: center;
  margin-top: 32px;
  margin-left: -20px;
  margin-right: -20px;
  ${theme.mq[1]} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  ${theme.mq[2]} {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    grid-template-rows: repeat(2, minmax(0, 1fr));
  }
  img {
    max-height: none !important;
  }
`

export const Pagination = css`
  margin-top: 48px;
`

export const Article = (theme: Theme): SerializedStyles => css`
  display: flex;
  gap: 40px;
  padding: 56px 0;
  border-top: 2px solid ${theme.colors['neutral-15']};
  flex-direction: column;

  .title-box {
    min-width: 272px;
  }
  .pill {
    ${theme.typography['body-small'] as any};
    color: ${theme.colors['neutral-95']};
    margin-bottom: 16px;
    padding: 2px 16px;
    border-radius: 46px;
    background: ${theme.colors['neutral-10']};
    display: inline-block;
  }
  .link {
    ${theme.typography['body-small'] as any};
    color: ${theme.colors['neutral-95']};
    margin-top: 16px;
  }
  .image {
    width: 272px;
    max-width: 100%;
  }

  ${theme.mq[1]} {
    flex-direction: row;
  }
`
