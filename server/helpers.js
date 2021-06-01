import cartApi from '@bigcommerce/storefront-data-hooks/api/cart'
import fetchProduct from '@bigcommerce/storefront-data-hooks/api/operations/get-product'
import csc from 'country-state-city'

export const onStoreProxyReq = (proxyReq, req, res) => {
  proxyReq.setHeader(
    'X-Auth-Client',
    process.env.BIGCOMMERCE_STORE_API_CLIENT_ID
  )
  proxyReq.setHeader('X-Auth-Token', process.env.BIGCOMMERCE_STORE_API_TOKEN)
}

export const getProductHelper = async (req, res) => {
  const [first, slug, ...rest] = req.url.split('/')
  const query = { slug }
  const data = await fetchProduct.default({
    variables: query,
  })

  res.write(JSON.stringify(data))
  res.end()
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
