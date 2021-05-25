/**
 * @module Global Storefront configuration and settings.
 */

declare global {
  interface Window {
    bigcommerce_storefront: any
  }
}

export const BCStorefront = (data: any = {}) => {
  return (window.bigcommerce_storefront = data.body || {})
}
