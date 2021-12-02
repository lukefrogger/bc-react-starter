import useCart from '@bigcommerce/storefront-data-hooks/cart/use-cart'

export function useCartBadge(): number | undefined {
  const { data: cart } = useCart()
  const physicalProducts = cart?.line_items?.physical_items ?? []
  const digitalProducts = cart?.line_items?.digital_items ?? []
  const cartItems = physicalProducts?.concat(digitalProducts)

  return cartItems.reduce((acc, item) => {
    return acc + item.quantity
  }, 0)
}
