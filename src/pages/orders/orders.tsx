import * as React from 'react'

import useOrderProducts from '@bigcommerce/storefront-data-hooks/use-order-products'
import useOrders from '@bigcommerce/storefront-data-hooks/use-orders'
import { useHistory } from 'react-router-dom'
import { Orders, Pagination } from 'unsafe-bc-react-components'
import { Order } from 'unsafe-bc-react-components/dist/components/core/orders/types'

const OrderRow = (props: any): React.ReactElement => {
  const { data: products } = useOrderProducts({ orderId: props.order?.id })
  return <Orders.OrderRow {...props} products={products} styles={{}} />
}

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
        <OrderRow
          key={order.id}
          order={order}
          onOrderAction={handleOrderAction}
        />
      ))}

      <Pagination />
    </div>
  )
}
