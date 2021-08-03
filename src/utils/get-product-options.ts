import type { ProductNode } from '@bigcommerce/storefront-data-hooks/api/operations/get-product'

type ProductOptionValue = {
  label: string
  [key: string]: any
}

export type ProductOption = {
  displayName: string
  values: ProductOptionValue[]
}

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
            displayName: edge.node.displayName.toLowerCase(),
            values,
          })
        }
      }
      return acc
    },
    []
  )

  return options || []
}
