import { GetSiteInfoResult } from '@bigcommerce/storefront-data-hooks/api/operations/get-site-info'
import axios from 'axios'
import useSWR, { SWRResponse } from 'swr'

import { REACT_APP_API_ENDPOINT } from '@config/constants'
import { getEnvVariable } from '@utils/get-env-variable'

const fetcher = async (): Promise<any> => {
  const { data } = await axios(
    `${getEnvVariable(REACT_APP_API_ENDPOINT)}/api/site-info`
  )
  return data
}

export function useSiteInfo(): SWRResponse<GetSiteInfoResult, Error> {
  return useSWR('site-info', fetcher, { revalidateOnFocus: false })
}
