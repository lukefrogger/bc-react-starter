import * as React from 'react'

import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Card, Typography } from 'unsafe-bc-react-components'

import { CategoryCard } from '@components'
import { useCategories } from '@hooks'

import * as styles from './styles'

export function AllCategories(): React.ReactElement {
  const { data } = useCategories()
  console.log(data)

  return (
    <div css={styles.Container}>
      <Typography
        variant="body-small"
        css={css`
          padding: 32px 0;
        `}
      >
        Home / All Categories
      </Typography>
      <Typography variant="display">All Categories</Typography>
      <div css={styles.Main}>
        {data?.map((category) => (
          <CategoryCard
            key={category.id}
            label={category.label}
            to={`/category${category.slug}`}
          />
        ))}
      </div>
    </div>
  )
}
