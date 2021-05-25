/**
 * @module API Config
 *
 * @description default config settings for SuperAgent requests.
 */

// API Url for the node proxy
const apiBase = process.env.REACT_APP_API_ENDPOINT
const cartBase = process.env.REACT_APP_CART_ENDPOINT

const apiHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
}

export { apiBase, cartBase, apiHeaders }
