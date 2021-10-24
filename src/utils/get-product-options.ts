import type { ProductNode } from '@bigcommerce/storefront-data-hooks/api/operations/get-product'
import {
  CatalogProductOptionValue,
  DateFieldOption,
  MultipleChoiceOption,
} from '@bigcommerce/storefront-data-hooks/schema'

type ProductOptionValue = CatalogProductOptionValue

export type ProductOption =
  | (Pick<
      MultipleChoiceOption,
      'entityId' | 'displayName' | 'isVariantOption' | 'isRequired'
    > & {
      values: ProductOptionValue[]
      type: 'multipleChoice'
    })
  | (Pick<
      DateFieldOption,
      | 'entityId'
      | 'displayName'
      | 'isVariantOption'
      | 'isRequired'
      | 'earliest'
      | 'latest'
      | 'limitDateBy'
    > & {
      type: 'dateField'
      defaultDate?: string
    })

// Returns the available options of a product
export function getProductOptions(product?: ProductNode): ProductOption[] {
  if (!product) return []
  const options = product.productOptions.edges?.reduce<ProductOption[]>(
    (acc, edge) => {
      // eslint-disable-next-line no-underscore-dangle
      if (edge?.node.__typename === 'MultipleChoiceOption') {
        const values = edge.node.values.edges?.reduce<ProductOptionValue[]>(
          (valueAcc, valueEdge) => {
            if (!valueEdge?.node) return valueAcc
            return [...valueAcc, valueEdge?.node]
          },
          []
        )
        if (values !== undefined) {
          acc.push({
            ...edge.node,
            displayName: edge.node.displayName.toLowerCase(),
            values,
            type: 'multipleChoice',
          })
        }
      }
      // eslint-disable-next-line no-underscore-dangle
      if (edge?.node.__typename === 'DateFieldOption') {
        acc.push({
          ...edge.node,
          displayName: edge.node.displayName,
          type: 'dateField',
        })
      }
      return acc
    },
    []
  )

  return options || []
}
