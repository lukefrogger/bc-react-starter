import * as React from 'react'

import { css } from '@emotion/react'
import { addToCartEvent } from '@services/analytics/google'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ProductCard, ProductCardProps } from 'unsafe-bc-react-components'

import { useAddCartItem, useQuickView } from '@hooks'
import { ProductModal } from '@pages/product-modal'

export type ProductCardWithButtonsProps = ProductCardProps & {
  productId: number
  variantId?: number
  path: string
}

export function ProductCardWithButtons(
  props: ProductCardWithButtonsProps
): React.ReactElement {
  const { productId, variantId, path, ...rest } = props
  const { t } = useTranslation()

  const quickView = useQuickView()

  const { addCartItem, isAdding } = useAddCartItem({
    productId,
    variantId,
  })

  return (
    <>
      <Link
        to={`/product${path}`}
        css={css`
          text-decoration: none;
        `}
      >
        <ProductCard
          {...rest}
          buttons={[
            {
              onClick: () =>
                addCartItem().then(() =>
                  addToCartEvent('USD', props.product.price, [
                    {
                      item_brand: props.brand.name,
                      item_id: props.productId,
                      item_name: props.product.name,
                      item_variant: props.variantId,
                      price: props.product.price,
                      quantity: 1,
                    },
                  ])
                ),
              disabled: isAdding,
              children: t('btn.add_to_cart', 'Add to Cart'),
              id: `add-to-cart-${productId}`,
            },
            {
              onClick: () => quickView.onShow(path),
              children: t('btn.quick_view', 'Quick view'),
              variant: 'tertiary',
              id: `quick-view-${productId}`,
            },
          ]}
        />
      </Link>
      <ProductModal modal={quickView.modal} slug={quickView.slug} />
    </>
  )
}
