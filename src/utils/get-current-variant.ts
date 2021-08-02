import type { ProductNode } from '@bigcommerce/storefront-data-hooks/api/operations/get-product'

// Finds a variant in the product that matches the selected options
export function getCurrentVariant(product: ProductNode, opts: any): any {
  if (!product) return null
  const variant = product.variants.edges?.find((edge: any) => {
    const { node } = edge ?? {}
    const numberOfDefinedOpts = Object.values(opts).filter(
      (value) => value !== null
    ).length
    const numberOfEdges = node?.productOptions?.edges?.length

    const isEdgeEqualToOption = ([key, value]: [string, string | null]): any =>
      node?.productOptions.edges?.find((productOptionEdge: any) => {
        if (
          // eslint-disable-next-line no-underscore-dangle
          productOptionEdge?.node.__typename === 'MultipleChoiceOption' &&
          productOptionEdge.node.displayName.toLowerCase() === key
        ) {
          return productOptionEdge.node.values.edges?.find(
            (valueEdge: any) => valueEdge?.node.label === value
          )
        }
        return false
      })

    return numberOfDefinedOpts === numberOfEdges
      ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        Object.entries(opts).every(isEdgeEqualToOption)
      : // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        Object.entries(opts).some(isEdgeEqualToOption)
  })

  return variant ?? product.variants.edges?.[0]
}
