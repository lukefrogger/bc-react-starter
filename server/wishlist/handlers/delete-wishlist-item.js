import getCustomerId from '@bigcommerce/storefront-data-hooks/api/operations/get-customer-id'

export const deleteWishlistItem = async ({ res, config, body }) => {
  const { customerToken, itemId, wishlistId } = body

  if (!wishlistId) {
    return res.status(400).json({
      data: null,
      errors: [{ message: 'Missing wishlist' }],
    })
  }
  if (!itemId) {
    return res.status(400).json({
      data: null,
      errors: [{ message: 'Missing item' }],
    })
  }

  const customerId =
    customerToken && (await getCustomerId({ customerToken, config }))

  if (!customerId) {
    return res.status(400).json({
      data: null,
      errors: [{ message: 'Invalid request' }],
    })
  }

  await config.storeApiFetch(`/v3/wishlists/${wishlistId}/items/${itemId}`, {
    method: 'DELETE',
  })

  return res.status(204).json({ data: null })
}
