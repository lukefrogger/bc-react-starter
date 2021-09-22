import { getConfig } from '@bigcommerce/storefront-data-hooks/api/'
import getCustomerId from '@bigcommerce/storefront-data-hooks/api/operations/get-customer-id'

export const updateCustomerHelper = async (req, res) => {
  const config = getConfig()
  const customerToken = req.cookies[config.customerCookie]
  const [data] = req.body
  const { id } = data || {}
  const customerId =
    customerToken && (await getCustomerId({ customerToken, config }))

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
  })

  return res.status(201).json({ data: null })
}
