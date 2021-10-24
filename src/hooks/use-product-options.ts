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
  optionSelections: OptionSelection[]
}

type OptionSelection = {
  option_id: number
  option_value: number
}

function getOptionSelections(choices: Choices): OptionSelection[] {
  return Object.entries(choices).reduce<OptionSelection[]>(
    (acc, [optionId, optionValue]) => {
      if (optionValue && !Number.isNaN(Number(optionId))) {
        if (optionValue instanceof Date) {
          acc.push({
            option_id: Number(optionId),
            option_value: Math.floor(Number(optionValue) / 1000), // BigCommerce expects unix timestamp (seconds)
          })
        } else {
          acc.push({
            option_id: Number(optionId),
            option_value: Number(optionValue),
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
  const variant = getCurrentVariant(product, choices)
  const optionSelections = getOptionSelections(choices) // TODO: Refactor to useOptionSelections with useMemo

  React.useEffect(() => {
    setChoices((prevChoices) => {
      return options.reduce<Choices>((acc, option) => {
        if (option.type === 'multipleChoice') {
          const defaultChoice = option.values.find((value) => value.isDefault)
          acc[option.entityId] =
            prevChoices[option.entityId] ||
            defaultChoice?.entityId ||
            // TODO: Don't set first value if it's not required
            option.values[0].entityId
        }
        if (option.type === 'dateField') {
          const defaultDate = option.defaultDate
            ? new Date(option.defaultDate)
            : null
          acc[option.entityId] = prevChoices[option.entityId] || defaultDate
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
