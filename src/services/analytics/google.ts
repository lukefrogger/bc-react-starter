declare global {
  interface Window {
    gtag: any
  }
}

export function sendPageView(): void {
  sendEvent('page_view', {
    page_title: document.title,
    page_location: window.location.href,
    page_path: window.location.pathname + window.location.search,
  })
}

export function sendEvent(eventName: string, eventParams?: unknown): void {
  window.gtag('event', eventName, eventParams)
}
