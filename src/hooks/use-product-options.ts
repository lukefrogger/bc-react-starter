import React from 'react'

import type { ItemBody } from '@bigcommerce/storefront-data-hooks/api/cart'
import type { ProductNode } from '@bigcommerce/storefront-data-hooks/api/operations/get-product'

import {
  Choices,
  getCurrentVariant,
  getProductOptions,
  ProductOption,
} from '@utils'

export type UseProductOptions = {
  options: ProductOption[]
  choices: Choices
  variant: any
  setChoices: React.Dispatch<Choices>
  optionSelections: OptionSelection[]
}

type OptionSelection = NonNullable<ItemBody['optionSelections']>[number]

function getOptionSelections(choices: Choices): OptionSelection[] {
  return Object.entries(choices).reduce<OptionSelection[]>(
    (acc, [optionId, optionValue]) => {
      if (optionValue && !Number.isNaN(Number(optionId))) {
        if (optionValue instanceof Date) {
          acc.push({
            option_id: Number(optionId),
            option_value: Math.floor(Number(optionValue) / 1000), // BigCommerce expects unix timestamp (seconds)
          })
        } else if (!Number.isNaN(Number(optionValue))) {
          acc.push({
            option_id: Number(optionId),
            option_value: Number(optionValue),
          })
        } else {
          // TextField
          acc.push({
            option_id: Number(optionId),
            option_value: optionValue,
          })
        }
      }
      return acc
    },
    []
  )
}

export function useProductOptions(product?: ProductNode): UseProductOptions {
  const options = React.useMemo(() => getProductOptions(product), [product])
  const [choices, setChoices] = React.useState<Choices>({})
  const variant = React.useMemo(
    () => getCurrentVariant(product, choices),
    [product, choices]
  )
  const optionSelections = React.useMemo(
    () => getOptionSelections(choices),
    [choices]
  )

  React.useEffect(() => {
    setChoices((prevChoices) => {
      return options.reduce<Choices>((acc, option) => {
        if (option.__typename === 'MultipleChoiceOption') {
          const defaultChoice = option.values?.edges?.find(
            (value) => value?.node.isDefault
          )
          acc[option.entityId] =
            prevChoices[option.entityId] ||
            defaultChoice?.node.entityId ||
            // Auto-set first value if it's required
            option.isVariantOption ||
            option.isRequired
              ? option.values.edges?.[0]?.node.entityId || null
              : null
        }
        if (option.__typename === 'DateFieldOption') {
          const defaultDate = option.defaultDate
            ? new Date(option.defaultDate)
            : null
          acc[option.entityId] = prevChoices[option.entityId] || defaultDate
        }
        if (
          option.__typename === 'TextFieldOption' ||
          option.__typename === 'MultiLineTextFieldOption'
        ) {
          const defaultText = option.defaultValue || ''
          acc[option.entityId] = prevChoices[option.entityId] || defaultText
        }
        return acc
      }, {})
    })
  }, [options])

  return {
    options,
    choices,
    setChoices,
    variant,
    optionSelections,
  }
}
