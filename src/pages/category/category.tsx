import * as React from 'react'

import { css } from '@emotion/react'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Card,
  Pagination,
  SideMenu,
  Typography,
} from 'unsafe-bc-react-components'

import {
  Breadcrumbs,
  NoMatch404,
  ProductCardWithButtons,
  ProductCardWithButtonsProps,
} from '@components'
import { useCategory, UseCategoryBody, useSearch } from '@hooks'

import * as styles from './styles'

export function CategoryPage(): React.ReactElement {
  const params = useParams<UseCategoryBody>()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const { data: category, isValidating } = useCategory(params)
  const [page, setPage] = React.useState<number>(1)
  const { data: search } = useSearch({
    categoryId: category?.entityId,
    page,
  })
  const subcategories = category?.children ?? []
  const brands = [] // TODO: Get brands

  const titleCase = (text: string): string => {
    const str = text.replace(/-/g, ' ')
    return str.replace(
      /\w\S*/g,
      (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    )
  }

  function onChangePage(_: unknown, newPage: number): void {
    window.scrollTo(0, 0)
    setPage(newPage)
  }

  if (!isValidating && !category) {
    return <NoMatch404 />
  }

  return (
    <div css={styles.Container} id="content">
      <Helmet>
        <title>
          {category?.name} | {t('store.name', 'Stellar Store')}
        </title>
      </Helmet>
      <Breadcrumbs>
        <Breadcrumbs.Item to="/">
          {t('breadcrumbs.home', 'Home')}
        </Breadcrumbs.Item>
        <Breadcrumbs.Item to="/categories/all">
          {t('breadcrumbs.all_categories', 'All Categories')}
        </Breadcrumbs.Item>
        {params.categories && (
          <Breadcrumbs.Item to={`/category/${params.categories}`}>
            {t(titleCase(params.categories))}
          </Breadcrumbs.Item>
        )}
        {params.subCategories && (
          <Breadcrumbs.Item
            to={`/category/${params.categories}/${params.subCategories}`}
          >
            {t(titleCase(params.subCategories))}
          </Breadcrumbs.Item>
        )}
        {params.subSubCategories && (
          <Breadcrumbs.Item
            to={`/category/${params.categories}/${params.subCategories}/${params.subSubCategories}`}
          >
            {t(titleCase(params.subSubCategories))}
          </Breadcrumbs.Item>
        )}
      </Breadcrumbs>
      {category?.image?.urlOriginal ? (
        <Card
          as="h1"
          variant="large"
          name={category?.name}
          imageUrl={category?.image?.urlOriginal}
          css={styles.Card}
        />
      ) : (
        <Typography as="h1" variant="display-x-large">
          {category?.name}
        </Typography>
      )}
      <div css={styles.Main}>
        {subcategories.length > 0 || brands.length > 0 ? (
          <SideMenu
            css={css`
              min-width: 240px;
              @media (max-width: 1023px) {
                display: none;
              }
            `}
          >
            {subcategories.length > 0 && (
              <SideMenu.Level title="Subcategories">
                {subcategories.map((subcategory) => (
                  <SideMenu.Item
                    key={subcategory.entityId}
                    onClick={() => {
                      navigate(`/category${subcategory.path}`)
                    }}
                  >
                    {subcategory.name}
                  </SideMenu.Item>
                ))}
              </SideMenu.Level>
            )}
            {brands.length > 0 && (
              <SideMenu.Level title="Brand">
                {
                  // TODO: Get brands
                }
              </SideMenu.Level>
            )}
          </SideMenu>
        ) : null}

        <div css={styles.Content}>
          <div css={styles.Meta}>
            {search?.pagination && (
              <Typography variant="body-small">
                {t('category.item_in', "{{count}} items in '{{category}}'", {
                  count: search.pagination.total,
                  category: category?.name,
                })}
              </Typography>
            )}
            {
              // TODO: Add sorting logic
              // <Typography variant="body-small">Sort by: Trending</Typography>
            }
          </div>
          <div css={styles.Grid}>
            {search?.found &&
              search?.products
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
                  <ProductCardWithButtons
                    key={product.productId}
                    {...product}
                  />
                ))}
          </div>
          {search?.pagination && (
            <div css={styles.Pagination}>
              <Pagination
                page={search.pagination.pages.current}
                count={search.pagination.total_pages}
                onChange={onChangePage}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
