import * as React from 'react'

import { Form, Formik, FormikProps } from 'formik'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Clickable, Tab, TabList, TabPanel, useTabState } from 'reakit'
import {
  Field,
  Pagination,
  ProductCard,
  Props as ProductCardProps,
  Typography,
} from 'unsafe-bc-react-components'

import { Search } from '@components/header/icons'
import { useSearch } from '@hooks'

import * as styles from './styles'

const mockPosts = Array(5).fill({
  id: 5,
  title: 'It was impossible for Arthur to know',
  description:
    'The recalculations showed absolutely clearly and unambiguously that he was going to have a very bad month indeed, starting with today. It was impossible for Arthur to know this, but he just went ahead and knew it anyway.',
  imageUrl:
    'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&w=1350&q=80',
})

const INITIAL_VALUES = { search: '' }

type SearchValues = typeof INITIAL_VALUES

export function SearchPage(): React.ReactElement {
  const { t } = useTranslation()
  const tab = useTabState({ selectedId: 'products' })
  const [search, setSearch] = React.useState<string>()
  const { data, error } = useSearch({ search })
  const isLoading = !data && !error

  return (
    <div css={styles.Container}>
      <Typography css={styles.Title} variant="display-large">
        {t('search.title', 'Search')}
      </Typography>

      <Formik
        initialValues={{ search: '' }}
        onSubmit={(values: SearchValues) => setSearch(values.search)}
      >
        {(props: FormikProps<SearchValues>) => (
          <Form onSubmit={props.handleSubmit} css={styles.SearchBox}>
            <Field
              css={styles.SearchField}
              onChange={props.handleChange}
              name="search"
              value={props.values.search}
            />
            <Clickable type="submit" css={styles.SearchIcon}>
              <Search />
            </Clickable>
          </Form>
        )}
      </Formik>

      <TabList css={styles.Tabs} {...tab}>
        <Tab {...tab} css={styles.Tab} id="products">
          Products {data?.products?.length && `(${data?.products?.length})`}
        </Tab>
        <Tab {...tab} css={styles.Tab}>
          Blog posts (21)
        </Tab>
        <Tab {...tab} css={styles.Tab}>
          Events (21)
        </Tab>
        <Tab {...tab} css={styles.Tab}>
          Galleries (21)
        </Tab>
        <Tab {...tab} css={styles.Tab}>
          Pages (21)
        </Tab>
      </TabList>

      {isLoading && 'Loading...'}

      <TabPanel {...tab} css={styles.ProductGrid}>
        {data?.products
          .map(
            (product): ProductCardProps => ({
              brand: {
                name: product.node.brand?.name || '',
              },
              product: {
                condition: 'new',
                name: product.node.name,
                price: product.node.prices?.price.value,
                sale_price: product.node.prices?.salePrice?.value || 0,
              },
              currencySettings: {},
              image: {
                meta: product.node.images.edges?.[0]?.node.altText || '',
                url_standard:
                  product.node.images.edges?.[0]?.node.urlOriginal || '',
              },
              productUrl: `/product${product.node.path}`,
            })
          )
          .map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
      </TabPanel>
      <TabPanel {...tab}>
        {mockPosts.map(
          (post: typeof mockPosts[0]): React.ReactElement => (
            <article css={styles.Article} key={post.id}>
              <div className="title-box">
                <div className="pill">Blog</div>
                <Typography variant="display-small" className="title">
                  {post.title}
                </Typography>
                <Link className="link" to={`/blog/${post.id}`}>
                  More
                </Link>
              </div>
              <Typography className="description">
                {post.description}
              </Typography>
              <img className="image" src={post.imageUrl} alt={post.title} />
            </article>
          )
        )}
      </TabPanel>
      <TabPanel {...tab}>Galleries</TabPanel>
      <TabPanel {...tab}>Pages</TabPanel>

      <div css={styles.Pagination}>
        <Pagination {...data?.pagination} />
      </div>
    </div>
  )
}
