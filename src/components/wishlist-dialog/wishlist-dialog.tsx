import React from 'react'

import { FormikHelpers, useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import { Checkbox } from 'reakit/Checkbox'
import { DialogStateReturn } from 'reakit/Dialog'
import { Button, Field, Typography } from 'unsafe-bc-react-components'

import { Dialog } from '../dialog'
import * as styles from './styles'

type Values = {
  name: string
  isPublic: boolean
}

type Props = DialogStateReturn & {
  title?: string
  button?: string
  initialValues?: Values
  resetOnSubmit?: boolean
  onSubmit?: (
    values: Values,
    formikHelpers: FormikHelpers<Values>
  ) => void | Promise<any>
}

export function WishlistDialog(props: Props): React.ReactElement {
  const { t } = useTranslation()

  const {
    title = t('bc.wishlist.new', 'New wish list'),
    button = t('bc.wishlist.create', 'Create wish list'),
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
      <form onSubmit={formik.handleSubmit}>
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
          css={styles.field}
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
