import * as React from 'react'

import useOrderProducts from '@bigcommerce/storefront-data-hooks/use-order-products'
import useOrders from '@bigcommerce/storefront-data-hooks/use-orders'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { Orders, Typography } from 'unsafe-bc-react-components'
import { Order } from 'unsafe-bc-react-components/dist/components/core/orders/types'

import { OrderLoading } from '@components'

import { getStatusColor } from '../../utils/get-status-color'
import * as styles from './styles'

const OrderRow = (props: any): React.ReactElement => {
  const { data: products } = useOrderProducts({ orderId: props.order?.id })
  return <Orders.OrderRow {...props} products={products} />
}

const SortOrders = (a: any, b: any): number => {
  return b.id - a.id
}

export function OrdersPage(): React.ReactElement {
  const { data: orders, error } = useOrders()
  const { t } = useTranslation()
  const history = useHistory()
  const isLoading = typeof orders === 'undefined' && !error
  const orderHistory = Array.isArray(orders) ? orders : []

  orders?.sort(SortOrders)

  const handleOrderAction = (action: string, order: Order): void => {
    switch (action) {
      case 'details':
        history.push(`/user/orders/${order.id}`)
        break
      default:
    }
  }

  if (isLoading)
    return (
      <div css={styles.Container}>
        <Typography css={styles.Title} variant="display-large">
          {t('orders.title', 'Order history')}
        </Typography>
        {[...Array(3)].map((loading) => (
          <OrderLoading key={loading} />
        ))}
      </div>
    )

  return (
    <div css={styles.Container}>
      <Typography css={styles.Title} variant="display-large">
        {t('orders.title', 'Order history')}
      </Typography>

      {Array.isArray(orderHistory) && orderHistory.length === 0 && (
        <p css={styles.NoOrders}>{t('orders.none', 'No orders')}</p>
      )}

      {orders?.map((order) => (
        <OrderRow
          key={order.id}
          order={order}
          statusVariant={getStatusColor(order.status)}
          onOrderAction={handleOrderAction}
        />
      ))}
      {/*
        TODO: Show Pagination
        Note: right now isn't possible because we're using API Orders V2,
        which does not return pagination meta data.

      <div css={styles.Pagination}>
        <Pagination />
      </div> */}
    </div>
  )
}
