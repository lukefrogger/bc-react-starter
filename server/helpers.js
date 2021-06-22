import cartApi from '@bigcommerce/storefront-data-hooks/api/cart'
import catalogProductsApi, {
  handlers as catalogProductsApiHandlers,
} from '@bigcommerce/storefront-data-hooks/api/catalog/products'
import customerApi, {
  handlers as customerApiHandlers,
} from '@bigcommerce/storefront-data-hooks/api/customers'
import getCustomerId from '@bigcommerce/storefront-data-hooks/api/operations/get-customer-id'
import wishlistApi, {
  handlers as wishlistApiHandlers,
} from '@bigcommerce/storefront-data-hooks/api/wishlist'
import axios from 'axios'
import csc from 'country-state-city'

import { getAllWishlists } from './operations/get-all-wishlists'
import { apiResWrapper } from './utils/api-utils'
import { getSearchParams } from './utils/get-search-params'

export const onStoreProxyReq = (proxyReq, req, res) => {
  proxyReq.setHeader(
    'X-Auth-Client',
    process.env.BIGCOMMERCE_STORE_API_CLIENT_ID
  )
  proxyReq.setHeader('X-Auth-Token', process.env.BIGCOMMERCE_STORE_API_TOKEN)
}

export const getProductHelper = async (req, res) => {
  const params = getSearchParams(req.url)

  return catalogProductsApi({
    operations: {
      getProducts: ({ res: apiRes, config }) => {
        catalogProductsApiHandlers.getProducts({
          res: apiResWrapper(apiRes),
          body: params,
          config,
        })
      },
    },
  })(req, res)
}

export const getCustomerHelper = async (req, res) => {
  // console.log('params_0', req.headers)
  const params = getSearchParams(req.url)
  // console.log('params', params)
  const parseCookie = (str) =>
    str
      .split(';')
      .map((v) => v.split('='))
      .reduce((acc, v) => {
        acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim())
        return acc
      }, {})
  return customerApi({
    operations: {
      getLoggedInCustomer: ({ res: apiRes, req: apiReq, ...rest }) => {
        customerApiHandlers.getLoggedInCustomer({
          res: apiResWrapper(apiRes),
          body: params,
          req: {
            ...apiReq,
            cookies: parseCookie(apiReq.headers.cookie),
          },
          ...rest,
        })
      },
    },
  })(req, res)
}

export const getWishlistsHelper = async (req, res) => {
  const params = getSearchParams(req.url)
  const parseCookie = (str) =>
    str
      .split(';')
      .map((v) => v.split('='))
      .reduce((acc, v) => {
        acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim())
        return acc
      }, {})

  return wishlistApi({
    operations: {
      getWishlist: async ({ res: apiRes, req: apiReq, config }) => {
        const cookies = parseCookie(apiReq.headers.cookie)
        const wrapperRes = apiResWrapper(apiRes)
        const customerToken = cookies[config.customerCookie]
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

export const wrapResponse = (res) => {
  res.json = (data) => {
    res.write(JSON.stringify(data))
  }

  res.status = (s) => {
    res.statusCode = s
    return res
  }
  return res
}

export const cartHelper = async (req, res) => {
  const [first, cartId, ...rest] = req.url.split('/')
  const handler = await cartApi.default()
  req.cookies = { bc_cartId: cartId || null }
  const cart = await handler(req, wrapResponse(res), cartApi.handlers)
  res.end()
}

export const countryHelper = (req, res) => {
  const data = csc.default.getAllCountries().map((country) => {
    const { name, isoCode } = country
    return { name, sortname: name, id: isoCode }
  })
  res.write(JSON.stringify(data))
  res.end()
}

export const stateHelper = (req, res) => {
  const [host, code] = req.url.split('/')
  const states = csc.default.getStatesOfCountry(code)

  const data = states.map(({ name, isoCode }) => ({ name, id: isoCode }))
  res.write(JSON.stringify(data))
  res.end()
}

export const categoriesHelper = async (req, res) => {
  const { data } = await axios(process.env.BIGCOMMERCE_STOREFRONT_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.BIGCOMMERCE_STOREFRONT_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    data: JSON.stringify({
      query: `query CategoryTree3LevelsDeep {
        site {
          categoryTree {
            ...CategoryFields
            children {
              ...CategoryFields
              children {
                ...CategoryFields
              }
            }
          }
        }
      }

      fragment CategoryFields on CategoryTreeItem {
        name
        path
        entityId
        description
        productCount
      }`,
    }),
  })

  res.end(JSON.stringify(data.data))
}
