import * as React from 'react'

import { useTranslation } from 'react-i18next'
import { Button, Typography } from 'unsafe-bc-react-components'

import { WishlistRow } from '@components'

import * as styles from './styles'

export function WishListsPage(): React.ReactElement {
  const { t } = useTranslation()
  return (
    <div css={styles.container}>
      {
        // TODO: Add Tab component
      }
      <Typography variant="display-large" css={styles.title}>
        {t('bc.wishlist.title', 'My wish lists')}
      </Typography>
      {
        // TODO: Open modal to create a new wish list
      }
      <Button variant="secondary" css={styles.button}>
        {t('bc.wishlist.new', 'New wish list')}
      </Button>
      {[
        {
          is_public: false,
          customer_id: 1,
          id: 1,
          items: [{ id: 1, product_id: 1 }],
          name: "Paul's Whislist",
          token: '22',
        },
        {
          is_public: true,
          customer_id: 1,
          id: 2,
          items: [{ id: 1, product_id: 1 }],
          name: 'Paul’s Wishlist with a long loooonger title',
          token: '22',
        },
      ].map((wishlist) => (
        <WishlistRow
          key={wishlist.id}
          wishlist={wishlist}
          onWishlistAction={() => {}}
        />
      ))}
    </div>
  )
}
