import useCart from '@bigcommerce/storefront-data-hooks/cart/use-cart'

export function useCartBadge(): number | undefined {
  const { data: cart } = useCart()
  return cart?.line_items?.physical_items?.reduce((acc, item) => {
    return acc + item.quantity
  }, 0)
}
