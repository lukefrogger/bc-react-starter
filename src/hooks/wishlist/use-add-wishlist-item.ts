import { useCallback } from 'react'

import type { ItemBody } from '@bigcommerce/storefront-data-hooks/api/wishlist'
import { CommerceError } from '@bigcommerce/storefront-data-hooks/commerce/utils/errors'
import { HookFetcher } from '@bigcommerce/storefront-data-hooks/commerce/utils/types'
import useAction from '@bigcommerce/storefront-data-hooks/commerce/utils/use-action'
import useCustomer from '@bigcommerce/storefront-data-hooks/use-customer'

import { useWishlists } from './use-wishlists'

const defaultOpts = {
  url: '/api/bigcommerce/wishlist',
  method: 'POST',
}

export type AddItemInput = ItemBody & {
  wishlistId: number
}

const fetcher: HookFetcher<null, AddItemInput> = (
  options,
  { productId, variantId, wishlistId },
  fetch
) => {
  // TODO: add validations before doing the fetch
  // Use a dummy base as we only care about the relative path
  const url = new URL(options?.url ?? defaultOpts.url, 'http://a')
  return fetch({
    ...defaultOpts,
    ...options,
    url: `${(options?.base || '') + url.pathname}/${wishlistId}/items`,
    body: { item: { productId, variantId } },
  })
}

export const useAddWishlistItem = (): ((
  input: AddItemInput
) => Promise<null>) => {
  const { data: customer } = useCustomer()
  const { revalidate } = useWishlists()
  const fn = useAction(defaultOpts, fetcher)

  return useCallback(
    async function addItem(input: AddItemInput) {
      if (!customer) {
        // A signed customer is required in order to have a wishlist
        throw new CommerceError({
          message: 'Signed customer not found',
        })
      }

      const data = await fn(input)
      await revalidate()
      return data
    },
    [fn, revalidate, customer]
  )
}
