import { Orders } from '@bigcommerce/storefront-data-hooks/api/orders'
import { CommerceError } from '@bigcommerce/storefront-data-hooks/commerce/utils/errors'
import { HookFetcher } from '@bigcommerce/storefront-data-hooks/commerce/utils/types'
import useData from '@bigcommerce/storefront-data-hooks/commerce/utils/use-data'
import useCustomer from '@bigcommerce/storefront-data-hooks/use-customer'
import { SWRResponse } from 'swr'

const defaultOpts = {
  url: '/api/bigcommerce/orders',
  method: 'GET',
}

type UseOrderOutput = Orders[0] | null

type UseOrderInput = {
  orderId: number
  customerId: number
}

const fetcher: HookFetcher<UseOrderOutput, UseOrderInput> = (
  options,
  { orderId, customerId },
  fetch
) => {
  if (!orderId || !customerId) return null

  // Use a dummy base as we only care about the relative path
  const url = new URL(options?.url ?? defaultOpts.url, 'http://a')

  return fetch({
    ...defaultOpts,
    ...options,
    url: `${(options?.base || '') + url.pathname}/${orderId}${url.search}`,
  }).then((res) => {
    return res
  })
}

export const useOrder = (
  orderId: number
): SWRResponse<UseOrderOutput, CommerceError> => {
  const { data: customer } = useCustomer()
  const response = useData(
    {},
    [
      ['customerId', customer?.entityId],
      ['orderId', orderId],
    ],
    fetcher,
    {
      revalidateOnFocus: false,
    }
  )
  return response as any
}
