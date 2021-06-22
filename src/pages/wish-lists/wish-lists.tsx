import * as React from 'react'

import { useTranslation } from 'react-i18next'
import { Button, Typography } from 'unsafe-bc-react-components'

import { WishlistRow } from '@components'
import { useAddWishlist, useWishlists } from '@hooks'

import * as styles from './styles'

export function WishListsPage(): React.ReactElement {
  const { t } = useTranslation()
  const { data } = useWishlists()
  const add = useAddWishlist()

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
      <Button
        variant="secondary"
        css={styles.button}
        onClick={() => {
          add({
            productId: 12504,
          })
        }}
      >
        {t('bc.wishlist.new', 'New wish list')}
      </Button>
      {data?.map((wishlist) => {
        return (
          <WishlistRow
            key={wishlist.id}
            wishlist={wishlist}
            onWishlistAction={() => {}}
          />
        )
      })}
    </div>
  )
}
