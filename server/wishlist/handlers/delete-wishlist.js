import getCustomerId from '@bigcommerce/storefront-data-hooks/api/operations/get-customer-id'

export const deleteWishlist = async ({ res, config, body }) => {
  const { customerToken, wishlistId } = body

  const customerId =
    customerToken && (await getCustomerId({ customerToken, config }))
  if (!customerId) {
    return res.status(401).json({
      data: null,
      errors: [{ message: 'Invalid request' }],
    })
  }

  // Get the wishlist to check that belong to that customer
  const { data: wishlist } = await config.storeApiFetch(
    `/v3/wishlists/${wishlistId}`,
    {
      method: 'GET',
    }
  )

  if (wishlist.customer_id !== customerId) {
    return res.status(403).json({
      data: null,
    })
  }

  await config.storeApiFetch(`/v3/wishlists/${wishlistId}`, {
    method: 'DELETE',
  })

  return res.status(204).json({
    data: null,
  })
}
