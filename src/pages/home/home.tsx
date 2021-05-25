import * as React from 'react'

import { css } from '@emotion/react'
import styled from '@emotion/styled'
import {
  Hero,
  HeroProps,
  ProductCard,
  Props as ProductCardProps,
  SideMenu,
} from 'unsafe-bc-react-components'

import productMock from '../../__mocks__/data/product.json'
import storeMock from '../../__mocks__/data/store_config.json'

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

type Level = {
  title: string
  items: string[]
}

const levels: Level[] = [
  {
    title: 'Subcategories',
    items: ['Shirts', 'Ponchos', 'Onesies'],
  },
  {
    title: 'Brand',
    items: ['Adadas', 'Naik', 'Dolce&Banana'],
  },
]

const products: ProductCardProps[] = [
  {
    product: productMock,
    productUrl: 'https://google.es',
    image: {
      url_standard: productMock.image_src,
      meta: productMock.image_alt,
    },
    brand: {
      name: productMock.brand,
    },
    currencySettings: { currency: storeMock.currency },
  },
  {
    product: productMock,
    productUrl: 'https://google.es',
    image: {
      url_standard: productMock.image_src,
      meta: productMock.image_alt,
    },
    brand: {
      name: productMock.brand,
    },
    currencySettings: { currency: storeMock.currency },
  },
  {
    product: productMock,
    productUrl: 'https://google.es',
    image: {
      url_standard: productMock.image_src,
      meta: productMock.image_alt,
    },
    brand: {
      name: productMock.brand,
    },
    currencySettings: { currency: storeMock.currency },
  },
  {
    product: productMock,
    productUrl: 'https://google.es',
    image: {
      url_standard: productMock.image_src,
      meta: productMock.image_alt,
    },
    brand: {
      name: productMock.brand,
    },
    currencySettings: { currency: storeMock.currency },
  },
  {
    product: productMock,
    productUrl: 'https://google.es',
    image: {
      url_standard: productMock.image_src,
      meta: productMock.image_alt,
    },
    brand: {
      name: productMock.brand,
    },
    currencySettings: { currency: storeMock.currency },
  },
]

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
  const [active, setActive] = React.useState(levels[0].items[0])

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
          {levels.map((level) => (
            <SideMenu.Level title={level.title} key={level.title}>
              {level.items.map((item) => (
                <SideMenu.Item
                  key={item}
                  active={item === active}
                  onClick={() => setActive(item)}
                >
                  {item}
                </SideMenu.Item>
              ))}
            </SideMenu.Level>
          ))}
        </SideMenu>
        <Grid>
          {products.map((product) => (
            <ProductCard {...product} />
          ))}
        </Grid>
      </Main>
    </Container>
  )
}
