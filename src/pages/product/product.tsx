import * as React from 'react'

import { useTheme } from '@emotion/react'
import { useTranslation } from 'react-i18next'
import ImageGallery, { ReactImageGalleryItem } from 'react-image-gallery'
import { useMediaQuery } from 'react-responsive'
import { Link } from 'react-router-dom'
import { DialogDisclosure, useDialogState } from 'reakit/Dialog'
import {
  Button,
  ProductPrice,
  ProductReview,
  QuantitySelector,
  // StarRating,
  Typography,
} from 'unsafe-bc-react-components'

import { Breadcrumbs, ReviewDialog, WishlistItemDialog } from '@components'
import {
  useAddCartItem,
  useAddReview,
  useProduct,
  useProductOptions,
  useReviews,
  useWishlistItemDialog,
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
  const { data: reviews } = useReviews(slug)
  const addReview = useAddReview(slug)
  const { options, choices, setChoices, variant } = useProductOptions(product)
  const theme = useTheme()

  const isMobile = !useMediaQuery({
    query: theme.mq[2].substring('@media '.length),
  })
  const { addCartItem, isAdding, setQuantity, quantity } = useAddCartItem({
    productId: product?.entityId,
    variantId: variant?.node.entityId,
  })

  const wishlistDialog = useWishlistItemDialog({
    productId: product?.entityId,
    variantId: variant?.node.entityId,
  })

  const reviewDialog = useDialogState()

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
    <div css={styles.container(isLimited)}>
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
            <div css={styles.addToWishlist}>
              <DialogDisclosure {...wishlistDialog} css={styles.link}>
                <svg
                  width={16}
                  height={14}
                  viewBox="0 0 16 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.328 1.673a4 4 0 00-5.657 0c-.28.28-.491.598-.671.929a3.948 3.948 0 00-.672-.93 4 4 0 00-5.657 5.657L8 13.5l6.328-6.172a3.997 3.997 0 000-5.656z"
                    stroke={theme.colors['neutral-50']}
                    strokeMiterlimit={10}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <em>{t('bc.product.add_to_wishlist', 'Add to wishlist')}</em>
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
                <div css={styles.selectors}>
                  {option.values.map((value) => {
                    const active = choices[option.displayName]
                    return (
                      <Button
                        variant="selector"
                        key={value.label}
                        data-selected={active === value.label}
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
          </div>
          {isLimited && (
            <div css={styles.findMore}>
              <Link to={`/product/${slug}`} css={styles.link}>
                <em>{t('bc.product.find_more', 'Find out more')}</em>
                <svg
                  width={7}
                  height={12}
                  viewBox="0 0 7 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M.813 11l5.625-5L.813 1"
                    stroke={theme.colors['neutral-50']}
                    strokeMiterlimit={10}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          )}
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
          <div css={styles.productDetailRow}>
            <Typography variant="display-small">Reviews</Typography>
            <div css={styles.reviewList}>
              {reviews?.edges?.map((edge) => (
                <ProductReview
                  key={edge?.node.entityId}
                  review={{
                    author: edge?.node.author.name,
                    rating: edge?.node.rating || 0,
                    date: new Date(edge?.node.createdAt.utc),
                    text: edge?.node.text,
                    title: edge?.node.title || '',
                  }}
                  style={{ marginTop: 0 }}
                />
              ))}
              <ReviewDialog
                {...reviewDialog}
                onSubmit={async (values) => {
                  await addReview({
                    productId: product.entityId,
                    ...values,
                  })
                  reviewDialog.hide()
                }}
              />
              <DialogDisclosure {...reviewDialog} css={styles.addNewReview}>
                {t('bc.review.add', 'Add new review')}
              </DialogDisclosure>
            </div>
          </div>
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
