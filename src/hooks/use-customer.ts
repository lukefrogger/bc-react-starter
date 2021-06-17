import useBigCommerceCustomer, {
  fetcher,
} from '@bigcommerce/storefront-data-hooks/use-customer'

export const useCustomer = useBigCommerceCustomer.extend((options, ...rest) =>
  fetcher(
    {
      ...options,
      url: '/customer',
      base: process.env.REACT_APP_API_ENDPOINT,
    },
    ...rest
  )
)
