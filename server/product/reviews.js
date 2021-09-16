import * as handlers from './handlers'

export const productReviewsApi = async (req, res) => {
  try {
    if (req.method === 'GET') {
      return await handlers.getProductReviews({
        req,
        res,
      })
    }
  } catch (error) {
    console.error(error)

    const message = 'An unexpected error ocurred'

    return res.status(500).json({ data: null, errors: [{ message }] })
  }
  return res
    .status(404)
    .json({ data: null, errors: [{ message: 'Not found' }] })
}
