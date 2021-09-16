export const addProductReview = async ({ res, req, config }) => {
  const { body } = req
  const options = {
    method: 'POST',
    body: JSON.stringify({
      ...body,
      date_reviewed: new Date().toISOString().replace(/\.[0-9]{3}/, ''),
    }),
  }

  await config.storeApiFetch(
    `/v3/catalog/products/${body.productId}/reviews`,
    options
  )

  return res.status(204).end()
}
