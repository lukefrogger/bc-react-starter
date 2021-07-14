import { getConfig } from '@bigcommerce/storefront-data-hooks/api/'

import * as handlers from './handlers'

export const getWishlistsItemsHelper = async (req, res) => {
  const config = getConfig()

  const { wishlistId, itemId } = req.params || {}

  const customerToken = req.cookies[config.customerCookie]

  try {
    if (req.method === 'POST') {
      const body = { ...req.body, customerToken, wishlistId }
      // Add wishlist item
      return await handlers.addWishlistItem({
        req,
        res,
        config,
        body,
      })
    }
    if (req.method === 'DELETE') {
      const body = { customerToken, itemId, wishlistId }
      // Delete wishlist item
      return await handlers.deleteWishlistItem({
        req,
        res,
        config,
        body,
      })
    }
  } catch (error) {
    console.error(error)

    const message = 'An unexpected error ocurred'

    return res.status(500).json({ data: null, errors: [{ message }] })
  }

  return res
    .status(404)
    .json({ data: null, errors: [{ message: 'Not found' }] })
}
