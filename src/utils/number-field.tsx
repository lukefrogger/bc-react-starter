/**
 * @function renderMinMax
 * @description Checks the potential settings from the NumberFieldOption and applies min/max attributes.
 * @param option object of field settings from GraphQL
 */
export function renderMinMax(option: {
  limitNumberBy: string
  lowest?: number | null
  highest?: number | null
}): Record<string, unknown> | null {
  switch (option.limitNumberBy.toLowerCase()) {
    case 'range':
      return {
        min: Number(option.lowest),
        max: Number(option.highest),
      }
    case 'lowest_value':
      return {
        min: Number(option.lowest),
      }
    case 'highest_value':
      return {
        max: Number(option.highest),
      }
    default:
      return {}
  }
}
