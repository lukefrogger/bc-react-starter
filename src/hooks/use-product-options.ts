import * as React from 'react'

import type { ProductNode } from '@bigcommerce/storefront-data-hooks/api/operations/get-product'

import {
  Choices,
  getCurrentVariant,
  getProductOptions,
  ProductOption,
} from '@utils'

type UseProductOptions = {
  options: ProductOption[]
  choices: Choices
  variant: any
  setChoices: React.Dispatch<Choices>
}

export function useProductOptions(product?: ProductNode): UseProductOptions {
  const options = getProductOptions(product)
  const [choices, setChoices] = React.useState<Choices>({})
  const variant = getCurrentVariant(product, choices)

  return {
    options,
    choices,
    setChoices,
    variant,
  }
}
