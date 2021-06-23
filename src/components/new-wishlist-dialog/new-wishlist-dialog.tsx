import React from 'react'

import { useFormik } from 'formik'
import { Button as ReakitButton } from 'reakit/Button'
import { Checkbox } from 'reakit/Checkbox'
import { Dialog, DialogBackdrop, DialogStateReturn } from 'reakit/Dialog'
import { Button, Field, Typography } from 'unsafe-bc-react-components'

import { useCreateWishlist } from '@hooks'

import * as styles from './styles'

type NewWishlistDialogProps = DialogStateReturn

export function NewWishlistDialog(
  props: NewWishlistDialogProps
): React.ReactElement {
  const { ...dialog } = props
  const create = useCreateWishlist()

  const formik = useFormik({
    initialValues: {
      name: '',
      makeItPublic: false,
    },
    onSubmit: async ({ name, makeItPublic }) => {
      try {
        await create({
          isPublic: makeItPublic,
          name,
        })
        formik.resetForm()
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
            New wish list
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
              Create wish list
            </Button>
          </div>
        </form>
      </Dialog>
    </DialogBackdrop>
  )
}
