import * as React from 'react'

import useAddItem from '@bigcommerce/storefront-data-hooks/cart/use-add-item'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { DialogDisclosure, useDialogState } from 'reakit/Dialog'
import {
  Button,
  ProductPrice,
  // ProductReview,
  QuantitySelector,
  // StarRating,
  Typography,
} from 'unsafe-bc-react-components'

import {
  Breadcrumbs,
  WishlistItemDialog,
  WishlistItemDialogValues,
} from '@components'
import {
  useAddWishlistItem,
  useDeleteWishlistItem,
  useProduct,
  useWishlists,
} from '@hooks'
import { getCurrentVariant, getProductOptions } from '@utils'

import * as styles from './styles'

type ProductPageProps = {
  slug: string
  isLimited?: boolean
}

export function ProductPage({
  slug,
  isLimited,
}: ProductPageProps): React.ReactElement {
  const { t } = useTranslation()

  const { data: wishlists } = useWishlists()
  const addWishlistItem = useAddWishlistItem()
  const deleteWishlistItem = useDeleteWishlistItem()
  const dialog = useDialogState()
  const { data: product } = useProduct(slug)
  const addItem = useAddItem()
  const [quantity, setQuantity] = React.useState(1)
  const [isAdding, setIsAdding] = React.useState(false)

  const options = getProductOptions(product)
  const [choices, setChoices] = React.useState<any>({})
  const variant = getCurrentVariant(product, choices)

  const breadcrumbs = [
    { to: '/', label: t('breadcrumbs.home', 'Home') },
    { to: '/category', label: t('breadcrumbs.category', 'Category') }, // FIXME: Link to the product category
    { label: product?.name },
  ]

  if (!product) return <p>Loading</p>

  async function onSubmitDialog({
    additions,
    deletions,
  }: WishlistItemDialogValues): Promise<void> {
    await Promise.all([
      ...additions.map((addition) =>
        addWishlistItem({
          wishlistId: addition.wishlistId,
          productId: product?.entityId || 0, // TODO: Solve this
          variantId: variant?.node.entityId,
        })
      ),
      ...deletions.map((deletion) => {
        const itemId = wishlists?.reduce(
          (acc: number | null | undefined, wishlist) => {
            if (wishlist.id === deletion.wishlistId) {
              const itemToDelete = wishlist.items?.find(
                (item) => item.product_id === product?.entityId
              )
              return itemToDelete?.id
            }
            return acc
          },
          null as number | null
        )
        if (!itemId) return null
        return deleteWishlistItem({
          wishlistId: deletion.wishlistId,
          itemId,
        })
      }),
    ])
    dialog.hide()
  }

  const addToCart = async (): Promise<void> => {
    setIsAdding(true)
    try {
      await addItem({
        productId: product.entityId,
        variantId: variant?.node.entityId,
        quantity,
      })
      toast.success(t('bc.cart.added', 'Added to cart'), {
        position: 'bottom-right',
      })
    } catch (e) {
      toast.error(t('bc.cart.error_adding', 'Error adding to cart'), {
        position: 'bottom-right',
      })
    } finally {
      setIsAdding(false)
    }
  }
  const description = (
    <Typography
      variant="body-small"
      dangerouslySetInnerHTML={{ __html: product.description }}
    />
  )

  return (
    <div css={styles.container}>
      {!isLimited && (
        <Breadcrumbs>
          {breadcrumbs.map((item) => (
            <Breadcrumbs.Item key={item.to} to={item.to}>
              {item.label}
            </Breadcrumbs.Item>
          ))}
        </Breadcrumbs>
      )}
      <div css={styles.grid(isLimited)}>
        <div css={styles.image(isLimited)} />
        <div css={styles.product}>
          <div css={styles.productDescription}>
            <Typography variant="overline">
              {product.brand?.name.toUpperCase()}
            </Typography>
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
              <DialogDisclosure {...dialog} css={styles.link}>
                Add to wishlist
              </DialogDisclosure>
              <WishlistItemDialog
                {...dialog}
                wishlists={wishlists}
                productId={product.entityId}
                onSubmit={onSubmitDialog}
              />
            </div>
          </div>
          <div css={styles.productOptions}>
            {options?.map((opt: any) => (
              <div key={opt.displayName}>
                <Typography variant="display-xx-small">
                  {opt.displayName.toUpperCase()}
                </Typography>
                <div css={styles.row}>
                  {
                    // TODO: Improve legibility
                  }
                  {opt.values.map((v: any, i: number) => {
                    const active = (choices as any)[opt.displayName]
                    return (
                      <Button
                        variant={v.label === active ? 'secondary' : 'tertiary'}
                        key={v.label}
                        onClick={() => {
                          setChoices({
                            ...choices,
                            [opt.displayName]: v.label,
                          })
                        }}
                      >
                        {v.label}
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
                <Button onClick={addToCart} disabled={isAdding}>
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
          <div css={styles.productDetailRow}>
            <Typography variant="display-small">
              {t('bc.product.specifications', 'Specifications')}
            </Typography>
            <Typography
              dangerouslySetInnerHTML={{ __html: product.description }} // TODO: Change to specifications
            />
          </div>
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
