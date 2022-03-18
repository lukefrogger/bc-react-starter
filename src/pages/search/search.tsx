import * as React from 'react'

import { searchEvent } from '@services/analytics/google'
import { Form, Formik, FormikProps } from 'formik'
import { useTranslation } from 'react-i18next'
import { Clickable } from 'reakit'
import { Field, Pagination, Typography } from 'unsafe-bc-react-components'

import {
  ProductCardWithButtons,
  ProductCardWithButtonsProps,
} from '@components'
import { Search } from '@components/header/icons'
import { useSearch } from '@hooks'

import * as styles from './styles'

const INITIAL_VALUES = { search: '' }

type SearchValues = typeof INITIAL_VALUES

export function SearchPage(): React.ReactElement {
  const { t } = useTranslation()
  const [search, setSearch] = React.useState<{ search: string; page: number }>({
    search: '',
    page: 1,
  })
  const { data, error } = useSearch(search)
  const isLoading = !data && !error

  function onPageChange(event: React.ChangeEvent<unknown>, page: number): void {
    window.scrollTo(0, 0)
    setSearch({ ...search, page })
  }
  const onSubmit = (values: SearchValues): void => {
    setSearch({ search: values.search, page: 1 })
    searchEvent(values.search)
  }

  return (
    <div css={styles.Container} id="content">
      <Typography as="h1" css={styles.Title} variant="display-large">
        {t('search.search', 'Search')}
      </Typography>

      <Formik initialValues={{ search: '' }} onSubmit={onSubmit}>
        {(props: FormikProps<SearchValues>) => (
          <Form onSubmit={props.handleSubmit} css={styles.SearchBox}>
            <Field
              css={styles.SearchField}
              onChange={props.handleChange}
              name="search"
              value={props.values.search}
              aria-label={t('search.search', 'Search')}
            />
            <Clickable type="submit" css={styles.SearchIcon}>
              <Search />
            </Clickable>
          </Form>
        )}
      </Formik>

      {isLoading && t('notices.loading', 'Loading...')}

      {data?.pagination && (
        <Typography variant="body-small" css={styles.Results}>
          {t('search.result', '{{count}} results for', {
            count: data.pagination.total,
          })}
          {search.search &&
            t('search.for', {
              search: search.search,
            })}
        </Typography>
      )}
      <div css={styles.ProductGrid}>
        {data?.products
          .map(
            (product): ProductCardWithButtonsProps => ({
              brand: {
                name: product.node.brand?.name || '',
              },
              product: {
                condition: 'new',
                name: product.node.name,
                price: product.node.prices?.basePrice?.value,
                sale_price: product.node.prices?.salePrice?.value || 0,
              },
              currencySettings: {},
              image: {
                component: null,
                meta: product.node.images.edges?.[0]?.node.altText || '',
                url_standard:
                  product.node.images.edges?.[0]?.node.urlOriginal || '',
              },
              productId: product.node.entityId,
              variantId: product.node.variants?.edges?.[0]?.node.entityId, // TODO: Handle variant
              path: product.node.path,
            })
          )
          .map((product) => (
            <ProductCardWithButtons key={product.id} {...product} />
          ))}
      </div>
      {data?.pagination && (
        <div css={styles.Pagination}>
          <Pagination
            page={data.pagination.pages.current}
            count={data.pagination.total_pages}
            onChange={onPageChange}
          />
        </div>
      )}
    </div>
  )
}
