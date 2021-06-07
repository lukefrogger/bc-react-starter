import useBigCommerceSearch, {
  fetcher,
} from '@bigcommerce/storefront-data-hooks/products/use-search'

export const useSearch = useBigCommerceSearch.extend((options, ...rest) =>
  fetcher(
    {
      ...options,
      url: 'api/bigcommerce/catalog/products',
      base: process.env.REACT_APP_API_ENDPOINT,
    },
    ...rest
  )
)
