import React from 'react'

import { FormikHelpers, useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import { Checkbox } from 'reakit/Checkbox'
import { Button, Field, Typography } from 'unsafe-bc-react-components'

import { DialogProps } from '@components'

import { Dialog } from '../dialog'
import * as styles from './styles'

export type WishlistDialogValues = {
  name: string
  isPublic: boolean
}

export type WishlistDialogProps = DialogProps & {
  title?: string
  description?: string
  button?: string
  initialValues?: WishlistDialogValues
  resetOnSubmit?: boolean
  onSubmit?: (
    values: WishlistDialogValues,
    formikHelpers: FormikHelpers<WishlistDialogValues>
  ) => void | Promise<any>
}

export function WishlistDialog(props: WishlistDialogProps): React.ReactElement {
  const { t } = useTranslation()

  const {
    title = t('bc.wish_list.new', 'New wish list'),
    button = t('bc.wish_list.create', 'Create wish list'),
    description = null,
    onSubmit = () => {},
    initialValues,
    resetOnSubmit = false,
    ...dialog
  } = props

  const formik = useFormik({
    initialValues: {
      name: initialValues?.name || '',
      isPublic: initialValues?.isPublic || false,
    },
    onSubmit: async (...input) => {
      try {
        await onSubmit(...input)
        if (resetOnSubmit) {
          formik.resetForm()
        }
      } catch (e) {
        formik.setErrors({ name: 'Unexpected error' })
        formik.setSubmitting(false)
      }
    },
  })

  return (
    <Dialog {...dialog} title={title}>
      {description && <p css={styles.description}>{description}</p>}
      <form onSubmit={formik.handleSubmit} css={styles.form}>
        <Field
          name="name"
          required
          placeholder={t(
            'bc.wish_list.name_placeholder',
            'Name your wish list'
          )}
          label={t('bc.wish_list.name', 'Wish list name')}
          value={formik.values.name}
          error={formik.errors.name}
          onChange={formik.handleChange}
        />
        <label css={styles.checkbox}>
          <Checkbox
            name="isPublic"
            checked={formik.values.isPublic}
            onChange={formik.handleChange}
          />
          <Typography variant="body-small">
            {t('bc.wish_list.make_it_public', 'Make it public')}
          </Typography>
        </label>
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
