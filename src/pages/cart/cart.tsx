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

  return (
    <div css={styles.Container}>
      <Breadcrumbs>
        <Breadcrumbs.Item to="/">
          {t('breadcrumbs.home', 'Home')}
        </Breadcrumbs.Item>
        <Breadcrumbs.Item>{t('breadcrumbs.cart', 'Cart')}</Breadcrumbs.Item>
      </Breadcrumbs>
      <Typography as="h1" variant="display-xx-small" css={styles.Title}>
        {t('bc.cart.your_order', 'Your order')}
      </Typography>
      <div css={styles.Grid}>
        <div css={styles.ProductList}>
          {cart === null && (
            <p>
              {t(
                'cart.empty',
                'There are no items in your basket. Please return '
              )}
              <Link to="/">{t('cart.empty', 'Home')}</Link>
            </p>
          )}
          {cart?.line_items?.physical_items.map((product) => (
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
                currencySettings: { currency: cart.currency.code },
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
                label: t('bc.cart.subtotal', 'Subtotal'),
                price: {
                  price: cart?.cart_amount || 0,
                  salePrice: 0,
                  currencySettings: {},
                },
              },
              {
                label: t('bc.cart.taxes', 'Taxes'),
                value: t('bc.cart.calculated_at', 'Calculated at checkout'),
              },
            ]}
            total={{
              label: t('bc.cart.total', 'Total'),
              price: {
                price: cart?.cart_amount || 0,
                salePrice: 0,
                currencySettings: {},
              },
            }}
          />
          <a css={styles.Checkout} href="/checkout">
            {t('bc.cart.proceed', 'Proceed')}
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
