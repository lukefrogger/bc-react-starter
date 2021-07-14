import React from 'react'

import { FormikHelpers, useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import { Checkbox } from 'reakit/Checkbox'
import { DialogStateReturn } from 'reakit/Dialog'
import { Button, Typography } from 'unsafe-bc-react-components'

import { Dialog } from '@components'
import { useAddWishlistItem, useDeleteWishlistItem, useWishlists } from '@hooks'

import * as styles from './styles'

type Values = {
  name: string
  isPublic: boolean
}

type WishlistItemDialogProps = DialogStateReturn & {
  title?: string
  button?: string
  initialValues?: Values
  resetOnSubmit?: boolean
  productId: number
  variantId?: number
  onSubmit?: (
    values: Values,
    formikHelpers: FormikHelpers<Values>
  ) => void | Promise<any>
}

export function WishlistItemDialog(
  props: WishlistItemDialogProps
): React.ReactElement {
  const { data: wishlists } = useWishlists()
  const addWishlistItem = useAddWishlistItem()
  const deleteWishlistItem = useDeleteWishlistItem()

  const { t } = useTranslation()

  const {
    title = t('bc.wish_list.add', 'New wish list'),
    button = t('bc.btn.add', 'Create wish list'),
    productId,
    variantId,
    ...dialog
  } = props

  const initialValues =
    wishlists?.reduce((acc: Record<number, boolean>, wishlist) => {
      if (!wishlist.id) return acc
      return {
        ...acc,
        [wishlist.id]: wishlist.items?.some(
          (item) =>
            item.product_id === productId && item.variant_id === variantId
        ),
      }
    }, {}) || ({} as Record<number, boolean>)

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    onSubmit: async (values) => {
      try {
        const differences = Object.entries(values).reduce(
          (acc, [key, value]) => {
            if (initialValues[Number(key)] !== value) {
              acc.push({ wishlistId: Number(key), value })
            }
            return acc
          },
          [] as { wishlistId: number; value: boolean }[]
        )

        const additions = differences.filter(
          (difference) => difference.value === true
        )
        const deletions = differences.filter(
          (difference) => difference.value === false
        )
        await Promise.all([
          ...additions.map((addition) =>
            addWishlistItem({
              wishlistId: addition.wishlistId,
              productId,
              variantId,
            })
          ),
          ...deletions.map((deletion) => {
            const itemId = wishlists?.reduce(
              (acc: number | null | undefined, wishlist) => {
                if (wishlist.id === deletion.wishlistId) {
                  const itemToDelete = wishlist.items?.find(
                    (item) => item.product_id === productId
                  )
                  return itemToDelete?.id
                }
                return acc
              },
              null as number | null
            )
            if (!itemId) return null
            return deleteWishlistItem({
              wishlistId: deletion.wishlistId,
              itemId,
            })
          }),
        ])
      } finally {
        formik.setSubmitting(false)
        dialog.hide()
      }
    },
  })

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
