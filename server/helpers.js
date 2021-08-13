import cartApi from '@bigcommerce/storefront-data-hooks/api/cart'
import catalogProductsApi, {
  handlers as catalogProductsApiHandlers,
} from '@bigcommerce/storefront-data-hooks/api/catalog/products'
import loginApiHandlers from '@bigcommerce/storefront-data-hooks/api/customers/handlers/login'
import customersApi from '@bigcommerce/storefront-data-hooks/api/customers/login'
import getProduct from '@bigcommerce/storefront-data-hooks/api/operations/get-product'
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
        image {
          urlOriginal
          altText
          isDefault
        }
      }`,
    }),
  })

  res.end(JSON.stringify(data.data))
}
