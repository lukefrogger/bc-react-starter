export const REACT_APP_API_ENDPOINT =
  // Use the env variable if available or auto-set to default netlify functions url
  process.env.REACT_APP_API_ENDPOINT ||
  `${window.location.origin}/.netlify/functions/index`

export const REACT_APP_CART_ENDPOINT =
  process.env.REACT_APP_CART_ENDPOINT || `${window.location.origin}/cart`

export const REACT_APP_HOME_CATEGORIES_IDS =
  process.env.REACT_APP_HOME_CATEGORIES_IDS || ''
