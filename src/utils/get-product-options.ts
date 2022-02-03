import type { ProductNode } from '@bigcommerce/storefront-data-hooks/api/operations/get-product'
import { ProductInfoFragment } from '@bigcommerce/storefront-data-hooks/schema'

export type ProductOption = NonNullable<
  NonNullable<ProductInfoFragment['productOptions']['edges']>[number]
>['node']

const SUPPORTED_OPTION_TYPES: (ProductOption['__typename'] | undefined)[] = [
  'MultipleChoiceOption',
  'DateFieldOption',
  'TextFieldOption',
  'MultiLineTextFieldOption',
  'NumberFieldOption',
]

// Returns the supported options of a product
export function getProductOptions(product?: ProductNode): ProductOption[] {
  if (!product) return []
  const options = product.productOptions.edges?.reduce<ProductOption[]>(
    (acc, edge) => {
      if (
        SUPPORTED_OPTION_TYPES.includes(edge?.node.__typename) &&
        edge?.node
      ) {
        acc.push(edge.node)
      }
      return acc
    },
    []
  )

  return options || []
}
