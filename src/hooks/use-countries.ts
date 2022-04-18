import axios from 'axios'
import useSWR, { SWRResponse } from 'swr'

import { getEnvVariable } from '@utils/get-env-variable'

export function useCountries(): SWRResponse<any, Error> {
  return useSWR(
    `${getEnvVariable('REACT_APP_API_ENDPOINT')}/api/countries`,
    async (url: string): Promise<any> => {
      const { data } = await axios(url)
      return data
    }
  )
}
