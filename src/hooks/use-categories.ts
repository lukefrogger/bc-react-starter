import axios from 'axios'
import useSWR, { SWRResponse } from 'swr'

const fetcher = async (): Promise<any> => {
  const { data } = await axios(
    `${process.env.REACT_APP_API_ENDPOINT}/categories`
  )
  return data
}

export type Category = {
  label: string
  slug: string
  color?: string
  categories?: Category[]
  id: number
  image?: {
    urlOriginal?: string
    altText?: string
    isDefault?: boolean
  }
}

type CategoryData = {
  name: string
  path: string
  entityId: number
  description: string
  productCount: number
  image?: {
    urlOriginal?: string
    altText?: string
    isDefault?: boolean
  }
  children: CategoryData[]
}

function mapCategory(category: CategoryData): Category {
  return {
    label: category.name,
    slug: category.path,
    id: category.entityId,
    image: category.image,
    categories:
      !category?.children || category.children?.length === 0
        ? undefined
        : category.children.map(mapCategory),
  }
}

export function useCategories(): SWRResponse<Category[], Error> {
  const response = useSWR('categories', fetcher)
  return {
    ...response,
    data: response?.data?.site?.categoryTree.map(mapCategory),
  }
  /*
  return [
    {
      label: 'Clothing',
      slug: 'clothing',
      categories: [
        {
          label: 'Shirts',
          slug: 'shirts',
          categories: [
            {
              label: 'T-shirts',
              slug: 't-shirts',
            },
            {
              label: 'V necks',
              slug: 'v-necks',
            },
            {
              label: 'Triblends',
              slug: 'triblends',
            },
            {
              label: 'Sweatshirts',
              slug: 'sweatshirts',
            },
            {
              label: 'Performance tees',
              slug: 'performance-tees',
            },
            {
              label: 'Muscle tanks',
              slug: 'muscle-tanks',
            },
            {
              label: 'Longsleeves',
              slug: 'longsleeves',
            },
          ],
        },
        {
          label: 'Ponchos',
          slug: 'ponchos',
        },
        {
          label: 'Onesies',
          slug: 'onesies',
          categories: [
            {
              label: 'Muscle tanks',
              slug: 'muscle-tanks',
            },
            {
              label: 'Longsleeves',
              slug: 'longsleeves',
            },
          ],
        },
      ],
    },
    {
      label: 'Shoes',
      slug: 'shoes',
    },
    {
      label: 'Accessories',
      slug: 'accessories',
    },
    {
      label: 'Hot',
      slug: 'hot',
    },
    {
      label: 'Sale',
      slug: 'sale',
      color: '#DC004F',
    },
  ] */
}
