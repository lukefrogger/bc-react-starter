import React from 'react'

import { Wishlist } from '@bigcommerce/storefront-data-hooks/api/wishlist'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import { Checkbox } from 'reakit/Checkbox'
import { DialogStateReturn } from 'reakit/Dialog'
import { Button, Typography } from 'unsafe-bc-react-components'

import { Dialog } from '@components'

import * as styles from './styles'

type WishlistValue = { wishlistId: number; value: boolean }

export type WishlistItemDialogValues = {
  additions: WishlistValue[]
  deletions: WishlistValue[]
}

export type WishlistItemDialogProps = DialogStateReturn & {
  title?: string
  button?: string
  productId?: number
  variantId?: number
  wishlists?: Wishlist[] | null
  onSubmitDialog?: (values: WishlistItemDialogValues) => void | Promise<any>
}

export function WishlistItemDialog(
  props: WishlistItemDialogProps
): React.ReactElement {
  const { t } = useTranslation()

  const {
    title = t('bc.wish_list.add', 'New wish list'),
    button = t('bc.btn.add', 'Create wish list'),
    productId,
    variantId,
    wishlists = [],
    onSubmitDialog = () => {},
    ...dialog
  } = props

  const initialValues: Record<number, boolean> =
    wishlists?.reduce((acc, wishlist) => {
      if (!wishlist.id) return acc
      return {
        ...acc,
        [wishlist.id]: wishlist.items?.some(
          (item) =>
            item.product_id === productId && item.variant_id === variantId
        ),
      }
    }, {}) || {}
  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    onSubmit: async (values) => {
      try {
        const differences = Object.entries(values).reduce(
          (acc: WishlistValue[], [key, value]) => {
            if (initialValues[Number(key)] !== value) {
              acc.push({ wishlistId: Number(key), value })
            }
            return acc
          },
          []
        )

        const additions = differences.filter(
          (difference) => difference.value === true
        )
        const deletions = differences.filter(
          (difference) => difference.value === false
        )
        await onSubmitDialog({ additions, deletions })
      } catch (e) {
        formik.setSubmitting(false)
      }
    },
  })

  if (!productId) throw new Error('productId is required')

  return (
    <Dialog {...dialog} title={title}>
      <form onSubmit={formik.handleSubmit} css={styles.list}>
        {wishlists?.map((wishlist) => {
          if (!wishlist.id) return null
          return (
            <label css={styles.checkbox} key={wishlist.id}>
              <Checkbox
                name={String(wishlist.id)}
                checked={formik.values[wishlist.id]}
                onChange={formik.handleChange}
              />
              <Typography variant="body-small">{wishlist.name}</Typography>
            </label>
          )
        })}
        <div css={styles.footer}>
          <Button
            variant="secondary"
            type="submit"
            disabled={formik.isSubmitting}
          >
            {button}
          </Button>
        </div>
      </form>
    </Dialog>
  )
}
