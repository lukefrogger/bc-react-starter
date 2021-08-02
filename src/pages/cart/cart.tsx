import * as React from 'react'

import useCart from '@bigcommerce/storefront-data-hooks/cart/use-cart'
import useRemoveItem from '@bigcommerce/storefront-data-hooks/cart/use-remove-item'
import useUpdateItem from '@bigcommerce/storefront-data-hooks/cart/use-update-item'
import { css } from '@emotion/react'
import {
  Button,
  Pricing,
  ProductRow,
  ProductRowProps,
  Typography,
} from 'unsafe-bc-react-components'

import storeMock from '../../__mocks__/data/store_config.json'
import * as styles from './styles'

type CartItemProps = ProductRowProps & {
  product_id: number
  variant_id?: number
}
function CartItem(product: CartItemProps): React.ReactElement {
  const updateItem = useUpdateItem({
    product_id: product.product_id,
    variant_id: product.variant_id || 0,
    id: product.id || '',
    quantity: product.quantity.quantity || 1,
  })

  const removeItem = useRemoveItem()

  return (
    <ProductRow
      {...product}
      quantity={{
        ...product.quantity,
        onChangeQuantity: (newQuantity) => {
          if (newQuantity < 1) {
            removeItem({
              id: product.id || '',
            })
          } else {
            updateItem({
              quantity: newQuantity,
            })
          }
        },
      }}
      onDelete={() =>
        removeItem({
          id: product.id || '',
        })
      }
    />
  )
}

export function CartPage(): React.ReactElement {
  const { data: cart } = useCart()

  return (
    <div css={styles.Container}>
      {
        // TODO: Add Breadcrumbs
      }
      <Typography
        variant="body-small"
        css={css`
          padding-top: 32px;
        `}
      >
        Home / Cart
      </Typography>
      <Typography
        as="h1"
        variant="display-xx-small"
        css={css`
          padding: 32px 0 24px;
        `}
      >
        YOUR ORDER
      </Typography>
      <div css={styles.Grid}>
        <div css={styles.ProductList}>
          {cart?.line_items?.physical_items.map((product) => (
            <CartItem
              // TODO: Show selected variants
              {...product}
              key={product.id}
              image={{
                src: product.image_url,
              }}
              name={product.name ?? ''}
              prices={{
                price: product.list_price || 0,
                salePrice: 0,
                currencySettings: { currency: storeMock.currency },
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
                label: 'Subtotal',
                price: {
                  price: cart?.cart_amount || 0,
                  salePrice: 0,
                  currencySettings: {},
                },
              },
              /*               {
                label: 'Taxes', // TODO: Show "Calculated at checkout"
                price: {
                  price: 11,
                  salePrice: 0,
                  currencySettings: {},
                },
              }, */
            ]}
            total={{
              label: 'Total',
              price: {
                price: cart?.cart_amount || 0,
                salePrice: 0,
                currencySettings: {},
              },
            }}
          />
          <Button style={{ width: '100%', marginTop: 48 }}>
            Proceed to checkout
          </Button>
        </div>
      </div>
      <div css={styles.Features}>
        <div css={styles.Feature}>
          <svg width={38} height={45} viewBox="0 0 38 45" fill="none">
            <path
              d="M27 22H11v10h16V22zM15 22v-6a4.012 4.012 0 014-4v0a4.012 4.012 0 014 4v6"
              stroke="#191919"
              strokeWidth={2}
              strokeMiterlimit={10}
              strokeLinecap="square"
            />
            <path
              d="M37 26a18 18 0 11-36 0V6l18-4 18 4v20z"
              stroke="#191919"
              strokeWidth={2}
              strokeMiterlimit={10}
              strokeLinecap="square"
            />
          </svg>
          <Typography as="span" variant="overline">
            100% secure
          </Typography>
        </div>
        <div css={styles.Feature}>
          <svg width={47} height={35} viewBox="0 0 47 35" fill="none">
            <path
              d="M37.5 27.5h8v-12l-6-2-4-12h-18v26h8"
              stroke="#191919"
              strokeWidth={2}
              strokeMiterlimit={10}
            />
            <path
              d="M31.5 33.5a6 6 0 100-12 6 6 0 000 12zM25.5 7.5v6h6M11.5 1.5h-10M11.5 9.5h-6M11.5 17.5h-2"
              stroke="#191919"
              strokeWidth={2}
              strokeMiterlimit={10}
              strokeLinecap="square"
            />
          </svg>
          <Typography as="span" variant="overline">
            Fast shipping
          </Typography>
        </div>
        <div css={styles.Feature}>
          <svg width={40} height={38} viewBox="0 0 40 38" fill="none">
            <path
              d="M37.815 25.982H13.49A12.49 12.49 0 0113.49 1h12.49"
              stroke="#191919"
              strokeWidth={2}
              strokeMiterlimit={10}
            />
            <path
              d="M27.296 15.463l10.519 10.519L27.296 36.5"
              stroke="#191919"
              strokeWidth={2}
              strokeMiterlimit={10}
              strokeLinecap="square"
            />
          </svg>
          <Typography as="span" variant="overline">
            Easy returns
          </Typography>
        </div>
        <div css={styles.Feature}>
          <svg width={37} height={37} viewBox="0 0 37 37" fill="none">
            <path
              d="M1 8.954h35"
              stroke="#191919"
              strokeWidth={2}
              strokeMiterlimit={10}
            />
            <path
              d="M36 8.955L26.454 1H10.545L1 8.955V36h35V8.955z"
              stroke="#191919"
              strokeWidth={2}
              strokeMiterlimit={10}
              strokeLinecap="square"
            />
            <path
              d="M23.271 20.09h-9.545V8.956L16.908 1h3.182l3.181 7.955V20.09z"
              stroke="#191919"
              strokeWidth={2}
              strokeMiterlimit={10}
              strokeLinecap="square"
            />
          </svg>
          <Typography as="span" variant="overline">
            Safely packaged
          </Typography>
        </div>
      </div>
    </div>
  )
}
