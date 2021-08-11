import * as React from 'react'

import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useHistory, useParams } from 'react-router-dom'
import {
  Card,
  Pagination,
  SideMenu,
  Typography,
} from 'unsafe-bc-react-components'

import {
  ProductCardWithButtons,
  ProductCardWithButtonsProps,
} from '@components'
import { useCategory, UseCategoryBody, useSearch } from '@hooks'

const Container = styled.div`
  max-width: 1208px;
  margin: 0 auto;
`
const Main = styled.div`
  display: flex;
  flex: 1;
  padding: 48px 0;
`
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  justify-items: center;
  @media (min-width: 720px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-template-rows: repeat(2, minmax(0, 1fr));
  }
  img {
    max-height: none !important;
  }
`

const Content = styled.div`
  width: 100%;
  @media (min-width: 1024px) {
    margin-right: -24px;
  }
`

const Meta = styled.div`
  padding: 0 24px 12px;
  display: flex;
  justify-content: space-between;
`

export function CategoryPage(): React.ReactElement {
  const params = useParams<UseCategoryBody>()
  const history = useHistory()

  const { data: category } = useCategory(params)
  const { data: search } = useSearch({
    categoryId: category?.id,
  })
  const subcategories = category?.categories ?? []
  const brands = [] // TODO: Get brands

  return (
    <Container>
      <Typography
        variant="body-small"
        css={css`
          padding: 32px 0;
        `}
      >
        Home / Category / Subcategory
      </Typography>
      {category?.image?.urlOriginal ? (
        <Card
          variant="large"
          name={category?.label}
          imageUrl={category?.image?.urlOriginal}
          css={css`
            background-position: center;
            min-height: 228px;
          `}
        />
      ) : (
        <Typography variant="display-x-large">{category?.label}</Typography>
      )}
      <Main>
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

        <Content>
          <Meta>
            <Typography variant="body-small">
              {search?.pagination.total} items in “{category?.label}”
            </Typography>
            {
              // TODO: Add sorting logic
              // <Typography variant="body-small">Sort by: Trending</Typography>
            }
          </Meta>
          <Grid>
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
          </Grid>
          <Pagination
            css={css`
              padding: 56px 0 120px;
            `}
          />
        </Content>
      </Main>
    </Container>
  )
}
