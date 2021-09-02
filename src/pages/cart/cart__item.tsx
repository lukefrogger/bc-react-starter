import * as React from 'react'

import useRemoveItem from '@bigcommerce/storefront-data-hooks/cart/use-remove-item'
import useUpdateItem from '@bigcommerce/storefront-data-hooks/cart/use-update-item'
import { ProductRow, ProductRowProps } from 'unsafe-bc-react-components'

type CartItemProps = ProductRowProps & {
  product_id: number
  variant_id?: number
}
export function CartItem(product: CartItemProps): React.ReactElement {
  const updateItem = useUpdateItem({
    product_id: product.product_id,
    variant_id: product.variant_id || 0,
    id: product.id || '',
    quantity: product.quantity?.quantity || 1,
  })

  const removeItem = useRemoveItem()

  return (
    <ProductRow
      {...product}
      quantity={{
        ...product.quantity,
        onChangeQuantity: (newQuantity) => {
          if (newQuantity < 1) {
            removeItem({
              id: product.id || '',
            })
          } else {
            updateItem({
              quantity: newQuantity,
            })
          }
        },
      }}
      onDelete={() =>
        removeItem({
          id: product.id || '',
        })
      }
    />
  )
}
