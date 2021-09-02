import { useDialogState } from 'reakit/Dialog'

import { WishlistItemDialogProps, WishlistItemDialogValues } from '@components'
import {
  AddItemInput,
  useAddWishlistItem,
  useDeleteWishlistItem,
  useWishlists,
} from '@hooks'

export const useWishlistDialog = (
  item: Omit<Partial<AddItemInput>, 'wishlistId'>
): WishlistItemDialogProps => {
  const dialog = useDialogState()

  const { data: wishlists } = useWishlists()
  const addWishlistItem = useAddWishlistItem()
  const deleteWishlistItem = useDeleteWishlistItem()

  async function onSubmitAdd({
    additions,
    deletions,
  }: WishlistItemDialogValues): Promise<void> {
    await Promise.all([
      ...additions.map((addition) => {
        if (!item || item.productId === undefined)
          throw new Error('Item is required')
        return addWishlistItem({
          ...item,
          productId: item.productId,
          wishlistId: addition.wishlistId,
        })
      }),
      ...deletions.map((deletion) => {
        const itemId = wishlists?.reduce(
          (acc: number | null | undefined, wishlist) => {
            if (wishlist.id === deletion.wishlistId) {
              const itemToDelete = wishlist.items?.find(
                (wishlistItem) => wishlistItem.product_id === item.productId
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
  return {
    ...dialog,
    ...item,
    wishlists,
    onSubmitAdd,
  }
}
