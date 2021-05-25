/**
 * @module BigCommerce API Requests
 */

import first from 'lodash/first'

import { apiBase, apiHeaders, cartBase } from './config'

const buildUrl = (url: string, data?: any) => {
  const query = new URLSearchParams(data)
  return `${apiBase}${url}?${query.toString()}`
}

const request = async (url: string, data?: any) => {
  const response = await fetch(buildUrl(url, data), {
    method: 'GET',
    headers: apiHeaders,
  })
  return response.json()
}

export const getProduct = async (data = {}) =>
  request(`/v3/catalog/products`, data)
    .then((res): object => res.data[0] || {})
    .then((res): object => res)
    .catch((err) => console.error(err))

export const getProducts = async (data = {}) =>
  request(`/v3/catalog/products`, data)
    .then((res): object => {
      return res.data || {}
    })
    .then((res): object => res)
    .catch((err) => console.error(err))

export const getBrandName = async (data = {}) =>
  request(`/v3/catalog/brands`, data)
    .then((res): object => res.data[0] || {})
    .then((res): any => res)
    .catch((err) => console.error(err))

export const getStorefront = async () =>
  request(`/v2/store`)
    .then((res): object => res)
    .catch((err) => console.error(err))

export const getProductImages = async (productID = {}, firstOnly = true) =>
  request(`/v3/catalog/products/${productID}/images`)
    .then((res): object => (firstOnly && res.data ? res.data[0] : res.data))
    .then((res): any => res)
    .catch((err) => console.error(err))

export const getCategory = async (categoryId = {}) =>
  request(`/v3/catalog/categories/${categoryId}`)
    .then((res): object => res.data || {})
    .then((res): any => res)
    .catch((err) => console.error(err))

export const getCustomFields = async (data: any = {}) =>
  request(`/v3/catalog/products/${data.id}/custom-fields`)
    .then((res): object => res.data || {})
    .then((res): object => res)
    .catch((err) => console.error(err))

export const getProductModifiers = async (data: any = {}) =>
  request(`/v3/catalog/products/${data.id}/modifiers`)
    .then((res): object => {
      return res.data || {}
    })
    .catch((err) => console.error(err))

export const getProductOptions = async (data: any = {}) =>
  request(`/v3/catalog/products/${data.id}/options`)
    .then((res): object => {
      return res.data || {}
    })
    .catch((err) => console.error(err))

export const getProductReviews = async (data: any = {}) =>
  request(`/v3/catalog/products/${data.id}/reviews`)
    .then((res): object => {
      return res.data || {}
    })
    .catch((err) => console.error(err))

export const postProductReview = async (productId: number, data = {}) => {
  const response = await fetch(
    buildUrl(`/v3/catalog/products/${productId}/reviews`),
    {
      method: 'POST',
      headers: apiHeaders,
      body: JSON.stringify(data),
    }
  )
  return response
    .json()
    .then((res): object => {
      return res.data || {}
    })
    .catch((err) => console.error(err))
}

export const postCart = async (cartId: string, item?: any) => {
  const body = { item }
  const response = await fetch(`${cartBase}/${cartId}`, {
    method: 'POST',
    headers: apiHeaders,
    body: JSON.stringify(body),
  })
  return response
    .json()
    .then((res): object => {
      return res.data || {}
    })
    .catch((err) => console.error(err))
}

export const getCart = async (cartId: string) => {
  const response = await fetch(`${cartBase}/${cartId}`)
  const json = await response.json()
  return json.data
}

export const getProfile = async (data: any) =>
  request(`/v3/customers`, data)
    .then((res): object => {
      return first(res.data || []) || {}
    })
    .catch((err) => console.error(err))

export const getShippingAddress = async (data: any) =>
  request(`/v3/customers/addresses`, data)
    .then((res): object => {
      return res.data || []
    })
    .catch((err) => console.error(err))

export const getWishlists = async (data: any) =>
  request(`/v3/wishlists`, data)
    .then((res): object => {
      return res.data || []
    })
    .catch((err) => console.error(err))

export const getWishlist = async (id: string) =>
  request(`/v3/wishlists/${id}`)
    .then((res): object => res.data || [])
    .catch((err) => console.error(err))

export const postWishlist = async (data: any) => {
  const response = await fetch(`${apiBase}/v3/wishlists`, {
    method: 'POST',
    headers: apiHeaders,
    body: JSON.stringify(data),
  })

  return response
    .json()
    .then((res): object => {
      debugger
      return res.data || []
    })
    .catch((err) => console.error(err))
}

export const getOrder = async (orderId: string) =>
  request(`/v2/orders/${orderId}`)
    .then((res): object => res || [])
    .catch((err) => {
      console.error(err)
    })

export const getOrders = async (data: any) =>
  request(`/v2/orders/`, data)
    .then((res): object => res || [])
    .catch((err) => {
      console.error(err)
    })

export const getOrderProducts = async (orderId: string) =>
  request(`/v2/orders/${orderId}/products`)
    .then((res): object => res || [])
    .catch((err) => {
      console.error(err)
    })

export const searchProducts = async (searchTerm: string) =>
  request(`/v3/catalog/products`, {
    keyword: searchTerm,
    keyword_context: 'shopper',
    include: 'primary_image',
    include_fields: ['name', 'sku'],
  })
    .then((res): object => res || [])
    .catch((err) => {
      console.error(err)
    })
