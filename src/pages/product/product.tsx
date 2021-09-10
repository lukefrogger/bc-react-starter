import * as React from 'react'

import { useTheme } from '@emotion/react'
import { useTranslation } from 'react-i18next'
import ImageGallery, { ReactImageGalleryItem } from 'react-image-gallery'
import { useMediaQuery } from 'react-responsive'
import { DialogDisclosure } from 'reakit/Dialog'
import {
  Button,
  ProductPrice,
  // ProductReview,
  QuantitySelector,
  // StarRating,
  Typography,
} from 'unsafe-bc-react-components'

import { Breadcrumbs, WishlistItemDialog } from '@components'
import {
  useAddCartItem,
  useProduct,
  useProductOptions,
  useWishlistDialog,
} from '@hooks'

import * as styles from './styles'

import 'react-image-gallery/styles/css/image-gallery.css'

type ProductPageProps = {
  slug: string
  isLimited?: boolean
}

export function ProductPage({
  slug,
  isLimited,
}: ProductPageProps): React.ReactElement {
  const { t } = useTranslation()

  const { data: product } = useProduct(slug)

  const { options, choices, setChoices, variant } = useProductOptions(product)
  const theme = useTheme()

  const isMobile = !useMediaQuery({
    query: theme.mq[2].substring('@media '.length),
  })
  const { addCartItem, isAdding, setQuantity, quantity } = useAddCartItem({
    productId: product?.entityId,
    variantId: variant?.node.entityId,
  })

  const wishlistDialog = useWishlistDialog({
    productId: product?.entityId,
    variantId: variant?.node.entityId,
  })

  if (!product) return <p>Loading</p>

  const description = (
    <Typography
      variant="body-small"
      dangerouslySetInnerHTML={{ __html: product.description }}
    />
  )

  const images = product.images?.edges?.reduce<ReactImageGalleryItem[]>(
    (acc, edge) => {
      const { urlOriginal } = edge?.node || {}
      if (!urlOriginal) return acc
      return [
        ...acc,
        {
          original: urlOriginal,
          thumbnail: urlOriginal,
        },
      ]
    },
    []
  )

  return (
    <div css={styles.container}>
      {!isLimited && (
        <Breadcrumbs>
          <Breadcrumbs.Item to="/">
            {t('breadcrumbs.home', 'Home')}
          </Breadcrumbs.Item>
          {/* TODO: Add Category to Breadcrumbs */}
          <Breadcrumbs.Item>{product?.name}</Breadcrumbs.Item>
        </Breadcrumbs>
      )}
      <div css={styles.grid(isLimited)}>
        <div css={styles.gallery}>
          <ImageGallery
            items={images || []}
            showPlayButton={false}
            {...(isMobile
              ? {
                  showNav: false,
                  showThumbnails: false,
                  showBullets: true,
                }
              : {
                  thumbnailPosition: 'left',
                  showNav: false,
                })}
          />
        </div>
        <div css={styles.product}>
          <div css={styles.productDescription}>
            {product.brand && (
              <Typography variant="overline">
                {product.brand.name.toUpperCase()}
              </Typography>
            )}
            <Typography variant="display">{product.name}</Typography>
            <ProductPrice
              price={variant.node.prices.basePrice.value}
              salePrice={variant.node.prices.salePrice?.value || 0}
              currencySettings={{
                currency: variant.node.prices.basePrice.code,
              }}
            />
            {!isLimited && description}
            {/*             <div css={styles.starRow}>
              <StarRating
                rating={4}
                style={{ marginTop: 0, marginBottom: 0 }}
              />
              <Typography variant="body-small">2 reviews</Typography>
            </div> */}
            <div>
              <DialogDisclosure {...wishlistDialog} css={styles.link}>
                Add to wishlist
              </DialogDisclosure>
              <WishlistItemDialog {...wishlistDialog} />
            </div>
          </div>
          <div css={styles.productOptions}>
            {options?.map((option) => (
              <div key={option.displayName}>
                <Typography variant="display-xx-small">
                  {option.displayName.toUpperCase()}
                </Typography>
                <div css={styles.row}>
                  {option.values.map((value) => {
                    const active = choices[option.displayName]
                    return (
                      <Button
                        variant={
                          value.label === active ? 'secondary' : 'tertiary'
                        }
                        key={value.label}
                        onClick={() => {
                          setChoices({
                            ...choices,
                            [option.displayName]: value.label,
                          })
                        }}
                      >
                        {value.label}
                      </Button>
                    )
                  })}
                </div>
              </div>
            ))}
            <div>
              <Typography variant="display-xx-small">
                {t('bc.product.quantity', 'QUANTITY')}
              </Typography>
              <div css={styles.row}>
                <QuantitySelector
                  defaultQuantity={quantity}
                  onChangeQuantity={setQuantity}
                />
                <Button onClick={addCartItem} disabled={isAdding}>
                  {t('bc.cart.add_to_cart', 'Add to Cart')}
                </Button>
              </div>
            </div>
            {isLimited && description}
          </div>
        </div>
      </div>
      {!isLimited && (
        <div css={styles.productDetail}>
          <div css={styles.productDetailRow}>
            <Typography variant="display-small">
              {t('bc.product.description', 'Description')}
            </Typography>
            <Typography
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          </div>
          {/*           <div css={styles.productDetailRow}>
            <Typography variant="display-small">
              {t('bc.product.specifications', 'Specifications')}
            </Typography>
            <Typography
              dangerouslySetInnerHTML={{ __html: product.description }} // TODO: Change to specifications
            />
          </div> */}
          {/*         <div css={styles.productDetailRow}>
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
        </div> */}
        </div>
      )}
      {/*       <Typography
        variant="display"
        css={css`
          text-align: center;
          padding: 48px 0;
        `}
      >
        You might also enjoy
      </Typography>
      <div css={styles.relatedProducts}>
        {products.map((relatedProduct) => (
          <ProductCard key={relatedProduct.id} {...relatedProduct} />
        ))}
      </div> */}
    </div>
  )
}
