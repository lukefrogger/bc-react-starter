import axios from 'axios'
import useSWR, { SWRResponse } from 'swr'

export function useCountries(): SWRResponse<any, Error> {
  return useSWR(`${process.env.REACT_APP_API_ENDPOINT}/api/countries`, axios)
}
