import axios from 'axios'
import useSWR, { SWRResponse } from 'swr'

import { REACT_APP_API_ENDPOINT } from '@config/constants'

export function useStates(countryCode?: string): SWRResponse<any, Error> {
  return useSWR(
    `${REACT_APP_API_ENDPOINT}/api/countries/${countryCode}/states`,
    async (url): Promise<any> => {
      if (!countryCode) {
        return []
      }

      const { data } = await axios(url)
      return data
    }
  )
}
