declare global {
  interface Window {
    gtag: any
  }
}

export type GaItem = {
  affiliation?: string
  coupon?: string
  currency?: string
  discount?: number
  index?: number
  item_brand?: string
  item_category?: string
  item_category2?: string
  item_category3?: string
  item_category4?: string
  item_category5?: string
  item_id: string | number
  item_list_id?: string | number
  item_list_name?: string
  item_name?: string
  item_variant?: string | number
  location_id?: string
  price?: string | number
  quantity?: number
}

export function beginCheckoutEvent(
  currency: string,
  value: number,
  items: GaItem[]
): void {
  sendEvent('begin_checkout', {
    currency,
    value,
    items,
  })
}

export function addToCartEvent(
  currency: string,
  value: number,
  items: GaItem[]
): void {
  sendEvent('add_to_cart', {
    currency,
    value,
    items,
  })
}

export function pageViewEvent(): void {
  sendEvent('page_view', {
    page_title: document.title,
    page_location: window.location.href,
    page_path: window.location.pathname + window.location.search,
  })
}

export function removeFromCartEvent(
  currency: string,
  value: number,
  items: GaItem[]
): void {
  sendEvent('remove_from_cart', {
    currency,
    value,
    items,
  })
}

export function searchEvent(search_term: string): void {
  sendEvent('search', {
    search_term,
  })
}

export function sendEvent(eventName: string, eventParams?: unknown): void {
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, eventParams)
  }
}
