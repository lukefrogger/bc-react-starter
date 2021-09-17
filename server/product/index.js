// import { getConfig } from '@bigcommerce/storefront-data-hooks/api/'

import * as handlers from './handlers'

export * from './reviews'

export const productApi = async (req, res) => {
  // const config = getConfig()
  try {
    if (req.method === 'GET') {
      return await handlers.getProduct({
        req,
        res,
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
