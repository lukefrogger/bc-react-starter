import React from 'react'

import { Wishlist } from '@bigcommerce/storefront-data-hooks/api/wishlist'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import { Checkbox } from 'reakit/Checkbox'
import {
  DialogDisclosure,
  DialogStateReturn,
  useDialogState,
} from 'reakit/Dialog'
import { Button, Typography } from 'unsafe-bc-react-components'

import { Dialog, WishlistDialog, WishlistDialogValues } from '@components'

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
  onSubmitAdd?: (values: WishlistItemDialogValues) => void | Promise<any>
  onSubmitCreate?: (values: WishlistDialogValues) => void | Promise<any>
  oSubmitCreateAndAdd?: (values: WishlistDialogValues) => void | Promise<any>
}

export function WishlistItemDialog(
  props: WishlistItemDialogProps
): React.ReactElement {
  const { t } = useTranslation()
  const dialogTwo = useDialogState()

  const {
    title = t('bc.wish_list.add', 'New wish list'),
    button = t('bc.btn.add', 'Create wish list'),
    productId,
    variantId,
    wishlists = [],
    onSubmitAdd = () => {},
    onSubmitCreate = () => {},
    oSubmitCreateAndAdd = () => {},
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
        await onSubmitAdd({ additions, deletions })
      } catch (e) {
        formik.setSubmitting(false)
      }
    },
  })

  if (!productId) throw new Error('productId is required')

  if (wishlists?.length === 0) {
    return (
      <WishlistDialog
        {...dialog}
        title={title}
        button={t('bc.wish_list.create_add', 'Create and add item')}
        description={t(
          'bc.wish_list.no_wishlists',
          'Oh-oh, seems like you have no wishlists yet. Create one below:'
        )}
        resetOnSubmit
        onSubmit={async (values) => {
          await oSubmitCreateAndAdd(values)
          dialog.hide()
        }}
      />
    )
  }

  return (
    <>
      <WishlistDialog
        {...dialogTwo}
        resetOnSubmit
        onSubmit={async (values) => {
          await onSubmitCreate(values)
          dialogTwo.hide()
        }}
        onClickBack={dialogTwo.hide}
        onClickClose={() => {
          dialogTwo.hide()
          dialog.hide()
        }}
      />
      <Dialog
        {...dialog}
        title={title}
        visible={dialog.visible && !dialogTwo.visible}
      >
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
          <DialogDisclosure {...dialogTwo} css={styles.link}>
            + <em>{t('bc.wish_list.new', 'New wish list')}</em>
          </DialogDisclosure>

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
    </>
  )
}
