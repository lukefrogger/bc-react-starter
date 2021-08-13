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
  const { data, ...categories } = useCategories()

  const slug = `/${params.categories}/${
    params.subCategories ? `${params.subCategories}/` : ''
  }${params.subSubCategories ? `${params.subSubCategories}/` : ''}`

  function reduceCategory(
    acc: Category | undefined,
    category: Category
  ): Category | undefined {
    if (acc) return acc
    if (category.path === slug) return category
    if (category.children)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return category.children.reduce(reduceCategory, undefined)
    return undefined
  }

  return {
    ...categories,
    data: data?.reduce(reduceCategory, undefined),
  }
}
