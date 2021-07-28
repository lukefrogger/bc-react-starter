import * as React from 'react'

import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Card, Typography } from 'unsafe-bc-react-components'

import { useCategories } from '@hooks'

const Container = styled.div`
  max-width: 1208px;
  margin: 0 auto;
`
const Main = styled.div`
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  padding: 48px 0;
  margin: 0 -10px;
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
            css={css`
              background-position: center;
              min-height: 228px;
              flex-basis: calc(33.333% - 20px);
              margin: 10px;
            `}
          />
        ))}
      </Main>
    </Container>
  )
}
