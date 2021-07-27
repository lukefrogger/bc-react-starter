import * as React from 'react'

import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useParams } from 'react-router-dom'
import {
  Card,
  Pagination,
  ProductCard,
  Props as ProductCardProps,
  SideMenu,
  Typography,
} from 'unsafe-bc-react-components'

import { useCategory, UseCategoryBody, useSearch } from '@hooks'
import { useQuickView } from '@hooks/use-quick-view'
import { ProductModal } from '@pages/product-modal'

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
  const quickView = useQuickView()
  const { data: category } = useCategory(params)
  const { data: search } = useSearch({
    categoryId: category?.id,
  })

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
      <Card
        variant="large"
        name={category?.label}
        imageUrl="https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&w=1350&q=80" // TODO: Replace this image
        css={css`
          background-position: center;
          min-height: 228px;
        `}
      />
      <Main>
        <SideMenu
          css={css`
            min-width: 240px;
            @media (max-width: 1023px) {
              display: none;
            }
          `}
        >
          <SideMenu.Level title="Subcategories">
            {category?.categories?.map((subcategory) => (
              <SideMenu.Item key={subcategory.id}>
                {subcategory.label}
              </SideMenu.Item>
            ))}
          </SideMenu.Level>
          <SideMenu.Level title="Brand">
            {
              // TODO: Get brands
            }
          </SideMenu.Level>
        </SideMenu>

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
                    buttons: [
                      {
                        onClick: console.log,
                        children: 'Add to cart',
                      },
                      {
                        onClick: () => quickView.onShow(product.node.path),
                        children: 'Quick view',
                        variant: 'tertiary',
                      },
                    ],
                  })
                )
                .map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
          </Grid>
          <Pagination
            css={css`
              padding: 56px 0 120px;
            `}
          />
        </Content>
      </Main>

      <ProductModal modal={quickView.modal} slug={quickView.slug} />
    </Container>
  )
}
