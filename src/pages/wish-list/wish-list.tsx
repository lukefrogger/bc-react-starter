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
  EditWishlistDialog,
  WishlistActions,
  WishlistStatus,
} from '@components'
import { useWishlist } from '@hooks'

import * as styles from './styles'

export function WishListPage(): React.ReactElement {
  const { t } = useTranslation()
  const { slug } = useParams<{ slug?: string }>()
  const { data } = useWishlist(Number(slug))
  const dialog = useDialogState()

  if (!data) return <p>empty</p>
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
            {t('bc.wishlist.back', 'Back to my wish lists')}
          </Link>
        </span>
        <span css={styles.titleWrapper}>
          <Typography variant="display-large" css={styles.title}>
            {data.name}
          </Typography>
        </span>

        <WishlistActions
          dialog={dialog}
          wishlist={data}
          onWishlistAction={() => {}}
        />
        <EditWishlistDialog
          {...dialog}
          name={data.name || ''}
          wishlistId={data.id || 1}
          makeItPublic={data.is_public || false}
        />
      </div>
      <div css={styles.statusWrapper}>
        <WishlistStatus wishlist={data} />
      </div>
      <div css={styles.wrapper}>
        {data.items
          ?.map(
            (item): ProductRowProps => ({
              prices: {
                price: item.product.prices.basePrice?.value,
                salePrice: item.product.prices.salePrice?.value || 0,
                currencySettings: {},
              },
              name: item.product.name,
              quantity: {
                quantity: 1,
              },
              image: {
                src: item.product.images?.edges[0].node.urlOriginal,
                alt: item.product.images?.edges[0].node.altText,
              },
            })
          )
          .map((product) => (
            <ProductRow
              key={product.id}
              {...product}
              quantity={{
                quantity: 1,
              }}
              editable={false}
            />
          ))}
      </div>
    </div>
  )
}
