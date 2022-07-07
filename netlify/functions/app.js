'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var path = require('path');
var bodyParser = require('body-parser');
var compression = require('compression');
var cookieParser = require('cookie-parser');
var express = require('express');
var serveStatic = require('serve-static');
var fs = require('fs');
var addressesApi = require('@bigcommerce/storefront-data-hooks/api/address');
var cartApi = require('@bigcommerce/storefront-data-hooks/api/cart');
var catalogProductsApi = require('@bigcommerce/storefront-data-hooks/api/catalog/products');
var checkoutApi = require('@bigcommerce/storefront-data-hooks/api/checkout');
var customerApi = require('@bigcommerce/storefront-data-hooks/api/customers');
var loginApi = require('@bigcommerce/storefront-data-hooks/api/customers/login');
var logoutApi = require('@bigcommerce/storefront-data-hooks/api/customers/logout');
var signupApi = require('@bigcommerce/storefront-data-hooks/api/customers/signup');
var ordersApi = require('@bigcommerce/storefront-data-hooks/api/orders');
var orderProductsApi = require('@bigcommerce/storefront-data-hooks/api/orders/products');
var proxy = require('http-proxy-middleware');
var _ = require('@bigcommerce/storefront-data-hooks/api/');
var getAllProducts = require('@bigcommerce/storefront-data-hooks/api/operations/get-all-products');
var getCustomerId = require('@bigcommerce/storefront-data-hooks/api/operations/get-customer-id');
var api = require('@bigcommerce/storefront-data-hooks/api');
var getSiteInfo = require('@bigcommerce/storefront-data-hooks/api/operations/get-site-info');
var csc = require('country-state-city');
var getProductOperation = require('@bigcommerce/storefront-data-hooks/api/operations/get-product');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}

var path__default = /*#__PURE__*/_interopDefaultLegacy(path);
var bodyParser__default = /*#__PURE__*/_interopDefaultLegacy(bodyParser);
var compression__default = /*#__PURE__*/_interopDefaultLegacy(compression);
var cookieParser__default = /*#__PURE__*/_interopDefaultLegacy(cookieParser);
var express__default = /*#__PURE__*/_interopDefaultLegacy(express);
var serveStatic__default = /*#__PURE__*/_interopDefaultLegacy(serveStatic);
var fs__default = /*#__PURE__*/_interopDefaultLegacy(fs);
var addressesApi__default = /*#__PURE__*/_interopDefaultLegacy(addressesApi);
var cartApi__default = /*#__PURE__*/_interopDefaultLegacy(cartApi);
var catalogProductsApi__default = /*#__PURE__*/_interopDefaultLegacy(catalogProductsApi);
var checkoutApi__default = /*#__PURE__*/_interopDefaultLegacy(checkoutApi);
var customerApi__default = /*#__PURE__*/_interopDefaultLegacy(customerApi);
var loginApi__default = /*#__PURE__*/_interopDefaultLegacy(loginApi);
var logoutApi__default = /*#__PURE__*/_interopDefaultLegacy(logoutApi);
var signupApi__default = /*#__PURE__*/_interopDefaultLegacy(signupApi);
var ordersApi__default = /*#__PURE__*/_interopDefaultLegacy(ordersApi);
var orderProductsApi__default = /*#__PURE__*/_interopDefaultLegacy(orderProductsApi);
var proxy__namespace = /*#__PURE__*/_interopNamespace(proxy);
var getAllProducts__default = /*#__PURE__*/_interopDefaultLegacy(getAllProducts);
var getCustomerId__default = /*#__PURE__*/_interopDefaultLegacy(getCustomerId);
var getSiteInfo__default = /*#__PURE__*/_interopDefaultLegacy(getSiteInfo);
var csc__default = /*#__PURE__*/_interopDefaultLegacy(csc);
var getProductOperation__default = /*#__PURE__*/_interopDefaultLegacy(getProductOperation);

const getWishlist = async ({ res, config, body }) => {
  const { customerToken, includeProducts, wishlistId } = body;

  const customerId =
    customerToken && (await getCustomerId__default["default"]({ customerToken, config }));

  const { data: wishlist } = await config.storeApiFetch(
    `/v3/wishlists/${wishlistId}`
  );

  const isGuest = customerId !== wishlist.customer_id;

  if (!wishlist.is_public && isGuest) {
    return res.status(403).json({ data: null })
  }

  if (!wishlist) {
    return res.status(404).json({ data: null })
  }

  if (includeProducts && wishlist && wishlist.items.length) {
    const entityIds =
      wishlist.items &&
      wishlist.items.map((item) => item && item.product_id).filter((id) => !!id);
    if (entityIds && entityIds.length) {
      const graphqlData = await getAllProducts__default["default"]({
        variables: { first: 50, entityIds },
        config,
      });
      // Put the products in an object that we can use to get them by id
      const productsById = graphqlData.products.reduce((prods, p) => {
        // eslint-disable-next-line no-param-reassign
        prods[p.node.entityId] = p;
        return prods
      }, {});
      // Populate the wishlist items with the graphql products
      wishlist.items.forEach((item) => {
        const product = item && productsById[item.product_id];
        if (item && product) {
          // eslint-disable-next-line no-param-reassign
          item.product = product.node;
        }
      });
    }
  }

  return res.status(200).json({ data: { ...wishlist, is_guest: isGuest } })
};

async function getAllWishlists({
  config: c,
  variables,
  includeProducts,
}) {
  const config = api.getConfig(c);
  const { data = [] } = await config.storeApiFetch(
    `/v3/wishlists?customer_id=${variables.customerId}`
  );
  const wishlists = await Promise.all(
    data.map(async (wishlist) => {
      if (includeProducts && wishlist && wishlist.items.length) {
        const entityIds =
          wishlist.items &&
          wishlist.items
            .map((item) => item && item.product_id)
            .filter((id) => !!id);
        if (entityIds && entityIds.length) {
          const graphqlData = await getAllProducts__default["default"]({
            variables: { first: 50, entityIds },
            config,
          });
          // Put the products in an object that we can use to get them by id
          const productsById = graphqlData.products.reduce((acc, product) => {
            return { ...acc, [product.node.entityId]: product }
          }, {});
          // Populate the wishlist items with the graphql products
          wishlist.items.forEach((item) => {
            const product = item && productsById[item.product_id];
            if (item && product) {
              // eslint-disable-next-line no-param-reassign
              item.product = product.node;
            }
          });
        }
      }
      return wishlist
    })
  );
  return { wishlists }
}

const getAllWishlist = async ({ res, config, body }) => {
  const { customerToken, includeProducts } = body;
  let result = {};

  if (customerToken) {
    const customerId =
      customerToken && (await getCustomerId__default["default"]({ customerToken, config }));

    if (!customerId) {
      // If the customerToken is invalid, then this request is too

      return res.status(404).json({
        data: null,
        errors: [{ message: 'Wishlist not found' }],
      })
    }
    const { wishlists } = await getAllWishlists({
      config,
      variables: { customerId },
      includeProducts,
    });
    result = { data: wishlists };
  }

  return res.status(200).json({ data: result.data || null })
};

const createWishlist = async ({ res, config, body }) => {
  const { customerToken, name, isPublic, item } = body;

  const customerId =
    customerToken && (await getCustomerId__default["default"]({ customerToken, config }));
  if (!customerId) {
    return res.status(400).json({
      data: null,
      errors: [{ message: 'Invalid request' }],
    })
  }

  const items = item
    ? [
        {
          product_id: item.productId,
          variant_id: item.variantId,
        },
      ]
    : [];

  const options = {
    method: 'POST',
    body: JSON.stringify({
      name,
      customer_id: customerId,
      items,
      is_public: isPublic,
    }),
  };

  const { data } = await config.storeApiFetch('/v3/wishlists', options);

  res.status(200).json({ data });
};

const deleteWishlist = async ({ res, config, body }) => {
  const { customerToken, wishlistId } = body;

  const customerId =
    customerToken && (await getCustomerId__default["default"]({ customerToken, config }));
  if (!customerId) {
    return res.status(401).json({
      data: null,
      errors: [{ message: 'Invalid request' }],
    })
  }

  // Get the wishlist to check that belong to that customer
  const { data: wishlist } = await config.storeApiFetch(
    `/v3/wishlists/${wishlistId}`,
    {
      method: 'GET',
    }
  );

  if (wishlist.customer_id !== customerId) {
    return res.status(403).json({
      data: null,
    })
  }

  await config.storeApiFetch(`/v3/wishlists/${wishlistId}`, {
    method: 'DELETE',
  });

  return res.status(204).json({
    data: null,
  })
};

const updateWishlist = async ({ res, config, body }) => {
  const { customerToken, wishlistId, name, isPublic } = body;

  const customerId =
    customerToken && (await getCustomerId__default["default"]({ customerToken, config }));
  if (!customerId) {
    return res.status(400).json({
      data: null,
      errors: [{ message: 'Invalid request' }],
    })
  }

  // Get the wishlist to check that belong to that customer
  const { data: wishlist } = await config.storeApiFetch(
    `/v3/wishlists/${wishlistId}`,
    {
      method: 'GET',
    }
  );

  if (wishlist.customer_id !== customerId) {
    return res.status(401).json({
      data: null,
    })
  }

  const options = {
    method: 'PUT',
    body: JSON.stringify({
      name,
      customer_id: customerId,
      items: [], // Maybe it should be wishlist.items
      is_public: isPublic,
    }),
  };

  const { data } = await config.storeApiFetch(
    `/v3/wishlists/${wishlistId}`,
    options
  );

  return res.status(201).json({
    data,
  })
};

const addWishlistItem = async ({ res, config, body }) => {
  const { customerToken, item, wishlistId } = body;

  if (!wishlistId) {
    return res.status(400).json({
      data: null,
      errors: [{ message: 'Missing wishlist' }],
    })
  }
  if (!item) {
    return res.status(400).json({
      data: null,
      errors: [{ message: 'Missing item' }],
    })
  }

  const customerId =
    customerToken && (await getCustomerId__default["default"]({ customerToken, config }));

  if (!customerId) {
    return res.status(400).json({
      data: null,
      errors: [{ message: 'Invalid request' }],
    })
  }

  await config.storeApiFetch(`/v3/wishlists/${wishlistId}/items`, {
    method: 'POST',
    body: JSON.stringify({
      items: [
        {
          product_id: item.productId,
          variant_id: item.variantId,
        },
      ],
    }),
  });

  return res.status(201).json({ data: null })
};

const deleteWishlistItem = async ({ res, config, body }) => {
  const { customerToken, itemId, wishlistId } = body;

  if (!wishlistId) {
    return res.status(400).json({
      data: null,
      errors: [{ message: 'Missing wishlist' }],
    })
  }
  if (!itemId) {
    return res.status(400).json({
      data: null,
      errors: [{ message: 'Missing item' }],
    })
  }

  const customerId =
    customerToken && (await getCustomerId__default["default"]({ customerToken, config }));

  if (!customerId) {
    return res.status(400).json({
      data: null,
      errors: [{ message: 'Invalid request' }],
    })
  }

  await config.storeApiFetch(`/v3/wishlists/${wishlistId}/items/${itemId}`, {
    method: 'DELETE',
  });

  return res.status(204).json({ data: null })
};

const getWishlistsItemsHelper = async (req, res) => {
  const config = _.getConfig();

  const { wishlistId, itemId } = req.params || {};

  const customerToken = req.cookies[config.customerCookie];

  try {
    if (req.method === 'POST') {
      const body = { ...req.body, customerToken, wishlistId };
      // Add wishlist item
      return await addWishlistItem({
        req,
        res,
        config,
        body,
      })
    }
    if (req.method === 'DELETE') {
      const body = { customerToken, itemId, wishlistId };
      // Delete wishlist item
      return await deleteWishlistItem({
        req,
        res,
        config,
        body,
      })
    }
  } catch (error) {
    console.error(error);

    const message = 'An unexpected error ocurred';

    return res.status(500).json({ data: null, errors: [{ message }] })
  }

  return res
    .status(404)
    .json({ data: null, errors: [{ message: 'Not found' }] })
};

const getBanners = async ({ res, config }) => {
  const banners = await config.storeApiFetch(`/v2/banners`, {
    headers: {
      Accept: 'application/json',
    },
  });
  return res.status(200).json(banners)
};

const bannersApi = async (req, res) => {
  const config = _.getConfig();

  try {
    if (req.method === 'GET') {
      return await getBanners({
        req,
        res,
        config,
      })
    }
  } catch (error) {
    console.error(error);

    const message = 'An unexpected error ocurred';

    return res.status(500).json({ data: null, errors: [{ message }] })
  }
  return res
    .status(404)
    .json({ data: null, errors: [{ message: 'Not found' }] })
};

const onStoreProxyReq = (proxyReq, req, res) => {
  proxyReq.setHeader(
    'X-Auth-Client',
    process.env.BIGCOMMERCE_STORE_API_CLIENT_ID
  );
  proxyReq.setHeader('X-Auth-Token', process.env.BIGCOMMERCE_STORE_API_TOKEN);
  if (req.method === 'PUT' || req.method === 'POST') {
    proxyReq.write(JSON.stringify(req.body));
    proxyReq.end();
  }
};

const countryHelper = (req, res) => {
  const data = csc__default["default"].getAllCountries().map((country) => {
    const { name, isoCode } = country;
    return { name, sortname: name, id: isoCode }
  });
  res.json(data);
};

const stateHelper = (req, res) => {
  const { code } = req.params;
  const states = csc__default["default"].getStatesOfCountry(code);

  const data = states.map(({ name, isoCode }) => ({ name, id: isoCode }));
  res.json(data);
};

const getSiteInfoHelper = async (req, res) => {
  const data = await getSiteInfo__default["default"]();
  res.end(JSON.stringify(data));
};

const getOrder = async ({ res, config, body }) => {
  try {
    const { customerToken, orderId } = body;

    const customerId =
      customerToken && (await getCustomerId__default["default"]({ customerToken, config }));
    if (!customerId || !orderId) {
      return res.status(400).json({
        data: null,
        errors: [{ message: 'Invalid request' }],
      })
    }

    const data = await config.storeApiFetch(`/v2/orders/${orderId}`, {
      headers: {
        Accept: 'application/json',
      },
    });

    return res.status(200).json({ data: data || null })
  } catch (error) {
    const message = 'An unexpected error ocurred';

    return res.status(404).json({ errors: [{ message }] })
  }
};

const getOrdersHelper = async (req, res) => {
  const config = _.getConfig();

  const { orderId } = req.params || {};

  const customerToken = req.cookies[config.customerCookie];

  try {
    if (req.method === 'GET') {
      const body = {
        customerToken,
      };

      return await getOrder({
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
    console.error(error);

    const message = 'An unexpected error ocurred';

    return res.status(500).json({ data: null, errors: [{ message }] })
  }
  return res
    .status(404)
    .json({ data: null, errors: [{ message: 'Not found' }] })
};

const getProduct = async ({ res, req }) => {
  const { productSlug: slug } = req.params || {};
  const { product } = await getProductOperation__default["default"]({
    variables: { slug },
  });
  return res.json(product)
};

const getProductReviewsQuery = /* GraphQL */ `
  query getProductReviews($path: String!) {
    site {
      route(path: $path) {
        node {
          __typename
          ... on Product {
            reviews {
              edges {
                node {
                  author {
                    name
                  }
                  title
                  text
                  rating
                  createdAt {
                    utc
                  }
                  entityId
                }
                cursor
              }
              pageInfo {
                startCursor
                endCursor
                hasNextPage
                hasPreviousPage
              }
            }
          }
        }
      }
    }
  }
`;
const getProductReviews = async ({ res, req, config }) => {
  const { productSlug: slug } = req.params || {};
  const { data } = await config.fetch(getProductReviewsQuery, {
    variables: {
      path: `/${slug}/`,
    },
  });
  const { reviews } = data.site.route.node;
  return res.status(200).json(reviews)
};

const addProductReview = async ({ res, req, config }) => {
  const { body } = req;
  const options = {
    method: 'POST',
    body: JSON.stringify({
      ...body,
      date_reviewed: new Date().toISOString().replace(/\.[0-9]{3}/, ''),
    }),
  };

  await config.storeApiFetch(
    `/v3/catalog/products/${body.productId}/reviews`,
    options
  );

  return res.status(204).end()
};

const productReviewsApi = async (req, res) => {
  const config = _.getConfig();
  try {
    if (req.method === 'GET') {
      return await getProductReviews({
        req,
        res,
        config,
      })
    }

    if (req.method === 'POST') {
      return await addProductReview({
        req,
        res,
        config,
      })
    }
  } catch (error) {
    console.error(error);

    const message = 'An unexpected error ocurred';

    return res.status(500).json({ data: null, errors: [{ message }] })
  }
  return res
    .status(404)
    .json({ data: null, errors: [{ message: 'Not found' }] })
};

// import { getConfig } from '@bigcommerce/storefront-data-hooks/api/'

const productApi = async (req, res) => {
  // const config = getConfig()
  try {
    if (req.method === 'GET') {
      return await getProduct({
        req,
        res,
      })
    }
  } catch (error) {
    console.error(error);

    const message = 'An unexpected error ocurred';

    return res.status(500).json({ data: null, errors: [{ message }] })
  }
  return res
    .status(404)
    .json({ data: null, errors: [{ message: 'Not found' }] })
};

const updateCustomerHelper = async (req, res) => {
  const config = _.getConfig();
  const customerToken = req.cookies[config.customerCookie];
  const [data] = req.body;
  const { id } = data || {};
  const customerId =
    customerToken && (await getCustomerId__default["default"]({ customerToken, config }));

  if (!id || !customerToken) {
    return res.status(400).json({
      data: null,
      errors: [{ message: 'Invalid Request' }],
    })
  }

  if (!customerId || customerId !== id) {
    return res.status(400).json({
      data: null,
      errors: [{ message: 'Invalid request' }],
    })
  }

  await config.storeApiFetch(`/v3/customers`, {
    method: 'PUT',
    body: JSON.stringify(req.body),
  });

  return res.status(201).json({ data: null })
};

const getWishlistsHelper = async (req, res) => {
  const config = _.getConfig();

  const { wishlistId } = req.params || {};

  const customerToken = req.cookies[config.customerCookie];

  try {
    if (req.method === 'GET') {
      const { products } = req.query || {};
      const body = {
        customerToken,
        includeProducts: products === '1',
      };
      // Get only a single wishlist
      if (wishlistId) {
        return await getWishlist({
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
      return await getAllWishlist({
        req,
        res,
        config,
        body,
      })
    }
    // Create a wishlist
    if (req.method === 'POST') {
      const body = { ...req.body, customerToken };
      return await createWishlist({ req, res, config, body })
    }

    // Remove a wishlist
    if (req.method === 'DELETE') {
      const body = { customerToken, wishlistId };
      return await deleteWishlist({ req, res, config, body })
    }
    // Update a wishlist
    if (req.method === 'PUT') {
      const body = { ...req.body, customerToken, wishlistId };
      return await updateWishlist({ req, res, config, body })
    }
  } catch (error) {
    console.error(error);

    const message = 'An unexpected error ocurred';

    return res.status(500).json({ data: null, errors: [{ message }] })
  }
  return res
    .status(404)
    .json({ data: null, errors: [{ message: 'Not found' }] })
};

const createRoutes = (router) => {
  // respond to all requests
  router.use('/checkout', checkoutApi__default["default"]());
  router.use('/api/site-info', getSiteInfoHelper);
  router.use('/api/countries/:code/states', stateHelper);
  router.use('/api/countries', countryHelper);
  router.use('/api/bigcommerce/banners', bannersApi);
  router.use('/api/bigcommerce/product/:productSlug/reviews', productReviewsApi);
  router.use('/api/bigcommerce/product/:productSlug', productApi);
  router.use('/api/bigcommerce/cart', cartApi__default["default"]());
  router.use('/api/bigcommerce/address', addressesApi__default["default"]());
  router.use('/api/bigcommerce/catalog/products', catalogProductsApi__default["default"]());
  router.use('/api/bigcommerce/customers/login', loginApi__default["default"]());
  router.use('/api/bigcommerce/customers/logout', logoutApi__default["default"]());
  router.use('/api/bigcommerce/customers/signup', signupApi__default["default"]());
  router.use('/api/bigcommerce/customers', customerApi__default["default"]());
  router.use(
    '/api/bigcommerce/wishlist/:wishlistId/items/:itemId',
    getWishlistsItemsHelper
  );
  router.use(
    '/api/bigcommerce/wishlist/:wishlistId/items',
    getWishlistsItemsHelper
  );
  router.use('/api/bigcommerce/wishlist/:wishlistId', getWishlistsHelper);
  router.use('/api/bigcommerce/wishlist', getWishlistsHelper);
  router.use('/api/bigcommerce/orders/products', orderProductsApi__default["default"]());
  router.use('/api/bigcommerce/orders/:orderId', getOrdersHelper);
  router.use('/api/bigcommerce/orders', ordersApi__default["default"]());
  router.use('/api/bigcommerce/update-customer', updateCustomerHelper);

  router.use(
    '/api',
    proxy__namespace.createProxyMiddleware({
      target: process.env.BIGCOMMERCE_STORE_API_URL,
      changeOrigin: true,
      logLevel: 'debug',
      pathRewrite(newPath) {
        return newPath.replace('/api', '')
      },
      onProxyReq: onStoreProxyReq,
    })
  );

  router.use('/hello', (req, res) => {
    res.end('Hello from your Bigcommerce Proxy Server!\n');
  });

  // Handles any requests that don't match the ones above
  router.use((req, res) => {
    fs__default["default"].createReadStream('build/index.html').pipe(res);
  });

  return router
};

const app = express__default["default"]();

// gzip/deflate outgoing responses
app.use(compression__default["default"]());

// parse urlencoded request bodies into req.body
app.use(bodyParser__default["default"].urlencoded({ extended: false }));
app.use(bodyParser__default["default"].json());
app.use(cookieParser__default["default"]());

const dirname = path__default["default"].resolve(path__default["default"].dirname(''));
app.use(serveStatic__default["default"](path__default["default"].join(dirname, 'build')));
app.use(serveStatic__default["default"](path__default["default"].join(dirname, 'public')));

exports.app = app;
exports.createRoutes = createRoutes;
