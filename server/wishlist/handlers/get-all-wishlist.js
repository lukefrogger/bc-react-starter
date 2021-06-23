import getCustomerId from '@bigcommerce/storefront-data-hooks/api/operations/get-customer-id'

import { getAllWishlists } from '../../operations/get-all-wishlists'

export const getAllWishlist = async ({ res, config, body }) => {
  const { customerToken, includeProducts } = body
  let result = {}

  if (customerToken) {
    const customerId =
      customerToken && (await getCustomerId({ customerToken, config }))

    if (!customerId) {
      // If the customerToken is invalid, then this request is too

      return res.status(404).json({
        data: null,
        errors: [{ message: 'Wishlist not found' }],
      })
    }
    const { wishlists } = await getAllWishlists({
      config,
      variables: { customerId },
      includeProducts,
    })
    result = { data: wishlists }
  }

  return res.status(200).json({ data: result.data || null })
}
