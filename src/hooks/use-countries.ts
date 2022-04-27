import axios from 'axios'
import useSWR, { SWRResponse } from 'swr'

import { REACT_APP_API_ENDPOINT } from '@config/constants'

export function useCountries(): SWRResponse<any, Error> {
  return useSWR(
    `${REACT_APP_API_ENDPOINT}/api/countries`,
    async (url: string): Promise<any> => {
      const { data } = await axios(url)
      return data
    }
  )
}
