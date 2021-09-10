export type OrderStatusColorType = {
  'Awaiting Payment': string
  'Awaiting Fulfillment': string
  'Awaiting Shipment': string
  'Awaiting Pickup': string
  Cancelled: string
  Completed: string
  Disputed: string
  Declined: string
  Info: string
  'Manual Verification Required': string
  Shipped: string
  'Partially Shipped': string
  'Partially Refunded': string
  Pending: string
  Refunded: string
}

export const orderStatusColor: OrderStatusColorType = {
  'Awaiting Payment': 'warning',
  'Awaiting Fulfillment': 'attention',
  'Awaiting Shipment': 'attention',
  'Awaiting Pickup': 'attention',
  Cancelled: 'danger',
  Completed: 'success',
  Disputed: 'warning',
  Declined: 'danger',
  Info: 'info',
  'Manual Verification Required': 'warning',
  Shipped: 'success',
  'Partially Shipped': 'info',
  Pending: 'info',
  'Partially Refunded': 'info',
  Refunded: 'warning',
}
