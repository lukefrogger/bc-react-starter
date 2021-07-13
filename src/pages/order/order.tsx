import * as React from 'react'

import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'
import { Orders, ProductRow, Typography } from 'unsafe-bc-react-components'

import { Arrow } from '@components/header/icons'
import { useOrder } from '@hooks/order'

import storeMock from '../../__mocks__/data/store_config.json'
import * as styles from './styles'

export function OrderPage(): React.ReactElement {
  const { t } = useTranslation()
  const { slug }: { slug: string } = useParams()
  const { data, error } = useOrder(Number(slug))
  const isLoading = !data?.order && !data?.products && !error

  if (!isLoading && !data?.order) {
    return <span>{t('order.not_found', 'No order found')}</span>
  }

  return (
    <div css={styles.Container}>
      {isLoading && 'Loading...'}
      {!isLoading && (
        <>
          <div css={styles.Header}>
            <Link css={styles.Link} to="/user/orders">
              <Arrow orientation="left" />
              {t('order.back_to_list', 'Back to orders')}
            </Link>
            <Typography css={styles.Title} variant="display-large">
              {t('order.title', 'Order')} #${data?.order.id}
            </Typography>
          </div>
          <div css={styles.Grid}>
            <div css={styles.List}>
              {data?.products?.map((product) => (
                <ProductRow
                  key={product.id}
                  image={
                    <img
                      src="https://cdn11.bigcommerce.com/s-wrur4yohpn/images/stencil/500w/products/77/266/foglinenbeigestripetowel1b.1626110985.jpg"
                      alt={product.defaultImage?.altText}
                    />
                  }
                  name={product.name}
                  prices={
                    {
                      price: (product as any).total_inc_tax,
                      salePrice: 0,
                      currencySettings: { currency: storeMock.currency },
                    } as any
                  }
                  quantity={{ quantity: (product as any).quantity ?? 5 }}
                  editable={false}
                />
              ))}
            </div>
            {data?.order && (
              <Orders.OrderDetail css={styles.Detail} order={data.order} />
            )}
          </div>
        </>
      )}
    </div>
  )
}
