import * as React from 'react'

import useCustomer from '@bigcommerce/storefront-data-hooks/use-customer'
import { useTheme } from '@emotion/react'
import { Helmet } from 'react-helmet'
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
  StarRating,
  Typography,
} from 'unsafe-bc-react-components'

import { Breadcrumbs, ReviewDialog, WishlistItemDialog } from '@components'
import {
  useAddCartItem,
  useAddReview,
  useProduct,
  useProductOptions,
  useReviews,
  useReviewSummary,
  useWishlistItemDialog,
} from '@hooks'
import { AlarmIcon, CheckIcon, ClearIcon } from '@icons'

import { ProductOption } from './product__option'
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
  const { data: customer } = useCustomer()

  const { data: product } = useProduct(slug)
  const { data: reviews } = useReviews(slug)
  const reviewSummary = useReviewSummary(product?.reviewSummary)
  const addReview = useAddReview(slug)
  const { options, choices, setChoices, variant, optionSelections } =
    useProductOptions(product)
  const theme = useTheme()

  const isMobile = !useMediaQuery({
    query: theme.mq[2].substring('@media '.length),
  })
  const { addCartItem, isAdding, setQuantity, quantity } = useAddCartItem({
    productId: product?.entityId,
    variantId: variant?.node.entityId,
    optionSelections,
  })

  const wishlistDialog = useWishlistItemDialog({
    productId: product?.entityId,
    variantId: variant?.node.entityId,
  })

  const reviewDialog = useDialogState()

  if (!product) return <p>{t('notices.loading', 'Loading')}</p>

  const images = product.images?.edges?.reduce<ReactImageGalleryItem[]>(
    (acc, edge) => {
      const { urlOriginal } = edge?.node || {}
      if (!urlOriginal) return acc
      return [
        ...acc,
        {
          original: urlOriginal,
          thumbnail: urlOriginal,
          originalAlt: product.name,
          thumbnailAlt: product.name,
        },
      ]
    },
    []
  )

  const isInStock = variant?.node?.inventory
    ? variant?.node?.inventory?.isInStock
    : product.inventory?.isInStock
  const aggregate =
    variant?.node?.inventory?.aggregated || product.inventory?.aggregated
  const displayLowStock =
    aggregate && isInStock
      ? aggregate?.availableToSell <= aggregate?.warningLevel
      : false
  const availableToSell = isInStock && aggregate?.availableToSell

  return (
    <div css={styles.container(isLimited)}>
      <Helmet>
        <title>{product?.name}</title>
      </Helmet>
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
            {variant && (
              <ProductPrice
                price={variant.node.prices.basePrice.value}
                salePrice={variant.node.prices.salePrice?.value || 0}
                currencySettings={{
                  currency: variant.node.prices.basePrice.code,
                }}
              />
            )}
            {reviewSummary && (
              <div css={styles.starRow}>
                <StarRating rating={reviewSummary.averageOfRatings} />
                <Typography variant="body-small">
                  {t('reviews.review', '{{count}} reviews', {
                    count: reviewSummary.numberOfReviews,
                  })}
                </Typography>
              </div>
            )}
            {!!customer && (
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
                  <em>{t('wish_list.add_to_wishlist', 'Add to wishlist')}</em>
                </DialogDisclosure>
                <WishlistItemDialog {...wishlistDialog} />
              </div>
            )}
          </div>
          <div css={styles.productOptions}>
            {options?.map((option) => {
              return (
                <ProductOption
                  key={option.entityId}
                  option={option}
                  choices={choices}
                  setChoices={setChoices}
                />
              )
            })}
            {!isInStock && (
              <div>
                <div css={styles.row}>
                  <ClearIcon />
                  <Typography variant="display-x-small">
                    {t('product.out_of_stock', `Out of Stock`)}
                  </Typography>
                </div>
              </div>
            )}
            {displayLowStock && (
              <div>
                <div css={styles.row}>
                  <AlarmIcon />
                  <Typography variant="display-x-small">
                    {t(
                      'product.only_in_stock',
                      `Only ${availableToSell} in stock`,
                      { availableToSell }
                    )}
                  </Typography>
                </div>
              </div>
            )}
            {availableToSell && !displayLowStock && (
              <div>
                <div css={styles.row}>
                  <CheckIcon />
                  <Typography variant="display-x-small">
                    {t('product.num_in_stock', `${availableToSell} in stock`, {
                      availableToSell,
                    })}
                  </Typography>
                </div>
              </div>
            )}
            <div>
              <Typography variant="display-xx-small">
                {t('product.quantity', 'QUANTITY')}
              </Typography>
              <div css={styles.row}>
                <QuantitySelector
                  defaultQuantity={quantity}
                  onChangeQuantity={setQuantity}
                />
                <Button onClick={addCartItem} disabled={isAdding}>
                  {t('cart.cart.add_to_cart', 'Add to Cart')}
                </Button>
              </div>
            </div>
          </div>
          {isLimited && (
            <div css={styles.findMore}>
              <Link to={`/product/${slug}`} css={styles.link}>
                <em>{t('product.find_more', 'Find out more')}</em>
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
              {t('product.description', 'Description')}
            </Typography>
            <Typography
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          </div>
          {/*           <div css={styles.productDetailRow}>
            <Typography variant="display-small">
              {t('product.specifications', 'Specifications')}
            </Typography>
            <Typography
              dangerouslySetInnerHTML={{ __html: product.description }} // TODO: Change to specifications
            />
          </div> */}
          <div css={styles.productDetailRow}>
            <Typography variant="display-small">
              {t('reviews.title', 'Reviews')}
            </Typography>
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
                {t('reviews.add', 'Add new review')}
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
