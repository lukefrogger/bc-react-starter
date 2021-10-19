import React from 'react'

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
  const options = React.useMemo(() => getProductOptions(product), [product])
  const [choices, setChoices] = React.useState<Choices>({})
  const variant = getCurrentVariant(product, choices)

  React.useEffect(() => {
    setChoices((prevChoices) => {
      return options.reduce<Choices>((acc, option) => {
        const defaultChoice = option.values.find((value) => value.isDefault)
        acc[option.displayName] =
          prevChoices[option.displayName] ||
          defaultChoice?.entityId ||
          option.values[0].entityId
        return acc
      }, {})
    })
  }, [options])

  return {
    options,
    choices,
    setChoices,
    variant,
  }
}
