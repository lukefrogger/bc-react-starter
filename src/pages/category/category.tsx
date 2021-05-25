import * as React from 'react'

import { css } from '@emotion/react'
import styled from '@emotion/styled'
import {
  Card,
  Pagination,
  ProductCard,
  Props as ProductCardProps,
  SideMenu,
  Typography,
} from 'unsafe-bc-react-components'

import productMock from '../../__mocks__/data/product.json'
import storeMock from '../../__mocks__/data/store_config.json'

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
  const [active, setActive] = React.useState(levels[0].items[0])

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
        name="Subcategory"
        imageUrl="https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&w=1350&q=80"
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
        <Content>
          <Meta>
            <Typography variant="body-small">
              42 items in “Subcategory”
            </Typography>
            {
              // TODO: Add sorting logic
            }
            <Typography variant="body-small">Sort by: Trending</Typography>
          </Meta>
          <Grid>
            {products.map((product) => (
              <ProductCard {...product} />
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
