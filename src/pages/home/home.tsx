import * as React from 'react'

import { css } from '@emotion/react'
import { useHistory } from 'react-router-dom'
import {
  Hero,
  HeroArray,
  HeroProps,
  SideMenu,
} from 'unsafe-bc-react-components'

import {
  ProductCardWithButtons,
  ProductCardWithButtonsProps,
} from '@components'
import { useCategories, useSearch } from '@hooks'

import * as styles from './styles'

const SLIDES: HeroProps[] = [
  {
    headline: {
      text: 'Woman in red',
    },
    description: {
      text: 'Wow your friends with this classic Heinz Hoodie',
    },
    button: {
      text: 'Get the look',
    },
    image: {
      src: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&w=1350&q=80',
      alt: 'Woman Red',
    },
  },
  {
    headline: {
      text: 'Woman with orange background',
    },
    description: {
      text: 'Seriously stylish handbags',
    },
    button: {
      text: 'Grab them here',
    },
    image: {
      src: 'https://images.unsplash.com/photo-1538331269258-6c97a6bdeae0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&w=1350&q=80',
      alt: 'Woman Orange',
    },
  },
  {
    headline: {
      text: 'Man with white background',
    },
    description: {
      text: 'New Mens T-shirts now in stock',
    },
    button: {
      text: 'Take a look',
    },
    image: {
      src: 'https://images.unsplash.com/photo-1515600051222-a3c338ff16f6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&w=1350&q=80',
      alt: 'Man White',
    },
  },
]

const HERO: HeroArray = {
  slides: SLIDES,
}

export function HomePage(): React.ReactElement {
  const { data } = useSearch()
  const { data: categories } = useCategories()
  const history = useHistory()

  return (
    <div css={styles.container}>
      <Hero {...HERO} />
      <div css={styles.main}>
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
        <div css={styles.grid}>
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
        </div>
      </div>
    </div>
  )
}
