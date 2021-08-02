import * as React from 'react'

import useAddItem from '@bigcommerce/storefront-data-hooks/cart/use-add-item'
import { useTranslation } from 'react-i18next'
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

  const { t } = useTranslation()
  const quickView = useQuickView()
  const addItem = useAddItem()
  const [isAdding, setIsAdding] = React.useState(false)

  const addToCart = async (): Promise<void> => {
    setIsAdding(true)
    try {
      await addItem({
        productId,
        variantId,
      })
      toast.success(t('bc.cart.added', 'Added to cart'), {
        position: 'bottom-right',
      })
    } catch (e) {
      toast.error(t('bc.cart.error_adding', 'Error adding to cart'), {
        position: 'bottom-right',
      })
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
