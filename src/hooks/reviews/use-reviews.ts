import type {
  Author,
  DateTimeExtended,
  Maybe,
  PageInfo,
  Review as DefaultReview,
  ReviewEdge,
} from '@bigcommerce/storefront-data-hooks/schema'
import axios from 'axios'
import useSWR, { SWRResponse } from 'swr'

export type Review = { __typename?: 'Review' } & Pick<
  DefaultReview,
  'title' | 'text' | 'rating' | 'entityId'
> & {
    author: { __typename?: 'Author' } & Pick<Author, 'name'>
    createdAt: { __typename?: 'DateTimeExtended' } & Pick<
      DateTimeExtended,
      'utc'
    >
  }

type Reviews = { __typename?: 'ReviewConnection' } & {
  edges?: Maybe<
    Array<
      Maybe<
        { __typename?: 'ReviewEdge' } & Pick<ReviewEdge, 'cursor'> & {
            node: Review
          }
      >
    >
  >
  pageInfo: { __typename?: 'PageInfo' } & Pick<
    PageInfo,
    'startCursor' | 'endCursor' | 'hasNextPage' | 'hasPreviousPage'
  >
}

const fetcher = async (_: string, slug: string): Promise<any> => {
  const { data } = await axios(
    `${process.env.REACT_APP_API_ENDPOINT}/api/bigcommerce/product/${slug}/reviews`
  )
  return data
}

export function useReviews(productPath: string): SWRResponse<Reviews, Error> {
  return useSWR(['product-reviews', productPath], fetcher)
}
