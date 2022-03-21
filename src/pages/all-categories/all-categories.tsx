import * as React from 'react'

import { css } from '@emotion/react'
import { useTranslation } from 'react-i18next'
import { Typography } from 'unsafe-bc-react-components'

import { Breadcrumbs, CategoryCard } from '@components'
import { useCategories } from '@hooks'

import * as styles from './styles'

export function AllCategories(): React.ReactElement {
  const { data } = useCategories()
  const breadcrumbs = [{ to: '/', label: 'Home' }, { label: 'All Categories' }]
  const { t } = useTranslation()

  return (
    <div css={styles.Container} id="content">
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
      <Typography as="h1" variant="display">
        {t('category.all_categories', 'All Categories')}
      </Typography>
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
