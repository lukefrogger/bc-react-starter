import * as React from 'react'

import { ItemBody } from '@bigcommerce/storefront-data-hooks/api/cart'
import useAddItem from '@bigcommerce/storefront-data-hooks/cart/use-add-item'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

type UseAddCartItem = {
  addCartItem: () => Promise<void>
  isAdding: boolean
  setQuantity: React.Dispatch<React.SetStateAction<number>>
  quantity: number
}

export function useAddCartItem(item?: Partial<ItemBody>): UseAddCartItem {
  const [quantity, setQuantity] = React.useState(1)
  const addItem = useAddItem()
  const { t } = useTranslation()

  const [isAdding, setIsAdding] = React.useState(false)

  const addCartItem = async (): Promise<void> => {
    setIsAdding(true)
    try {
      if (!item || item.productId === undefined)
        throw new Error('Item is required')
      await addItem({ quantity, ...item, productId: item.productId })
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
  return { addCartItem, isAdding, setQuantity, quantity }
}
