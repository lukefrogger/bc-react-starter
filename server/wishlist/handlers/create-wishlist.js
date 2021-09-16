import getCustomerId from '@bigcommerce/storefront-data-hooks/api/operations/get-customer-id'

export const createWishlist = async ({ res, config, body }) => {
  const { customerToken, name, isPublic, item } = body

  const customerId =
    customerToken && (await getCustomerId({ customerToken, config }))
  if (!customerId) {
    return res.status(400).json({
      data: null,
      errors: [{ message: 'Invalid request' }],
    })
  }

  const items = item
    ? [
        {
          product_id: item.productId,
          variant_id: item.variantId,
        },
      ]
    : []

  const options = {
    method: 'POST',
    body: JSON.stringify({
      name,
      customer_id: customerId,
      items,
      is_public: isPublic,
    }),
  }

  const { data } = await config.storeApiFetch('/v3/wishlists', options)

  res.status(200).json({ data })
}
