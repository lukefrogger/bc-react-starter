import { SWRResponse } from 'swr'

import { Category, useCategories } from './use-categories'

export type UseCategoryBody = {
  categories?: string
  subCategories?: string
  subSubCategories?: string
}

export function useCategory(
  params: UseCategoryBody
): Omit<SWRResponse<Category, Error>, 'mutate' | 'revalidate'> {
  const { data, mutate, revalidate, ...categories } = useCategories()

  const slug = `/${params.categories}/${
    params.subCategories ? `${params.subCategories}/` : ''
  }${params.subSubCategories ? `${params.subSubCategories}/` : ''}`

  function reduceCategory(
    acc: Category | undefined,
    category: Category
  ): Category | undefined {
    if (acc) return acc
    if (category.slug === slug) return category
    if (category.categories)
      return category.categories.reduce(reduceCategory, undefined)
    return undefined
  }

  return {
    ...categories,
    data: data?.reduce(reduceCategory, undefined),
  }
}
