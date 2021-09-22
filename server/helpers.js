import getSiteInfo from '@bigcommerce/storefront-data-hooks/api/operations/get-site-info'
import csc from 'country-state-city'

export const onStoreProxyReq = (proxyReq, req, res) => {
  proxyReq.setHeader(
    'X-Auth-Client',
    process.env.BIGCOMMERCE_STORE_API_CLIENT_ID
  )
  proxyReq.setHeader('X-Auth-Token', process.env.BIGCOMMERCE_STORE_API_TOKEN)
  if (req.method === 'PUT' || req.method === 'POST') {
    proxyReq.write(JSON.stringify(req.body))
    proxyReq.end()
  }
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
