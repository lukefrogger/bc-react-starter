import { CommerceError } from '@bigcommerce/storefront-data-hooks/commerce/utils/errors'
import { HookFetcher } from '@bigcommerce/storefront-data-hooks/commerce/utils/types'
import useData from '@bigcommerce/storefront-data-hooks/commerce/utils/use-data'
import { Wishlist as StorefrontWishlist } from '@bigcommerce/storefront-data-hooks/wishlist/use-wishlist'
import { SWRResponse } from 'swr'

const defaultOpts = {
  url: '/api/bigcommerce/wishlist',
  method: 'GET',
}

type UseWishlistInput = {
  wishlistId: number
  customerId: number
  includeProducts: boolean
}

export type Wishlist = StorefrontWishlist & {
  is_guest?: boolean
}

const fetcher: HookFetcher<Wishlist | null, UseWishlistInput> = (
  options,
  { wishlistId, includeProducts },
  fetch
) => {
  // Use a dummy base as we only care about the relative path
  const url = new URL(options?.url ?? defaultOpts.url, 'http://a')
  if (includeProducts) url.searchParams.set('products', '1')

  return fetch({
    ...defaultOpts,
    ...options,
    url: `${(options?.base || '') + url.pathname}/${wishlistId}${url.search}`,
  })
}

export const useWishlist = (
  wishlistId: number,
  includeProducts = true
): SWRResponse<Wishlist | null, CommerceError> => {
  const response = useData(
    {},
    [
      ['includeProducts', includeProducts],
      ['wishlistId', wishlistId],
    ],
    fetcher,
    {
      revalidateOnFocus: false,
    }
  )
  return response as any
}
