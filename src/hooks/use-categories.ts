export type Category = {
  label: string
  slug: string
  categories?: Category[]
}

export function useCategories(): Category[] {
  // TODO: Get categories from API
  return [
    {
      label: 'Clothing',
      slug: 'clothing',
      categories: [
        {
          label: 'Shirts',
          slug: 'shirts',
        },
        {
          label: 'Ponchos',
          slug: 'ponchos',
        },
        {
          label: 'Onesies',
          slug: 'onesies',
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
    },
  ]
}
