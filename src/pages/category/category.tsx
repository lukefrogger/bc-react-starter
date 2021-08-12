import * as React from 'react'

import { css } from '@emotion/react'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'
import {
  Card,
  Pagination,
  SideMenu,
  Typography,
} from 'unsafe-bc-react-components'

import {
  Breadcrumbs,
  ProductCardWithButtons,
  ProductCardWithButtonsProps,
} from '@components'
import { useCategory, UseCategoryBody, useSearch } from '@hooks'

import * as styles from './styles'

export function CategoryPage(): React.ReactElement {
  const params = useParams<UseCategoryBody>()
  const history = useHistory()
  const { t } = useTranslation()

  const { data: category } = useCategory(params)
  const { data: search } = useSearch({
    categoryId: category?.id,
  })
  const subcategories = category?.categories ?? []
  const brands = [] // TODO: Get brands
  const parent = category?.slug.slice(1, -1).split('/')
  let baseUrl = '/category/'

  const titleCase = (text: string): string => {
    const str = text.replace(/-/g, ' ')
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    })
  }

  return (
    <div css={styles.Container}>
      <Breadcrumbs>
        <Breadcrumbs.Item to="/">
          {t('breadcrumbs.home', 'Home')}
        </Breadcrumbs.Item>
        <Breadcrumbs.Item to="/categories/all">
          {t('breadcrumbs.all_categories', 'All Categories')}
        </Breadcrumbs.Item>
        {parent?.map((item) => {
          baseUrl += `${item}/`
          return (
            <Breadcrumbs.Item key={item} to={baseUrl}>
              {titleCase(item)}
            </Breadcrumbs.Item>
          )
        })}
      </Breadcrumbs>
      {category?.image?.urlOriginal ? (
        <Card
          variant="large"
          name={category?.label}
          imageUrl={category?.image?.urlOriginal}
          css={styles.Card}
        />
      ) : (
        <Typography variant="display-x-large">{category?.label}</Typography>
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
                    key={subcategory.id}
                    onClick={() => {
                      history.push(`/category${subcategory.slug}`)
                    }}
                  >
                    {subcategory.label}
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
            <Typography variant="body-small">
              {search?.pagination.total} items in “{category?.label}”
            </Typography>
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
                      meta: product.node.images.edges?.[0]?.node.altText || '',
                      url_standard:
                        product.node.images.edges?.[0]?.node.urlOriginal || '',
                    },
                    productUrl: `/product${product.node.path}`,
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
          <Pagination
            css={css`
              padding: 56px 0 120px;
            `}
          />
        </div>
      </div>
    </div>
  )
}
