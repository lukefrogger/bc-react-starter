import * as React from 'react'

import useAddItem from '@bigcommerce/storefront-data-hooks/cart/use-add-item'
import { toast } from 'react-toastify'
import {
  ProductCard,
  Props as ProductCardProps,
} from 'unsafe-bc-react-components'

import { useQuickView } from '@hooks/use-quick-view'
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
  const addItem = useAddItem()
  const [isAdding, setIsAdding] = React.useState(false)
  const addToCart = async (): Promise<void> => {
    setIsAdding(true)
    try {
      await addItem({
        productId,
        variantId, // TODO: Handle variant
      })
      toast.success('Added to the cart')
    } catch (e) {
      toast.error('Error adding to the cart')
    } finally {
      setIsAdding(false)
    }
  }
  return (
    <>
      <ProductCard
        {...rest}
        buttons={[
          {
            onClick: addToCart,
            disabled: isAdding,
            children: 'Add to Cart',
          },
          {
            onClick: () => quickView.onShow(path),
            children: 'Quick view',
            variant: 'tertiary',
          },
        ]}
      />
      <ProductModal modal={quickView.modal} slug={quickView.slug} />
    </>
  )
}
