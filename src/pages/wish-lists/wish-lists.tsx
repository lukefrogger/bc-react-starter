import * as React from 'react'

import { useTranslation } from 'react-i18next'
import { DialogDisclosure, useDialogState } from 'reakit/Dialog'
import { Typography } from 'unsafe-bc-react-components'

import { WishlistDialog, WishlistLoading, WishlistRow } from '@components'
import { useCreateWishlist, useDeleteWishlist, useWishlists } from '@hooks'

import * as styles from './styles'

export function WishListsPage(): React.ReactElement {
  const { t } = useTranslation()
  const { data, error } = useWishlists()
  const createWishlist = useCreateWishlist()
  const deleteWishlist = useDeleteWishlist()
  const dialog = useDialogState()
  const isLoading = !error && !data
  const loadingArray = [1, 2]

  return (
    <div css={styles.container}>
      <Typography variant="display-large" css={styles.title}>
        {t('bc.wish_list.title', 'My wish lists')}
      </Typography>
      <DialogDisclosure {...dialog} css={styles.button}>
        {t('bc.wish_list.new', 'New wish list')}
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
      {isLoading
        ? loadingArray.map((loading) => {
            return <WishlistLoading key={loading} />
          })
        : data?.map((wishlist) => {
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
