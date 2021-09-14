import cartApi from '@bigcommerce/storefront-data-hooks/api/cart'
import catalogProductsApi, {
  handlers as catalogProductsApiHandlers,
} from '@bigcommerce/storefront-data-hooks/api/catalog/products'
import loginApiHandlers from '@bigcommerce/storefront-data-hooks/api/customers/handlers/login'
import customersApi from '@bigcommerce/storefront-data-hooks/api/customers/login'
import getProduct from '@bigcommerce/storefront-data-hooks/api/operations/get-product'
import getSiteInfo from '@bigcommerce/storefront-data-hooks/api/operations/get-site-info'
import fetchGraphqlApi from '@bigcommerce/storefront-data-hooks/api/utils/fetch-graphql-api'
import axios from 'axios'
import csc from 'country-state-city'

export const onStoreProxyReq = (proxyReq, req, res) => {
  proxyReq.setHeader(
    'X-Auth-Client',
    process.env.BIGCOMMERCE_STORE_API_CLIENT_ID
  )
  proxyReq.setHeader('X-Auth-Token', process.env.BIGCOMMERCE_STORE_API_TOKEN)
}

export const getProductHelper = async (req, res) => {
  const body = req.query

  return catalogProductsApi({
    operations: {
      getProducts: (handler) => {
        catalogProductsApiHandlers.getProducts({
          ...handler,
          body,
        })
      },
    },
  })(req, res)
}

export const getProductSingleHelper = async (req, res) => {
  const { productSlug: slug } = req.params || {}
  const { product } = await getProduct({
    variables: { slug },
  })
  return res.json(product)
}

export const getProductReviewsQuery = /* GraphQL */ `
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
`

export const getProductReviewsHelper = async (req, res) => {
  const { productSlug: slug } = req.params || {}
  const { data } = await fetchGraphqlApi(getProductReviewsQuery, {
    variables: {
      path: `/${slug}/`,
    },
  })
  try {
    const { reviews } = data.site.route.node
    return res.status(200).json(reviews)
  } catch (e) {
    return res.status(500).end()
  }
}

export const cartHelper = async (req, res) => {
  const [first, cartId, ...rest] = req.url.split('/')
  const handler = await cartApi.default()
  req.cookies = { bc_cartId: cartId || null }
  const cart = await handler(req, res, cartApi.handlers)
  res.end()
}

export const countryHelper = (req, res) => {
  const data = csc.getAllCountries().map((country) => {
    const { name, isoCode } = country
    return { name, sortname: name, id: isoCode }
  })
  res.json(data)
}

export const stateHelper = (req, res) => {
  const { code } = req.params
  const states = csc.getStatesOfCountry(code)

  const data = states.map(({ name, isoCode }) => ({ name, id: isoCode }))
  res.json(data)
}

export const getSiteInfoHelper = async (req, res) => {
  const data = await getSiteInfo()
  res.end(JSON.stringify(data))
}
