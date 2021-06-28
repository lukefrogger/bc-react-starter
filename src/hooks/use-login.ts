import useBigCommerceLogin, {
  fetcher,
} from '@bigcommerce/storefront-data-hooks/use-login'

export const useLogin = useBigCommerceLogin.extend((options, ...rest) =>
  fetcher(
    {
      ...options,
      url: '/login',
    },
    ...rest
  )
)
