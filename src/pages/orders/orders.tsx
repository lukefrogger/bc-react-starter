import * as React from 'react'

import useOrders from '@bigcommerce/storefront-data-hooks/use-orders'
import { useHistory } from 'react-router-dom'
import { Orders } from 'unsafe-bc-react-components'
import { Order } from 'unsafe-bc-react-components/dist/components/core/orders/types'

export function OrdersPage(): React.ReactElement {
  const { data: orders, error } = useOrders()
  const history = useHistory()

  const handleOrderAction = (action: string, order: Order): void => {
    switch (action) {
      case 'details':
        history.push(`/user/orders/${order.id}`)
        break
      default:
    }
  }

  if (!orders && !error) {
    return <p>Loading...</p>
  }

  return (
    <div>
      {orders?.map((order) => (
        <Orders.OrderRow
          key={order.id}
          order={order as any}
          styles={{}}
          onOrderAction={handleOrderAction}
          products={{ '1': undefined } as any}
        />
      ))}
    </div>
  )
}
