import * as React from 'react'

import { css } from '@emotion/react'
import { useTranslation } from 'react-i18next'
import { DialogStateReturn } from 'reakit'

import { Dialog } from '@components'
import { Product } from '@pages/product/product'

const modalStyles = css`
  min-height: 40vh;
  max-width: 95vw;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;

  @media (min-width: 1200px) {
    max-width: 1128px;
  }
`

type ProductModalProps = {
  modal: DialogStateReturn
  slug?: string
}

export const ProductModal = ({
  modal,
  slug,
}: ProductModalProps): React.ReactElement => {
  const { t } = useTranslation()

  return (
    <Dialog
      {...modal}
      aria-label={t('product.label', 'Product')}
      css={modalStyles}
    >
      {slug && <Product slug={slug} isLimited />}
    </Dialog>
  )
}
