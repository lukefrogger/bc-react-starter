import * as React from 'react'

import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { Orders } from 'unsafe-bc-react-components'

import { useOrder } from '@hooks/order'

export function OrderPage(): React.ReactElement {
  const { t } = useTranslation()
  const { slug }: { slug: string } = useParams()
  const { data: order, error } = useOrder(Number(slug))
  const isLoading = !order && !error

  if (!isLoading && !order) {
    return <span>{t('order.not_found', 'No order found')}</span>
  }

  return (
    <div>
      {isLoading && 'Loading...'}
      {!isLoading && order && <Orders.OrderDetail order={order} />}
    </div>
  )
}
