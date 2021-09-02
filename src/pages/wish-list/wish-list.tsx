import * as React from 'react'

import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'
import { useDialogState } from 'reakit/Dialog'
import {
  ProductRow,
  ProductRowProps,
  Typography,
} from 'unsafe-bc-react-components'

import {
  ProductCardWithButtons,
  ProductCardWithButtonsProps,
  WishlistActions,
  WishlistDialog,
  WishlistStatus,
} from '@components'
import { useDeleteWishlistItem, useUpdateWishlist, useWishlist } from '@hooks'

import * as styles from './styles'

export function WishListPage(): React.ReactElement {
  const { t } = useTranslation()
  const { slug } = useParams<{ slug?: string }>()
  const { data: wishlist, revalidate, error } = useWishlist(Number(slug))
  const dialog = useDialogState()
  const updateWishlist = useUpdateWishlist()
  const deleteWishlistItem = useDeleteWishlistItem()

  const isLoading = !error && !wishlist

  const WishlistEmpty = (): React.ReactElement => {
    return (
      <p css={styles.wishlistEmpty}>
        {t('bc.wish_list.empty', 'This whishlist is empty')}
      </p>
    )
  }

  if (isLoading) return <p>Loading...</p> // TODO: Add a skeleton loading
  if (!wishlist) return <p>Not found</p>
  if (error) return <p>Error</p>

  const { is_guest: isGuest } = wishlist
  if (isGuest) {
    return (
      <div css={styles.container}>
        <div css={styles.header}>
          <span css={styles.titleWrapper}>
            <Typography variant="display-large" css={styles.title}>
              {wishlist.name}
            </Typography>
          </span>
        </div>
        <div css={styles.wrapperGuest}>
          {Array.isArray(wishlist?.items) && wishlist?.items?.length === 0 && (
            <WishlistEmpty />
          )}
          {wishlist.items
            ?.map(
              (product): ProductCardWithButtonsProps => ({
                brand: {
                  name: product.product?.brand?.name || '',
                },
                product: {
                  condition: 'new',
                  name: product.product?.name || '',
                  price: product.product?.prices?.basePrice?.value,
                  sale_price: product.product?.prices?.salePrice?.value || 0,
                },
                currencySettings: {},
                image: {
                  meta:
                    product.product?.images?.edges?.[0]?.node?.altText || '',
                  url_standard:
                    product.product?.images?.edges?.[0]?.node.urlOriginal || '',
                },
                productId: product.product?.entityId || 0, // TODO: Fix this
                variantId:
                  product.product?.variants?.edges?.[0]?.node?.entityId,
                path: product.product?.path || '', // TODO: Fix this,
              })
            )
            .map((product) => (
              <ProductCardWithButtons key={product.productId} {...product} />
            ))}
        </div>
      </div>
    )
  }

  return (
    <div css={styles.container}>
      <div css={styles.header}>
        <span>
          <Link css={styles.back} to="/user/wishlists">
            <svg width={8} height={12} viewBox="0 0 8 12" fill="none">
              <path
                d="M6 10L2 6l4-4"
                stroke="#333"
                strokeWidth={2}
                strokeMiterlimit={10}
                strokeLinecap="square"
              />
            </svg>
            {t('bc.wish_list.back', 'Back to my wish lists')}
          </Link>
        </span>
        <span css={styles.titleWrapper}>
          <Typography variant="display-large" css={styles.title}>
            {wishlist.name}
          </Typography>
        </span>

        <WishlistActions
          dialog={dialog}
          wishlist={wishlist}
          onWishlistAction={() => {}}
        />
        <WishlistDialog
          {...dialog}
          title={t('bc.wish_list.edit', 'Edit wish list')}
          button={t('bc.wish_list.edit', 'Edit wish list')}
          initialValues={{
            name: wishlist.name || '',
            isPublic: wishlist.is_public || false,
          }}
          onSubmit={async ({ isPublic, name }) => {
            if (!wishlist.id) {
              throw new Error('Wishlist id not found')
            }
            await updateWishlist({
              isPublic,
              name,
              wishlistId: wishlist.id,
            })
            await revalidate()
            dialog.hide()
          }}
        />
      </div>
      <div css={styles.statusWrapper}>
        <WishlistStatus wishlist={wishlist} />
      </div>
      <div css={styles.wrapper}>
        {Array.isArray(wishlist?.items) && wishlist?.items?.length === 0 && (
          <WishlistEmpty />
        )}
        {wishlist.items
          ?.map(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            (item): ProductRowProps => ({
              prices: {
                price: item?.product?.prices?.basePrice?.value,
                salePrice: item?.product?.prices?.salePrice?.value || 0,
                currencySettings: {},
              },
              name: item?.product?.name || '',
              image: {
                src: item?.product?.images?.edges?.[0]?.node?.urlOriginal,
                alt: item?.product?.images?.edges?.[0]?.node?.altText,
              },
              id: String(item.id),
              onDelete: async () => {
                if (!wishlist.id) {
                  throw new Error('Wishlist id not found')
                }
                if (!item.id) {
                  throw new Error('Item id not found')
                }
                await deleteWishlistItem({
                  wishlistId: wishlist.id,
                  itemId: item.id,
                })
                await revalidate()
              },
            })
          )
          .map((product) => (
            <ProductRow key={product.id} {...product} />
          ))}
      </div>
    </div>
  )
}
