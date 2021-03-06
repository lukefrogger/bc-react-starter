import * as React from 'react'

import useOrderProducts, {
  Products,
} from '@bigcommerce/storefront-data-hooks/use-order-products'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  Button,
  OrderDetail,
  ProductRow,
  Typography,
} from 'unsafe-bc-react-components'

import { NoMatch404 } from '@components'
import { Arrow } from '@components/header/icons'
import { useOrder } from '@hooks/order'

import { getStatusColor } from '../../utils/get-status-color'
import * as styles from './styles'

export function OrderPage(): React.ReactElement {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { slug } = useParams<{ slug?: string }>()
  const { data: order, error: orderError } = useOrder(Number(slug))
  const { data: products, error: productsError } = useOrderProducts({
    orderId: Number(slug),
  })
  const isLoading = !order && !orderError
  const isProductsLoading = !products && !productsError

  const handleRedirectToProduct = (product: Products[0]): void => {
    navigate(`/product/${product.id}`)
    window.scrollTo(0, 0)
  }

  const handleContactSupport = (): void => {
    window.open('mailto:support@bc.com')
  }

  if (!isLoading && !order) {
    return <NoMatch404 />
  }

  return (
    <div css={styles.Container} id="content">
      <Helmet>
        <title>
          {t('order.title', 'Order')} #{slug}
        </title>
      </Helmet>
      <div css={styles.Header}>
        <Typography as="h1" css={styles.Title} variant="display-large">
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
              <div>{t('notices.loading', 'Loading...')}</div>
            ) : (
              products?.map((product) => (
                // TODO: Order from API missing some data: salePrice, product image
                <ProductRow
                  key={product.id}
                  onClick={() => handleRedirectToProduct(product)}
                  name={product.name ?? ''}
                  prices={{
                    price: Number(product.total_inc_tax) ?? 0,
                    salePrice: 0,
                    currencySettings: { currency: order?.currency_code },
                  }}
                  options={product.product_options ?? []}
                  quantity={{ quantity: product.quantity ?? 0 }}
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
            <div>{t('notices.loading', 'Loading...')}</div>
          ) : (
            order && (
              <OrderDetail
                css={styles.Detail}
                order={order as any}
                statusVariant={getStatusColor(order?.status)}
              />
            )
          )}
        </div>
      </>
    </div>
  )
}
