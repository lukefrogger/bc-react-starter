import { getConfig } from '@bigcommerce/storefront-data-hooks/api'
import getAllProducts from '@bigcommerce/storefront-data-hooks/api/operations/get-all-products'

export async function getAllWishlists({
  config: c,
  variables,
  includeProducts,
}) {
  const config = getConfig(c)
  const { data = [] } = await config.storeApiFetch(
    `/v3/wishlists?customer_id=${variables.customerId}`
  )
  const wishlists = await Promise.all(
    data.map(async (wishlist) => {
      if (includeProducts && wishlist && wishlist.items.length) {
        const entityIds =
          wishlist.items &&
          wishlist.items
            .map((item) => item && item.product_id)
            .filter((id) => !!id)
        if (entityIds && entityIds.length) {
          const graphqlData = await getAllProducts({
            variables: { first: 50, entityIds },
            config,
          })
          // Put the products in an object that we can use to get them by id
          const productsById = graphqlData.products.reduce((acc, product) => {
            return { ...acc, [product.node.entityId]: product }
          }, {})
          // Populate the wishlist items with the graphql products
          wishlist.items.forEach((item) => {
            const product = item && productsById[item.product_id]
            if (item && product) {
              // eslint-disable-next-line no-param-reassign
              item.product = product.node
            }
          })
        }
      }
      return wishlist
    })
  )
  return { wishlists }
}
