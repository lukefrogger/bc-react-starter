import { getConfig } from '@bigcommerce/storefront-data-hooks/api/'

import * as handlers from './handlers'

export const getOrdersHelper = async (req, res) => {
  const config = getConfig()

  const { orderId } = req.params || {}

  const customerToken = req.cookies[config.customerCookie]

  try {
    if (req.method === 'GET') {
      const body = {
        customerToken,
      }

      return await handlers.getOrder({
        req,
        res,
        config,
        body: {
          ...body,
          orderId,
        },
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
