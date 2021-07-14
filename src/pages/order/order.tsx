import * as React from 'react'

import { Product } from '@bigcommerce/storefront-data-hooks/schema'
import useOrderProducts from '@bigcommerce/storefront-data-hooks/use-order-products'
import { useTranslation } from 'react-i18next'
import { Link, useHistory, useParams } from 'react-router-dom'
import {
  Button,
  Orders,
  ProductRow,
  Typography,
} from 'unsafe-bc-react-components'

import { Arrow } from '@components/header/icons'
import { useOrder } from '@hooks/order'

import storeMock from '../../__mocks__/data/store_config.json'
import * as styles from './styles'

export function OrderPage(): React.ReactElement {
  const { t } = useTranslation()
  const history = useHistory()
  const { slug }: { slug: string } = useParams()
  const { data: order, error: orderError } = useOrder(Number(slug))
  const { data: products, error: productsError } = useOrderProducts({
    orderId: Number(slug),
  })
  const isLoading = !order && !orderError
  const isProductsLoading = !products && !productsError

  const handleRedirectToProduct = (product: Product): void => {
    history.push(`/product/${product.id}`)
    window.scrollTo(0, 0)
  }

  const handleContactSupport = (): void => {
    window.open('mailto:support@bc.com')
  }

  if (!isLoading && !order) {
    return <span>{t('order.not_found', 'No order found')}</span>
  }

  return (
    <div css={styles.Container}>
      <div css={styles.Header}>
        <Typography css={styles.Title} variant="display-large">
          {t('order.title', 'Order')} #{slug}
        </Typography>
        <Link css={styles.Link} to="/user/orders">
          <Arrow orientation="left" />
          {t('order.back_to_list', 'Back to orders')}
        </Link>
      </div>
      <>
        <div css={styles.Grid}>
          <div css={styles.List}>
            {isProductsLoading ? (
              <div>Loading...</div>
            ) : (
              products?.map((product) => (
                <ProductRow
                  key={product.id}
                  image={{
                    src: 'https://cdn11.bigcommerce.com/s-wrur4yohpn/images/stencil/500w/products/77/266/foglinenbeigestripetowel1b.1626110985.jpg',
                  }}
                  onClick={() => handleRedirectToProduct(product as any)}
                  name={product.name ?? ''}
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
              ))
            )}
            <Button
              onClick={handleContactSupport}
              css={styles.Button}
              variant="tertiary"
            >
              {t('order.contact_support', 'Contact support')}
            </Button>
          </div>
          {isLoading ? (
            'Loading...'
          ) : (
            <Orders.OrderDetail css={styles.Detail} order={order as any} />
          )}
        </div>
      </>
    </div>
  )
}
