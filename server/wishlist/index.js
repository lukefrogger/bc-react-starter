import { getConfig } from '@bigcommerce/storefront-data-hooks/api/'

import * as handlers from './handlers'

export const getWishlistsHelper = async (req, res) => {
  const config = getConfig()

  const { wishlistId } = req.params || {}

  const customerToken = req.cookies[config.customerCookie]

  try {
    if (req.method === 'GET') {
      const { products } = req.query || {}
      const body = {
        customerToken,
        includeProducts: products === '1',
      }
      // Get only a single wishlist
      if (wishlistId) {
        return await handlers.getWishlist({
          req,
          res,
          config,
          body: {
            ...body,
            wishlistId,
          },
        })
      }
      // Get all wishlists
      return await handlers.getAllWishlist({
        req,
        res,
        config,
        body,
      })
    }
    // Create a wishlist
    if (req.method === 'POST') {
      const body = { ...req.body, customerToken }
      return await handlers.createWishlist({ req, res, config, body })
    }

    // Remove a wishlist
    if (req.method === 'DELETE') {
      const body = { customerToken, wishlistId }
      return await handlers.deleteWishlist({ req, res, config, body })
    }
    // Update a wishlist
    if (req.method === 'PUT') {
      const body = { ...req.body, customerToken, wishlistId }
      return await handlers.updateWishlist({ req, res, config, body })
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
