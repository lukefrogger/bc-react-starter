import * as React from 'react'

import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ProductRow, Typography } from 'unsafe-bc-react-components'

import { WishlistActions, WishlistStatus } from '@components'

import * as styles from './styles'

const WISHLIST_MOCKED = {
  is_public: false,
  customer_id: 1,
  id: 1,
  items: [{ id: 1, product_id: 1 }],
  name: "Paul's Whislist Long Long",
}

export function WishListPage(): React.ReactElement {
  const { t } = useTranslation()
  return (
    <div css={styles.container}>
      <div css={styles.header}>
        <span>
          <Link css={styles.back} to="/wishlists">
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
            {WISHLIST_MOCKED.name}
          </Typography>
        </span>

        <WishlistActions
          wishlist={WISHLIST_MOCKED}
          onWishlistAction={() => {}}
        />
      </div>
      <div css={styles.statusWrapper}>
        <WishlistStatus
          wishlist={WISHLIST_MOCKED}
          onWishlistAction={() => {}}
        />
      </div>
      <div css={styles.wrapper}>
        {[
          {
            name: 'Product name',
            prices: { currencySettings: {}, price: 21, salePrice: 20 },
            quantity: 1,
            id: 1,
            image: 'http://placekitten.com/500/500',
          },
          {
            name: 'Other name',
            prices: { currencySettings: {}, price: 21, salePrice: 0 },
            quantity: 1,
            id: 2,
            image: 'http://placekitten.com/500/500',
          },
        ].map((product) => (
          <ProductRow
            key={product.id}
            name={product.name}
            prices={product.prices}
            image={{
              src: product.image,
            }}
            quantity={{
              quantity: product.quantity,
            }}
            editable={false}
          />
        ))}
      </div>
    </div>
  )
}
