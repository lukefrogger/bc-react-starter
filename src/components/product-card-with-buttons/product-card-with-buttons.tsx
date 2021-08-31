import * as React from 'react'

import { css } from '@emotion/react'
import { Link } from 'react-router-dom'
import {
  ProductCard,
  Props as ProductCardProps,
} from 'unsafe-bc-react-components'

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
              children: 'Add to Cart',
              id: 'add-to-cart',
            },
            {
              onClick: () => quickView.onShow(path),
              children: 'Quick view',
              variant: 'tertiary',
              id: 'quick-view',
            },
          ]}
        />
      </Link>
      <ProductModal modal={quickView.modal} slug={quickView.slug} />
    </>
  )
}
