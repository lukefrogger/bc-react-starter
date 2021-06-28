import useBigCommerceAddresses, {
  fetcher,
} from '@bigcommerce/storefront-data-hooks/address/use-addresses'

export const useAddresses = useBigCommerceAddresses.extend((options, ...rest) =>
  fetcher(
    {
      ...options,
      url: '/addresses',
      base: process.env.REACT_APP_API_ENDPOINT, // TODO: remove
    },
    ...rest
  )
)
