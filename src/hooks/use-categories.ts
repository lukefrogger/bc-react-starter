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
    },
  ]
}
