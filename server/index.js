import fs from 'fs'
import http from 'http'
import path from 'path'

import customerApi from '@bigcommerce/storefront-data-hooks/api/customers'
import loginApi from '@bigcommerce/storefront-data-hooks/api/customers/login'
import signupApi from '@bigcommerce/storefront-data-hooks/api/customers/signup'
import orderProductsApi from '@bigcommerce/storefront-data-hooks/api/orders/products'
import bodyParser from 'body-parser'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import * as proxy from 'http-proxy-middleware'
import serveStatic from 'serve-static'

import {
  cartHelper,
  categoriesHelper,
  countryHelper,
  getAddressHelper,
  getProductHelper,
  onStoreProxyReq,
  stateHelper,
} from './helpers'
import { getOrdersHelper } from './orders'
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
app.use('/cart-helper', cartHelper)
app.use('/countries', countryHelper)
app.use('/categories', categoriesHelper)
app.use('/country/', stateHelper)
app.use('/product', getProductHelper)
app.use('/api/bigcommerce/address', getAddressHelper)
app.use('/api/bigcommerce/catalog/products', getProductHelper)
app.use('/api/bigcommerce/customers/login', loginApi())
app.use('/api/bigcommerce/customers/signup', signupApi())
app.use('/api/bigcommerce/customers', customerApi())
app.use('/api/bigcommerce/wishlist/:wishlistId', getWishlistsHelper)
app.use('/api/bigcommerce/wishlist', getWishlistsHelper)
app.use('/api/bigcommerce/orders/products', orderProductsApi())
app.use('/api/bigcommerce/order/:orderId', getOrdersHelper)
app.use(
  '/api',
  proxy.createProxyMiddleware({
    target: process.env.BIGCOMMERCE_STORE_API_URL,
    changeOrigin: true,
    logLevel: 'debug',
    pathRewrite(newPath, req) {
      return newPath.replace('/api', '')
    },
    onProxyReq: onStoreProxyReq,
  })
)

app.use('/hello', function (req, res) {
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
