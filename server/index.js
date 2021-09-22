import fs from 'fs'
import http from 'http'
import path from 'path'

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
import bodyParser from 'body-parser'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import * as proxy from 'http-proxy-middleware'
import serveStatic from 'serve-static'

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

const app = express()

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000',
  })
)

// gzip/deflate outgoing responses
app.use(compression())

// parse urlencoded request bodies into req.body
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())

const dirname = path.resolve(path.dirname(''))
app.use(serveStatic(path.join(dirname, 'build')))
app.use(serveStatic(path.join(dirname, 'public')))

// respond to all requests
app.use('/checkout', checkoutApi())
app.use('/api/site-info', getSiteInfoHelper)
app.use('/api/countries/:code/states', stateHelper)
app.use('/api/countries', countryHelper)
app.use('/api/bigcommerce/banners', bannersApi)
app.use('/api/bigcommerce/product/:productSlug/reviews', productReviewsApi)
app.use('/api/bigcommerce/product/:productSlug', productApi)
app.use('/api/bigcommerce/cart', cartApi())
app.use('/api/bigcommerce/address', addressesApi())
app.use('/api/bigcommerce/catalog/products', catalogProductsApi())
app.use('/api/bigcommerce/customers/login', loginApi())
app.use('/api/bigcommerce/customers/logout', logoutApi())
app.use('/api/bigcommerce/customers/signup', signupApi())
app.use('/api/bigcommerce/customers', customerApi())
app.use(
  '/api/bigcommerce/wishlist/:wishlistId/items/:itemId',
  getWishlistsItemsHelper
)
app.use('/api/bigcommerce/wishlist/:wishlistId/items', getWishlistsItemsHelper)
app.use('/api/bigcommerce/wishlist/:wishlistId', getWishlistsHelper)
app.use('/api/bigcommerce/wishlist', getWishlistsHelper)
app.use('/api/bigcommerce/orders/products', orderProductsApi())
app.use('/api/bigcommerce/orders/:orderId', getOrdersHelper)
app.use('/api/bigcommerce/orders', ordersApi())
app.use('/api/bigcommerce/update-customer', updateCustomerHelper)

app.use(
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

app.use('/hello', (req, res) => {
  res.end('Hello from your Bigcommerce Proxy Server!\n')
})

// Handles any requests that don't match the ones above
app.use((req, res) => {
  fs.createReadStream('build/index.html').pipe(res)
})

// create node.js http server and listen on port
http.createServer(app).listen(process.env.PORT || 3030)

// const BC_CONFIG = {
// token: process.env.BIGCOMMERCE_STORE_API_TOKEN,
// client_id: process.env.BC_CLIENT_ID,
// hash: process.env.BC_STORE_HASH,
// };
