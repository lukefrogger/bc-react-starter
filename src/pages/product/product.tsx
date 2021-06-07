import * as React from 'react'

import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useTranslation } from 'react-i18next'
import {
  Button,
  ProductCard,
  ProductPrice,
  ProductReview,
  Props as ProductCardProps,
  QuantitySelector,
  StarRating,
  Typography,
} from 'unsafe-bc-react-components'

import { Breadcrumbs } from '@components'

import productMock from '../../__mocks__/data/product.json'
import storeMock from '../../__mocks__/data/store_config.json'

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
]

const breadcrumbs = [
  { to: '/home', label: 'Home' },
  { to: '/category', label: 'Category' },
  { label: productMock.name },
]

const Container = styled.div`
  --horizontal-spacing: 24px;
  max-width: calc(1208px + (var(--horizontal-spacing) * 2));
  margin: 0 auto;
  padding: 0 var(--horizontal-spacing);
`

const Grid = styled.div`
  --horizontal-setback: 104px;
  padding-bottom: 48px;
  @media (min-width: 1024px) {
    padding-left: var(--horizontal-setback);
    display: flex;
    column-gap: 40px;
    > * {
      min-width: 480px;
    }
  }
`

const Image = styled.div`
  background-color: gainsboro;
  height: 340px;
  width: 100%;
  position: relative;
  @media (min-width: 1024px) {
    height: 584px;
    width: 584px;
  }
  margin-bottom: 20px;
  @media (min-width: 1024px) {
    margin-bottom: inherit;
    ::before {
      position: absolute;
      width: 84px;
      height: 84px;
      background-color: gainsboro;
      content: '';
      left: -104px;
    }
  }
`

const Product = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const ProductDescription = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`
const ProductOptions = styled.div`
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`

const StarRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`

const Row = styled.div`
  display: flex;
  gap: 12px;
  padding-top: 16px;
`

const ProductDetail = styled.div`
  --horizontal-setback: 104px;
  @media (min-width: 1024px) {
    padding-left: var(--horizontal-setback);
  }
  > * {
    :not(:first-child) {
      border-top: 2px solid #eaeaea;
    }
  }
`
const ProductDetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 40px;
  padding-bottom: 40px;
  gap: 40px;
  > * {
    max-width: 580px;
  }
  flex-direction: column;
  @media (min-width: 1024px) {
    flex-direction: row;
  }
`

const ReviewList = styled.div`
  > * {
    padding-bottom: 20px;
    :not(:first-child) {
      padding-top: 20px;
      border-top: 2px solid #eaeaea;
    }
  }
`

const RelatedProducts = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  @media (min-width: 1024px) {
    flex-wrap: nowrap;
  }
`

export function ProductPage(): React.ReactElement {
  return (
    <Container>
      <Breadcrumbs>
        {breadcrumbs.map((item) => (
          <Breadcrumbs.Item key={item.to} to={item.to}>
            {item.label}
          </Breadcrumbs.Item>
        ))}
      </Breadcrumbs>
      <Grid>
        <Image />
        <Product>
          <ProductDescription>
            <Typography variant="overline">
              {productMock.brand.toUpperCase()}
            </Typography>
            <Typography variant="display">{productMock.name}</Typography>
            <ProductPrice price={21} salePrice={20} currencySettings={{}} />
            <Typography
              variant="body-small"
              dangerouslySetInnerHTML={{ __html: productMock.description }}
            />
            <StarRow>
              <StarRating
                rating={4}
                style={{ marginTop: 0, marginBottom: 0 }}
              />
              <Typography variant="body-small">2 reviews</Typography>
            </StarRow>
            <div>
              <Button variant="link">Add to wishlist</Button>
            </div>
          </ProductDescription>
          <ProductOptions>
            <div>
              <Typography variant="display-xx-small">COLOR</Typography>
              <Row>
                {
                  // TODO: Add selected state
                }
                <Button variant="selector">Red</Button>
                <Button variant="selector">Holo</Button>
                <Button variant="selector">Rainbow</Button>
              </Row>
            </div>
            <div>
              <Typography variant="display-xx-small">QUANTITY</Typography>
              <Row>
                <QuantitySelector defaultQuantity={1} />
                <Button>Add to Cart</Button>
              </Row>
            </div>
          </ProductOptions>
        </Product>
      </Grid>
      <ProductDetail>
        <ProductDetailRow>
          <Typography variant="display-small">Product Description</Typography>
          <Typography
            dangerouslySetInnerHTML={{ __html: productMock.description }}
          />
        </ProductDetailRow>
        <ProductDetailRow>
          <Typography variant="display-small">Specifications</Typography>
          <Typography
            dangerouslySetInnerHTML={{ __html: productMock.description }}
          />
        </ProductDetailRow>
        <ProductDetailRow>
          <Typography variant="display-small">Reviews</Typography>
          <ReviewList>
            <ProductReview
              review={{
                author: productMock.review.name,
                rating: productMock.review.rating,
                date: new Date(productMock.review.date_modified),
                text: productMock.review.text,
                title: productMock.review.title,
              }}
              style={{ marginTop: 0 }}
            />
            <ProductReview
              review={{
                author: productMock.review.name,
                rating: productMock.review.rating,
                date: new Date(productMock.review.date_modified),
                text: productMock.review.text,
                title: productMock.review.title,
              }}
              style={{ marginTop: 0 }}
            />
            <ProductReview
              review={{
                author: productMock.review.name,
                rating: productMock.review.rating,
                date: new Date(productMock.review.date_modified),
                text: productMock.review.text,
                title: productMock.review.title,
              }}
              style={{ marginTop: 0 }}
            />
          </ReviewList>
        </ProductDetailRow>
      </ProductDetail>
      <Typography
        variant="display"
        css={css`
          text-align: center;
          padding: 48px 0;
        `}
      >
        You might also enjoy
      </Typography>
      <RelatedProducts>
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </RelatedProducts>
    </Container>
  )
}
