import fs from 'fs'

import addressesApi from '@bigcommerce/storefront-data-hooks/api/address'
import cartApi from '@bigcommerce/storefront-data-hooks/api/cart'
import catalogProductsApi from '@bigcommerce/storefront-data-hooks/api/catalog/products'
import checkoutApi from '@bigcommerce/storefront-data-hooks/api/checkout'
import customerApi from '@bigcommerce/storefront-data-hooks/api/customers'
import loginApi from '@bigcommerce/storefront-data-hooks/api/customers/login'
import logoutApi from '@bigcommerce/storefront-data-hooks/api/customers/logout'
import signupApi from '@bigcommerce/storefront-data-hooks/api/customers/signup'
import ordersApi from '@bigcommerce/storefront-data-hooks/api/orders'
import orderProductsApi from '@bigcommerce/storefront-data-hooks/api/orders/products'
import * as proxy from 'http-proxy-middleware'

import { getWishlistsItemsHelper } from './wishlist/items'
import { bannersApi } from './banners'
import {
  countryHelper,
  getSiteInfoHelper,
  onStoreProxyReq,
  stateHelper,
} from './helpers'
import { getOrdersHelper } from './orders'
import { productApi, productReviewsApi } from './product'
import { updateCustomerHelper } from './update-customer'
import { getWishlistsHelper } from './wishlist'

export const createRoutes = (router) => {
  // respond to all requests
  router.use('/checkout', checkoutApi())
  router.use('/api/site-info', getSiteInfoHelper)
  router.use('/api/countries/:code/states', stateHelper)
  router.use('/api/countries', countryHelper)
  router.use('/api/bigcommerce/banners', bannersApi)
  router.use('/api/bigcommerce/product/:productSlug/reviews', productReviewsApi)
  router.use('/api/bigcommerce/product/:productSlug', productApi)
  router.use('/api/bigcommerce/cart', cartApi())
  router.use('/api/bigcommerce/address', addressesApi())
  router.use('/api/bigcommerce/catalog/products', catalogProductsApi())
  router.use('/api/bigcommerce/customers/login', loginApi())
  router.use('/api/bigcommerce/customers/logout', logoutApi())
  router.use('/api/bigcommerce/customers/signup', signupApi())
  router.use('/api/bigcommerce/customers', customerApi())
  router.use(
    '/api/bigcommerce/wishlist/:wishlistId/items/:itemId',
    getWishlistsItemsHelper
  )
  router.use(
    '/api/bigcommerce/wishlist/:wishlistId/items',
    getWishlistsItemsHelper
  )
  router.use('/api/bigcommerce/wishlist/:wishlistId', getWishlistsHelper)
  router.use('/api/bigcommerce/wishlist', getWishlistsHelper)
  router.use('/api/bigcommerce/orders/products', orderProductsApi())
  router.use('/api/bigcommerce/orders/:orderId', getOrdersHelper)
  router.use('/api/bigcommerce/orders', ordersApi())
  router.use('/api/bigcommerce/update-customer', updateCustomerHelper)

  router.use(
    '/api',
    proxy.createProxyMiddleware({
      target: process.env.BIGCOMMERCE_STORE_API_URL,
      changeOrigin: true,
      logLevel: 'debug',
      pathRewrite(newPath) {
        return newPath.replace('/api', '')
      },
      onProxyReq: onStoreProxyReq,
    })
  )

  router.use('/hello', (req, res) => {
    res.end('Hello from your Bigcommerce Proxy Server!\n')
  })

  // Handles any requests that don't match the ones above
  router.use((req, res) => {
    fs.createReadStream('build/index.html').pipe(res)
  })

  return router
}
