import { ProductNode } from '@bigcommerce/storefront-data-hooks/api/operations/get-product'
import axios from 'axios'
import useSWR, { SWRResponse } from 'swr'

import { REACT_APP_API_ENDPOINT } from '@config/constants'

const fetcher = async (_: string, slug: string): Promise<any> => {
  const { data } = await axios(
    `${REACT_APP_API_ENDPOINT}/api/bigcommerce/product/${slug}`
  )
  return data
}

export function useProduct(
  productPath: string
): SWRResponse<ProductNode, Error> {
  return useSWR(['product', productPath], fetcher)
}
