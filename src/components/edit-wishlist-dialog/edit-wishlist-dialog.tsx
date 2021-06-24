import React from 'react'

import { useFormik } from 'formik'
import { Button as ReakitButton } from 'reakit/Button'
import { Checkbox } from 'reakit/Checkbox'
import { Dialog, DialogBackdrop, DialogStateReturn } from 'reakit/Dialog'
import { Button, Field, Typography } from 'unsafe-bc-react-components'

import { useUpdateWishlist } from '@hooks'

import * as styles from './styles'

type EditWishlistDialogProps = DialogStateReturn & {
  name: string
  makeItPublic: boolean
  wishlistId: number
}

export function EditWishlistDialog(
  props: EditWishlistDialogProps
): React.ReactElement {
  const {
    name: initialName,
    makeItPublic: initialMakeItPublic,
    wishlistId,
    ...dialog
  } = props
  const update = useUpdateWishlist()

  // TODO: Revalidate useWishlist on edit (extract logic from this component)

  const formik = useFormik({
    initialValues: {
      name: initialName,
      makeItPublic: initialMakeItPublic,
    },
    onSubmit: async ({ name, makeItPublic }) => {
      try {
        await update({
          isPublic: makeItPublic,
          name,
          wishlistId,
        })
        dialog.hide()
      } catch (e) {
        formik.setErrors({ name: 'Unexpected error' })
      }
    },
  })

  return (
    <DialogBackdrop {...dialog} css={styles.backdrop}>
      <Dialog {...dialog} aria-label="Welcome" css={styles.dialog}>
        <div css={styles.header}>
          <Typography variant="display" css={styles.title}>
            Edit wish list
          </Typography>
          <ReakitButton css={styles.close} onClick={dialog.hide}>
            <svg width={26} height={26} viewBox="0 0 26 26" fill="none">
              <path
                d="M24 2L2 24M24 24L2 2"
                stroke="currentColor"
                strokeWidth={2}
                strokeMiterlimit={10}
                strokeLinecap="square"
              />
            </svg>
          </ReakitButton>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <Field
            name="name"
            required
            placeholder="Name your wish list"
            label="Wish list name"
            value={formik.values.name}
            onChange={formik.handleChange}
            css={styles.field}
          />
          <label css={styles.checkbox}>
            <Checkbox
              name="makeItPublic"
              checked={formik.values.makeItPublic}
              onChange={formik.handleChange}
            />
            <Typography variant="body-small">Make it public</Typography>
          </label>
          <div css={styles.footer}>
            <Button
              variant="secondary"
              type="submit"
              disabled={formik.isSubmitting}
            >
              Edit wish list
            </Button>
          </div>
        </form>
      </Dialog>
    </DialogBackdrop>
  )
}
