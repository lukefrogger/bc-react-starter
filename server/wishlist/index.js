import { getConfig } from '@bigcommerce/storefront-data-hooks/api/'
import getCustomerId from '@bigcommerce/storefront-data-hooks/api/operations/get-customer-id'
import createApiHandler from '@bigcommerce/storefront-data-hooks/api/utils/create-api-handler'
import wishlistApi, {
  handlers as wishlistApiHandlers,
} from '@bigcommerce/storefront-data-hooks/api/wishlist'

import { getAllWishlists } from '../operations/get-all-wishlists'
import { apiResWrapper } from '../utils/api-utils'
import { getSearchParams } from '../utils/get-search-params'
import * as handlers from './handlers'

function parseCookie(str) {
  return str
    .split(';')
    .map((v) => v.split('='))
    .reduce((acc, v) => {
      acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim())
      return acc
    }, {})
}

export const getWishlistsHelper = async (req, res) => {
  const config = getConfig()
  const cookies = parseCookie(req.headers.cookie)

  const { wishlistId } = req.params || {}

  const customerToken = cookies[config.customerCookie]
  const params = getSearchParams(req.url)

  /*   if (wishlistId) {
    return wishlistApi()
  } */

  try {
    // Get all wishlists
    if (req.method === 'GET') {
      const body = {
        customerToken,
        includeProducts: false,
      }
      return await handlers.getAllWishlist({
        req,
        res,
        config,
        body,
      })
    }
    // Create an empty wishlist
    if (req.method === 'POST') {
      console.log('body', req.body)
      const body = { ...req.body, customerToken }
      return await handlers.createWishlist({ req, res, config, body })
    }

    // Remove a wishlist
    if (req.method === 'DELETE') {
      const body = { customerToken, wishlistId }
      return await handlers.deleteWishlist({ req, res, config, body })
    }
  } catch (error) {
    console.error(error)

    const message = 'An unexpected error ocurred'

    res.status(500).json({ data: null, errors: [{ message }] })
  }
  return wishlistApi({
    operations: {
      getWishlist: async ({ res: apiRes, req: apiReq }) => {
        const wrapperRes = apiResWrapper(apiRes)
        let result = {}

        if (customerToken) {
          const customerId =
            customerToken && (await getCustomerId({ customerToken, config }))

          if (!customerId) {
            // If the customerToken is invalid, then this request is too

            return wrapperRes.status(404).json({
              data: null,
              errors: [{ message: 'Wishlist not found' }],
            })
          }
          const { wishlists } = await getAllWishlists({
            config,
            variables: { customerId },
            includeProducts: params.includeProducts,
          })
          result = { data: wishlists }
        }

        return wrapperRes.status(200).json({ data: result.data || null })
      },
      addItem: ({ res: apiRes, config, ...rest }) => {
        wishlistApiHandlers.addItem({
          res: apiResWrapper(apiRes),
          body: params,
          config,
          ...rest,
        })
      },
    },
  })(
    {
      ...req,
      cookies: parseCookie(req.headers.cookie),
      query: { products: '1' },
    },
    res
  )
}
