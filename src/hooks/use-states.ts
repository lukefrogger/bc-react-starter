import axios from 'axios'
import useSWR, { SWRResponse } from 'swr'

import { getEnvVariable } from '@utils/get-env-variable'

export function useStates(countryCode?: string): SWRResponse<any, Error> {
  return useSWR(
    `${getEnvVariable(
      'REACT_APP_API_ENDPOINT'
    )}/api/countries/${countryCode}/states`,
    async (url): Promise<any> => {
      if (!countryCode) {
        return []
      }

      const { data } = await axios(url)
      return data
    }
  )
}
