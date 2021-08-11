import * as React from 'react'

import {
  ProductCard,
  Props as ProductCardProps,
} from 'unsafe-bc-react-components'

import { useAddCartItem, useQuickView } from '@hooks'
import { ProductModal } from '@pages/product-modal'

export type ProductCardWithButtonsProps = ProductCardProps & {
  productId: number
  variantId?: number
  path: string
}

export function ProductCardWithButtons(
  props: ProductCardWithButtonsProps
): React.ReactElement {
  const { productId, variantId, path, ...rest } = props

  const quickView = useQuickView()

  const { addCartItem, isAdding } = useAddCartItem({
    productId,
    variantId,
  })

  return (
    <>
      <ProductCard
        {...rest}
        buttons={[
          {
            onClick: addCartItem,
            disabled: isAdding,
            children: 'Add to Cart',
            id: 'add-to-cart',
          },
          {
            onClick: () => quickView.onShow(path),
            children: 'Quick view',
            variant: 'tertiary',
            id: 'quick-view',
          },
        ]}
      />
      <ProductModal modal={quickView.modal} slug={quickView.slug} />
    </>
  )
}
