import { useCallback } from 'react'

import { CommerceError } from '@bigcommerce/storefront-data-hooks/commerce/utils/errors'
import { HookFetcher } from '@bigcommerce/storefront-data-hooks/commerce/utils/types'
import useAction from '@bigcommerce/storefront-data-hooks/commerce/utils/use-action'
import useCustomer, {
  Customer,
} from '@bigcommerce/storefront-data-hooks/use-customer'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

import { useLogin } from '@hooks/use-login'

const defaultOpts = {
  url: '/api/bigcommerce/update-customer',
  method: 'PUT',
}

type AuthenticationType = {
  new_password: string
  password: string
}

export type UpdateCustomerInput = {
  id: number
  email: string
  first_name: string
  last_name: string
  phone?: string
  company?: string
  authentication?: AuthenticationType
}

const fetcher: HookFetcher<Customer, UpdateCustomerInput> = (
  options,
  customer,
  fetch
) => {
  // TODO: add validations before doing the fetch
  // Use a dummy base as we only care about the relative path
  const url = new URL(options?.url ?? defaultOpts.url, 'http://a')
  return fetch({
    ...defaultOpts,
    ...options,
    headers: {
      'Content-Type': 'application/json',
    },
    url: `${(options?.base || '') + url.pathname}`,
    body: [customer],
  } as any)
}

export const useUpdateCustomer = (): ((
  input: UpdateCustomerInput
) => Promise<Customer>) => {
  const { data: customer } = useCustomer()
  const { t } = useTranslation()
  const fn = useAction(defaultOpts, fetcher)
  const login = useLogin()

  return useCallback(
    async function updateCustomer(input: UpdateCustomerInput) {
      if (!customer) {
        // A signed customer is required in order to have a wishlist
        throw new CommerceError({
          message: 'Signed customer not found',
        })
      }

      try {
        if (input.authentication) {
          await login({
            email: customer.email,
            password: input.authentication?.password || '',
          })
        }
        const data = await fn(input)
        toast.success(t('bc.profile.updated', 'Profile updated'), {
          position: 'bottom-right',
        })

        return data
      } catch {
        toast.error(t('bc.profile.update_error', 'Error updating profile'), {
          position: 'bottom-right',
        })
        return Promise.resolve(customer)
      }
    },
    [fn, customer]
  )
}
