import { GetSiteInfoResult } from '@bigcommerce/storefront-data-hooks/api/operations/get-site-info'
import { SWRResponse } from 'swr'

import { useSiteInfo } from '@hooks'

export type Category = GetSiteInfoResult['categories'][number]

export function useCategories(): Omit<
  SWRResponse<Category[], Error>,
  'mutate' | 'revalidate'
> {
  const { data, mutate, revalidate, ...siteInfo } = useSiteInfo()
  return {
    ...siteInfo,
    data: data?.categories,
  }
}
