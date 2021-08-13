import * as React from 'react'

import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useHistory } from 'react-router-dom'
import { Hero, HeroProps, SideMenu } from 'unsafe-bc-react-components'

import {
  ProductCardWithButtons,
  ProductCardWithButtonsProps,
} from '@components'
import { useCategories, useSearch } from '@hooks'

const HERO: HeroProps = {
  headline: {
    text: 'Headline in the Hero',
  },
  description: {
    text: 'Very short description here now',
  },
  button: {
    text: 'Main CTA',
  },
  images: [
    {
      src: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&w=1350&q=80',
      alt: 'Woman Red',
    },
    {
      src: 'https://images.unsplash.com/photo-1538331269258-6c97a6bdeae0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&w=1350&q=80',
      alt: 'Woman Orange',
    },
    {
      src: 'https://images.unsplash.com/photo-1515600051222-a3c338ff16f6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&w=1350&q=80',
      alt: 'Man White',
    },
  ],
}

// TODO: Refactor to css in styles.ts
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
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-template-rows: repeat(2, minmax(0, 1fr));
  }
  img {
    max-height: none !important;
  }
`

export function HomePage(): React.ReactElement {
  const { data } = useSearch()
  const { data: categories } = useCategories()
  const history = useHistory()

  return (
    <Container>
      <Hero {...HERO} />
      <Main>
        <SideMenu
          css={css`
            padding-top: 20px;
            min-width: 240px;
            @media (max-width: 1023px) {
              display: none;
            }
          `}
        >
          <SideMenu.Level title="Categories">
            {categories?.map((category) => (
              <SideMenu.Item
                key={category.entityId}
                onClick={() => {
                  history.push(`/category${category.path}`)
                }}
              >
                {category.name}
              </SideMenu.Item>
            ))}
          </SideMenu.Level>
        </SideMenu>
        <Grid>
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
              <ProductCardWithButtons {...product} key={product.productId} />
            ))}
        </Grid>
      </Main>
    </Container>
  )
}
