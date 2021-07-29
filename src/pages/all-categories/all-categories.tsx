import * as React from 'react'

import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Card, Typography } from 'unsafe-bc-react-components'

import { useCategories } from '@hooks'

import * as styles from './styles'

const Container = styled.div`
  max-width: 1208px;
  margin: 0 20px;
  @media (min-width: 1228px) {
    margin: 0 auto;
  }
`
const Main = styled.div`
  width: 100%;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  justify-items: center;
  padding: 20px 0;

  @media (min-width: 720px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: 1024px) {
    padding: 48px 0;
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`

export function AllCategories(): React.ReactElement {
  const { data } = useCategories()

  return (
    <Container>
      <Typography
        variant="body-small"
        css={css`
          padding: 32px 0;
        `}
      >
        Home / All Categories
      </Typography>
      <Typography variant="display">All Categories</Typography>
      <Main>
        {data?.map((category) => (
          <Card
            variant="medium"
            name={category.label}
            imageUrl="https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&w=1350&q=80" // TODO: Replace this image
            css={styles.Card}
          />
        ))}
      </Main>
    </Container>
  )
}
