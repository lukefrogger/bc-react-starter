import { useDialogState } from 'reakit/Dialog'

import {
  WishlistDialogValues,
  WishlistItemDialogProps,
  WishlistItemDialogValues,
} from '@components'
import {
  AddItemInput,
  useAddWishlistItem,
  useCreateWishlist,
  useDeleteWishlistItem,
  useWishlists,
} from '@hooks'

export const useWishlistItemDialog = (
  item: Omit<Partial<AddItemInput>, 'wishlistId'>
): WishlistItemDialogProps => {
  const dialog = useDialogState()

  const { data: wishlists } = useWishlists()
  const addWishlistItem = useAddWishlistItem()
  const deleteWishlistItem = useDeleteWishlistItem()
  const createWishlist = useCreateWishlist()

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
  async function onSubmitCreate({
    isPublic,
    name,
  }: WishlistDialogValues): Promise<void> {
    await createWishlist({
      isPublic,
      name,
    })
  }

  async function oSubmitCreateAndAdd({
    isPublic,
    name,
  }: WishlistDialogValues): Promise<void> {
    if (!item || item.productId === undefined)
      throw new Error('Item is required')
    await createWishlist({
      isPublic,
      name,
      item: {
        productId: item.productId,
        variantId: item.variantId,
      },
    })
  }
  return {
    ...dialog,
    ...item,
    wishlists,
    onSubmitAdd,
    onSubmitCreate,
    oSubmitCreateAndAdd,
  }
}
