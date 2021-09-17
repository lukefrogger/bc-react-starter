export const getProductReviewsQuery = /* GraphQL */ `
  query getProductReviews($path: String!) {
    site {
      route(path: $path) {
        node {
          __typename
          ... on Product {
            reviews {
              edges {
                node {
                  author {
                    name
                  }
                  title
                  text
                  rating
                  createdAt {
                    utc
                  }
                  entityId
                }
                cursor
              }
              pageInfo {
                startCursor
                endCursor
                hasNextPage
                hasPreviousPage
              }
            }
          }
        }
      }
    }
  }
`
export const getProductReviews = async ({ res, req, config }) => {
  const { productSlug: slug } = req.params || {}
  const { data } = await config.fetch(getProductReviewsQuery, {
    variables: {
      path: `/${slug}/`,
    },
  })
  const { reviews } = data.site.route.node
  return res.status(200).json(reviews)
}
