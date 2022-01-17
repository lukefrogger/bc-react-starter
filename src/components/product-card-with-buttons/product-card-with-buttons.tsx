import * as React from 'react'

import { css } from '@emotion/react'
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
              onClick: addCartItem,
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
