import getProductOperation from '@bigcommerce/storefront-data-hooks/api/operations/get-product'

export const getProduct = async ({ res, req }) => {
  const { productSlug: slug } = req.params || {}
  const { product } = await getProductOperation({
    variables: { slug },
  })
  return res.json(product)
}
