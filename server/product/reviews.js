import { getConfig } from '@bigcommerce/storefront-data-hooks/api/'

import * as handlers from './handlers'

export const productReviewsApi = async (req, res) => {
  const config = getConfig()
  try {
    if (req.method === 'GET') {
      return await handlers.getProductReviews({
        req,
        res,
        config,
      })
    }

    if (req.method === 'POST') {
      return await handlers.addProductReview({
        req,
        res,
        config,
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
