type Category = {
  label: string
  slug: string
}

export function useCategories(): Category[] {
  // TODO: Get categories from API
  return [
    {
      label: 'Clothing',
      slug: 'clothing',
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
