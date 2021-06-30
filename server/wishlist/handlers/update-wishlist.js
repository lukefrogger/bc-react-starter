import getCustomerId from '@bigcommerce/storefront-data-hooks/api/operations/get-customer-id'

export const updateWishlist = async ({ res, config, body }) => {
  const { customerToken, wishlistId, name, isPublic } = body

  const customerId =
    customerToken && (await getCustomerId({ customerToken, config }))
  if (!customerId) {
    return res.status(400).json({
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
    return res.status(401).json({
      data: null,
    })
  }

  const options = {
    method: 'PUT',
    body: JSON.stringify({
      name,
      customer_id: customerId,
      items: [], // Maybe it should be wishlist.items
      is_public: isPublic,
    }),
  }

  const { data } = await config.storeApiFetch(
    `/v3/wishlists/${wishlistId}`,
    options
  )

  return res.status(201).json({
    data,
  })
}
