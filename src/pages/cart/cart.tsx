import * as React from 'react'

import useCart from '@bigcommerce/storefront-data-hooks/cart/use-cart'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Pricing, Typography } from 'unsafe-bc-react-components'

import { Breadcrumbs } from '@components'
import { PackageIcon, ReturnsIcon, SecureIcon, ShippingIcon } from '@icons'

import { CartItem } from './cart__item'
import * as styles from './styles'

export function CartPage(): React.ReactElement {
  const { data: cart } = useCart()
  const { t } = useTranslation()
  const physicalProducts = cart?.line_items?.physical_items ?? []
  const digitalProducts = cart?.line_items?.digital_items ?? []
  const lineItems = physicalProducts?.concat(digitalProducts).sort((a, b) => {
    return a.product_id - b.product_id
  })

  return (
    <div css={styles.Container}>
      <Breadcrumbs>
        <Breadcrumbs.Item to="/">
          {t('breadcrumbs.home', 'Home')}
        </Breadcrumbs.Item>
        <Breadcrumbs.Item>{t('breadcrumbs.cart', 'Cart')}</Breadcrumbs.Item>
      </Breadcrumbs>
      <Typography as="h1" variant="display-xx-small" css={styles.Title}>
        {t('cart.your_order', 'Your order')}
      </Typography>
      <div css={styles.Grid}>
        <div css={styles.ProductList}>
          {cart === null && (
            <p>
              {t(
                'cart.empty',
                'There are no items in your basket. Please return '
              )}
              <Link to="/">{t('cart.empty_home', 'Home')}</Link>
            </p>
          )}
          {lineItems.map((product) => (
            <CartItem
              {...product}
              options={[]} // TODO: Show selected variants
              key={product.id}
              image={{
                src: product.image_url,
              }}
              name={product.name ?? ''}
              prices={{
                price: product.list_price || 0,
                salePrice: 0,
                currencySettings: { currency: cart?.currency.code },
              }}
              quantity={{
                defaultQuantity: product.quantity ?? 0,
              }}
            />
          ))}
        </div>
        <div>
          <Pricing
            items={[
              {
                label: t('cart.subtotal', 'Subtotal'),
                price: {
                  price: cart?.base_amount || 0,
                  salePrice: 0,
                  currencySettings: {},
                },
              },
              {
                label: t('cart.taxes', 'Taxes'),
                value: t('cart.calculated_at', 'Calculated at checkout'),
              },
            ]}
            total={{
              label: t('cart.total', 'Total'),
              price: {
                price: cart?.base_amount || 0,
                salePrice: 0,
                currencySettings: {},
              },
            }}
          />
          <a css={styles.Checkout} href="/checkout">
            {t('cart.proceed', 'Proceed')}
          </a>
        </div>
      </div>
      <div css={styles.Features}>
        <div css={styles.Feature}>
          <SecureIcon />
          <Typography as="span" variant="overline">
            {t('features.secure', 'Secure')}
          </Typography>
        </div>
        <div css={styles.Feature}>
          <ShippingIcon />
          <Typography as="span" variant="overline">
            {t('features.fast', 'Fast')}
          </Typography>
        </div>
        <div css={styles.Feature}>
          <ReturnsIcon />
          <Typography as="span" variant="overline">
            {t('features.easy', 'Easy')}
          </Typography>
        </div>
        <div css={styles.Feature}>
          <PackageIcon />
          <Typography as="span" variant="overline">
            {t('features.safe', 'Safe')}
          </Typography>
        </div>
      </div>
    </div>
  )
}
