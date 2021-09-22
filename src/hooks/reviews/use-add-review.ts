import { useCallback } from 'react'

import { CommerceError } from '@bigcommerce/storefront-data-hooks/commerce/utils/errors'
import { HookFetcher } from '@bigcommerce/storefront-data-hooks/commerce/utils/types'
import useAction from '@bigcommerce/storefront-data-hooks/commerce/utils/use-action'
import useCustomer from '@bigcommerce/storefront-data-hooks/use-customer'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

import { useReviews } from './use-reviews'

const defaultOpts = {
  url: '/api/bigcommerce/product',
  method: 'POST',
}

export type AddReviewInput = {
  productId: number
  /**
   * The title for the product review.
   */
  title: string
  /**
   * The text for the product review.
   *
   */
  text?: string
  /**
   * The rating of the product review. Must be one of 0, 1, 2, 3, 4, 5.
   */
  rating: 0 | 1 | 2 | 3 | 4 | 5
  /**
   * The email of the reviewer. Must be a valid email, or an empty string.
   */
  email?: string
  /**
   * The name of the reviewer.
   */
  name?: string
}

const fetcher: HookFetcher<null, AddReviewInput> = (options, input, fetch) => {
  // Use a dummy base as we only care about the relative path
  const url = new URL(options?.url ?? defaultOpts.url, 'http://a')
  return fetch({
    ...defaultOpts,
    ...options,
    url: `${(options?.base || '') + url.pathname}/${input.productId}/reviews`,
    body: input,
  })
}

export const useAddReview = (
  productPath: string
): ((input: AddReviewInput) => Promise<void>) => {
  const { data: customer } = useCustomer()
  const { t } = useTranslation()

  const { revalidate } = useReviews(productPath)
  const fn = useAction(defaultOpts, fetcher)

  return useCallback(
    async function addItem(input: AddReviewInput) {
      try {
        if (!customer) {
          // A signed customer is required in order to create a comment
          throw new CommerceError({
            message: 'Signed customer not found',
          })
        }

        await fn(input)
        toast.success(
          t(
            'bc.review.saved',
            'Your review was saved and is pending approval.'
          ),
          {
            position: 'bottom-right',
          }
        )
        await revalidate()
      } catch (e) {
        toast.error(t('bc.review.error_adding', 'Error saving the review'), {
          position: 'bottom-right',
        })
      }
    },
    [fn, revalidate, customer]
  )
}
