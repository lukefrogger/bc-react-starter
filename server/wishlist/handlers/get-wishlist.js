import getAllProducts from '@bigcommerce/storefront-data-hooks/api/operations/get-all-products'
import getCustomerId from '@bigcommerce/storefront-data-hooks/api/operations/get-customer-id'

export const getWishlist = async ({ res, config, body }) => {
  const { customerToken, includeProducts, wishlistId } = body

  const customerId =
    customerToken && (await getCustomerId({ customerToken, config }))

  const { data: wishlist } = await config.storeApiFetch(
    `/v3/wishlists/${wishlistId}`
  )

  const isGuest = customerId !== wishlist.customer_id

  if (!wishlist.is_public && isGuest) {
    return res.status(403).json({ data: null })
  }

  if (!wishlist) {
    return res.status(404).json({ data: null })
  }

  if (includeProducts && wishlist && wishlist.items.length) {
    const entityIds =
      wishlist.items &&
      wishlist.items.map((item) => item && item.product_id).filter((id) => !!id)
    if (entityIds && entityIds.length) {
      const graphqlData = await getAllProducts({
        variables: { first: 50, entityIds },
        config,
      })
      // Put the products in an object that we can use to get them by id
      const productsById = graphqlData.products.reduce((prods, p) => {
        // eslint-disable-next-line no-param-reassign
        prods[p.node.entityId] = p
        return prods
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

  return res.status(200).json({ data: { ...wishlist, is_guest: isGuest } })
}
