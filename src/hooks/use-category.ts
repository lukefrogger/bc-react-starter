import { Category, useCategories } from './use-categories'

export function useCategory(categorySlug: string): Category | null {
  const { data } = useCategories()
  if (!data) return null
  return data.find((category) => category.slug === categorySlug) || null
}
