import * as React from 'react'

import { useTranslation } from 'react-i18next'
import { DialogDisclosure, useDialogState } from 'reakit/Dialog'
import { Button, Typography } from 'unsafe-bc-react-components'

import { WishlistDialog, WishlistRow } from '@components'
import { useCreateWishlist, useDeleteWishlist, useWishlists } from '@hooks'

import * as styles from './styles'

export function WishListsPage(): React.ReactElement {
  const { t } = useTranslation()
  const { data } = useWishlists()
  const createWishlist = useCreateWishlist()
  const deleteWishlist = useDeleteWishlist()
  const dialog = useDialogState()

  return (
    <div css={styles.container}>
      <Typography variant="display-large" css={styles.title}>
        {t('bc.wishlist.title', 'My wish lists')}
      </Typography>
      <DialogDisclosure
        {...dialog}
        as={Button}
        variant="secondary"
        css={styles.button}
      >
        {t('bc.wishlist.new', 'New wish list')}
      </DialogDisclosure>
      <WishlistDialog
        {...dialog}
        resetOnSubmit
        onSubmit={async ({ isPublic, name }) => {
          await createWishlist({
            isPublic,
            name,
          })
          dialog.hide()
        }}
      />
      {data?.map((wishlist) => {
        return (
          <WishlistRow
            key={wishlist.id}
            wishlist={wishlist}
            onWishlistAction={(action, { id: wishlistId }) => {
              if (action === 'delete' && wishlistId) {
                deleteWishlist({ wishlistId })
              }
            }}
          />
        )
      })}
    </div>
  )
}
