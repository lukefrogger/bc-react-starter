import getCustomerId from '@bigcommerce/storefront-data-hooks/api/operations/get-customer-id'

export const getOrder = async ({ res, config, body }) => {
  try {
    const { customerToken, orderId } = body

    const customerId =
      customerToken && (await getCustomerId({ customerToken, config }))
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
    })

    return res.status(200).json({ data: data || null })
  } catch (error) {
    const message = 'An unexpected error ocurred'

    return res.status(404).json({ errors: [{ message }] })
  }
}
