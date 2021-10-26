import type { ProductNode } from '@bigcommerce/storefront-data-hooks/api/operations/get-product'

export type Choices = Record<string, string | number | null | Date>

export type Variant = any

// TODO: Check isVariant property and displayName vs entityId
// Finds a variant in the product that matches the selected options
export function getCurrentVariant(
  product?: ProductNode,
  choices: Choices = {}
): Variant {
  if (!product) return null

  const variant = product.variants.edges?.find((edge) => {
    const { node } = edge ?? {}
    const numberOfDefinedOpts = Object.values(choices).filter(
      (value) => value !== null
    ).length
    const numberOfEdges = node?.productOptions?.edges?.length

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const isEdgeEqualToOption = ([key, value]: [
      string,
      string | number | null | Date
    ]) =>
      node?.productOptions.edges?.find((productOptionEdge) => {
        if (
          productOptionEdge?.node.__typename === 'MultipleChoiceOption' &&
          productOptionEdge.node.displayName.toLowerCase() === key
        ) {
          return productOptionEdge.node.values.edges?.find(
            (valueEdge) => valueEdge?.node.entityId === value
          )
        }
        return false
      })

    return numberOfDefinedOpts === numberOfEdges
      ? Object.entries(choices).every(isEdgeEqualToOption)
      : Object.entries(choices).some(isEdgeEqualToOption)
  })

  return variant ?? null
}
