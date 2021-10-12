import { ProductInfoFragment } from '@bigcommerce/storefront-data-hooks/schema'

type ReviewSummary = ProductInfoFragment['reviewSummary']

type UseReviewSummary = ReviewSummary & { averageOfRatings: number }

export function useReviewSummary(
  reviewSummary?: ReviewSummary
): UseReviewSummary | undefined {
  if (reviewSummary === undefined) return reviewSummary
  const averageOfRatings =
    reviewSummary.summationOfRatings / reviewSummary.numberOfReviews
  return {
    ...reviewSummary,
    averageOfRatings,
  }
}
