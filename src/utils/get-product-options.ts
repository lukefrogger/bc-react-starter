import type { ProductNode } from '@bigcommerce/storefront-data-hooks/api/operations/get-product'

// Returns the available options of a product
export function getProductOptions(product: ProductNode): Array<any> {
  if (!product) return []
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const options = product.productOptions.edges?.reduce<ProductOption[]>(
    (arr: any, edge: any) => {
      // eslint-disable-next-line no-underscore-dangle
      if (edge?.node.__typename === 'MultipleChoiceOption') {
        arr.push({
          displayName: edge.node.displayName.toLowerCase(),
          values: edge.node.values.edges?.map(
            (valueEdge: any) => valueEdge?.node
          ),
        })
      }
      return arr
    },
    []
  )

  return options
}
