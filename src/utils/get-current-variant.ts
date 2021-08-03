import type { ProductNode } from '@bigcommerce/storefront-data-hooks/api/operations/get-product'

export type Choices = Record<string, string | null>

// Finds a variant in the product that matches the selected options
export function getCurrentVariant(
  product?: ProductNode,
  choices: Choices = {}
): any {
  if (!product) return null

  const variant = product.variants.edges?.find((edge) => {
    const { node } = edge ?? {}
    const numberOfDefinedOpts = Object.values(choices).filter(
      (value) => value !== null
    ).length
    const numberOfEdges = node?.productOptions?.edges?.length

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const isEdgeEqualToOption = ([key, value]: [string, string | null]) =>
      node?.productOptions.edges?.find((productOptionEdge) => {
        if (
          // eslint-disable-next-line no-underscore-dangle
          productOptionEdge?.node.__typename === 'MultipleChoiceOption' &&
          productOptionEdge.node.displayName.toLowerCase() === key
        ) {
          return productOptionEdge.node.values.edges?.find(
            (valueEdge) => valueEdge?.node.label === value
          )
        }
        return false
      })

    return numberOfDefinedOpts === numberOfEdges
      ? Object.entries(choices).every(isEdgeEqualToOption)
      : Object.entries(choices).some(isEdgeEqualToOption)
  })

  return variant ?? product.variants.edges?.[0]
}
