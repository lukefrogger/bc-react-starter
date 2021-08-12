import * as React from 'react'

import { css } from '@emotion/react'
import { Typography } from 'unsafe-bc-react-components'

import { Breadcrumbs, CategoryCard } from '@components'
import { useCategories } from '@hooks'

import * as styles from './styles'

export function AllCategories(): React.ReactElement {
  const { data } = useCategories()
  const breadcrumbs = [{ to: '/', label: 'Home' }, { label: 'All Categories' }]

  return (
    <div css={styles.Container}>
      <Typography
        variant="body-small"
        css={css`
          padding: 32px 0;
        `}
      >
        <Breadcrumbs>
          {breadcrumbs.map((breadcrumb) => (
            <Breadcrumbs.Item to={breadcrumb.to} key={breadcrumb.to}>
              {breadcrumb.label}
            </Breadcrumbs.Item>
          ))}
        </Breadcrumbs>
      </Typography>
      <Typography variant="display">All Categories</Typography>
      <div css={styles.Main}>
        {data?.map((category) => (
          <CategoryCard
            key={category.entityId}
            label={category.name}
            to={`/category${category.path}`}
            image={category.image?.urlOriginal}
          />
        ))}
      </div>
    </div>
  )
}
