import * as React from 'react'

import { css } from '@emotion/react'
import { useTranslation } from 'react-i18next'
import { DialogDisclosure, useDialogState } from 'reakit/Dialog'
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

import { Breadcrumbs, WishlistItemDialog } from '@components'
import { useAddWishlistItem, useDeleteWishlistItem } from '@hooks'

import productMock from '../../__mocks__/data/product.json'
import storeMock from '../../__mocks__/data/store_config.json'
import * as styles from './styles'

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

export function ProductPage(): React.ReactElement {
  const addWishlistItem = useAddWishlistItem()
  const deleteWishlistItem = useDeleteWishlistItem()
  const dialog = useDialogState()
  return (
    <div css={styles.container}>
      <Breadcrumbs>
        {breadcrumbs.map((item) => (
          <Breadcrumbs.Item key={item.to} to={item.to}>
            {item.label}
          </Breadcrumbs.Item>
        ))}
      </Breadcrumbs>
      <div css={styles.grid}>
        <div css={styles.image} />
        <div css={styles.product}>
          <div css={styles.productDescription}>
            <Typography variant="overline">
              {productMock.brand.toUpperCase()}
            </Typography>
            <Typography variant="display">{productMock.name}</Typography>
            <ProductPrice price={21} salePrice={20} currencySettings={{}} />
            <Typography
              variant="body-small"
              dangerouslySetInnerHTML={{ __html: productMock.description }}
            />
            <div css={styles.starRow}>
              <StarRating
                rating={4}
                style={{ marginTop: 0, marginBottom: 0 }}
              />
              <Typography variant="body-small">2 reviews</Typography>
            </div>
            <div>
              <DialogDisclosure {...dialog} css={styles.link}>
                Add to wishlist
              </DialogDisclosure>
              <WishlistItemDialog {...dialog} productId={productMock.id} />
            </div>
          </div>
          <div css={styles.productOptions}>
            <div>
              <Typography variant="display-xx-small">COLOR</Typography>
              <div css={styles.row}>
                {
                  // TODO: Add selected state
                }
                <Button variant="selector">Red</Button>
                <Button variant="selector">Holo</Button>
                <Button variant="selector">Rainbow</Button>
              </div>
            </div>
            <div>
              <Typography variant="display-xx-small">QUANTITY</Typography>
              <div css={styles.row}>
                <QuantitySelector defaultQuantity={1} />
                <Button>Add to Cart</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div css={styles.productDetail}>
        <div css={styles.productDetailRow}>
          <Typography variant="display-small">Product Description</Typography>
          <Typography
            dangerouslySetInnerHTML={{ __html: productMock.description }}
          />
        </div>
        <div css={styles.productDetailRow}>
          <Typography variant="display-small">Specifications</Typography>
          <Typography
            dangerouslySetInnerHTML={{ __html: productMock.description }}
          />
        </div>
        <div css={styles.productDetailRow}>
          <Typography variant="display-small">Reviews</Typography>
          <div css={styles.reviewList}>
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
          </div>
        </div>
      </div>
      <Typography
        variant="display"
        css={css`
          text-align: center;
          padding: 48px 0;
        `}
      >
        You might also enjoy
      </Typography>
      <div css={styles.relatedProducts}>
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  )
}
