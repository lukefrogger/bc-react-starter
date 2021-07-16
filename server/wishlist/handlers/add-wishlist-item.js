import getCustomerId from '@bigcommerce/storefront-data-hooks/api/operations/get-customer-id'

export const addWishlistItem = async ({ res, config, body }) => {
  const { customerToken, item, wishlistId } = body

  if (!wishlistId) {
    return res.status(400).json({
      data: null,
      errors: [{ message: 'Missing wishlist' }],
    })
  }
  if (!item) {
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

  await config.storeApiFetch(`/v3/wishlists/${wishlistId}/items`, {
    method: 'POST',
    body: JSON.stringify({
      items: [
        {
          product_id: item.productId,
          variant_id: item.variantId,
        },
      ],
    }),
  })

  return res.status(201).json({ data: null })
}
