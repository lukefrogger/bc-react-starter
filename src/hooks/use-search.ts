import useBigCommerceSearch, {
  fetcher,
} from '@bigcommerce/storefront-data-hooks/products/use-search'

import { REACT_APP_API_ENDPOINT } from '@config/constants'
import { getEnvVariable } from '@utils/get-env-variable'

export const useSearch = useBigCommerceSearch.extend((options, ...rest) =>
  fetcher(
    {
      ...options,
      url: 'api/bigcommerce/catalog/products',
      base: getEnvVariable(REACT_APP_API_ENDPOINT),
    },
    ...rest
  )
)
