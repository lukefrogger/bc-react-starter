export type OrderStatuses =
  | 'Awaiting Payment'
  | 'Awaiting Fulfillment'
  | 'Awaiting Shipment'
  | 'Awaiting Pickup'
  | 'Cancelled'
  | 'Completed'
  | 'Disputed'
  | 'Declined'
  | 'Info'
  | 'Manual Verification Required'
  | 'Shipped'
  | 'Partially Shipped'
  | 'Partially Refunded'
  | 'Pending'
  | 'Refunded'

export type OrderStatusColor =
  | 'warning'
  | 'attention'
  | 'success'
  | 'danger'
  | 'info'

export const orderStatusColor: Record<OrderStatuses, OrderStatusColor> = {
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

export function getStatusColor(
  status?: string | OrderStatuses
): OrderStatusColor {
  if (!status) {
    return 'info'
  }
  if (!(status in orderStatusColor)) {
    return 'info'
  }
  return orderStatusColor[status as OrderStatuses]
}
