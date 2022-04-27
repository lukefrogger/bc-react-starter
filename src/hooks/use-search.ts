import useBigCommerceSearch, {
  fetcher,
} from '@bigcommerce/storefront-data-hooks/products/use-search'

import { REACT_APP_API_ENDPOINT } from '@config/constants'

export const useSearch = useBigCommerceSearch.extend((options, ...rest) =>
  fetcher(
    {
      ...options,
      url: 'api/bigcommerce/catalog/products',
      base: REACT_APP_API_ENDPOINT,
    },
    ...rest
  )
)
