import { CommerceError } from '@bigcommerce/storefront-data-hooks/commerce/utils/errors'
import { HookFetcher } from '@bigcommerce/storefront-data-hooks/commerce/utils/types'
import useData from '@bigcommerce/storefront-data-hooks/commerce/utils/use-data'
import useCustomer from '@bigcommerce/storefront-data-hooks/use-customer'
import {
  UseWishlistInput,
  Wishlist,
} from '@bigcommerce/storefront-data-hooks/wishlist/use-wishlist'
import { SWRResponse } from 'swr'

const defaultOpts = {
  url: '/api/bigcommerce/wishlist',
  method: 'GET',
}

const fetcher: HookFetcher<Wishlist[] | null, UseWishlistInput> = (
  options,
  { customerId },
  fetch
) => {
  if (!customerId) return null

  // Use a dummy base as we only care about the relative path
  const url = new URL(options?.url ?? defaultOpts.url, 'http://a')

  return fetch({
    ...defaultOpts,
    ...options,
    url: (options?.base || '') + url.pathname + url.search,
  })
}

export const useWishlists = (): SWRResponse<
  Wishlist[] | null,
  CommerceError
> => {
  const { data: customer } = useCustomer()
  const response = useData(
    {},
    [
      ['customerId', customer?.entityId],
      ['includeProducts', false],
    ],
    fetcher,
    {
      revalidateOnFocus: false,
    }
  )
  return response as any
}
