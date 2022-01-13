import React from 'react'

import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import { DialogStateReturn } from 'reakit/Dialog'
import { Button, Dropdown, Field } from 'unsafe-bc-react-components'

import { AddReviewInput } from '@hooks'

import { Dialog } from '../dialog'
import * as styles from './styles'

type Values = Omit<AddReviewInput, 'productId'>

type Props = DialogStateReturn & {
  title?: string
  button?: string
  initialValues?: Values
  resetOnSubmit?: boolean
  onSubmit?: (values: Values) => void | Promise<any>
}

export function ReviewDialog(props: Props): React.ReactElement {
  const { t } = useTranslation()

  const {
    title = t('review.write', 'Write a Review'),
    button = t('review.submit', 'Submit Review'),
    onSubmit = () => {},
    initialValues,
    resetOnSubmit = false,
    ...dialog
  } = props

  const formik = useFormik({
    initialValues: {
      title: initialValues?.title || '',
      /**
       * The text for the product review.
       *
       */
      text: initialValues?.text,
      /**
       * The rating of the product review. Must be one of 0, 1, 2, 3, 4, 5.
       */
      rating: initialValues?.email
        ? (String(initialValues.email) as '1' | '2' | '3' | '4' | '5')
        : undefined,
      /**
       * The email of the reviewer. Must be a valid email, or an empty string.
       */
      email: initialValues?.email,
      /**
       * The name of the reviewer.
       */
      name: initialValues?.name,
    },
    onSubmit: async (values) => {
      try {
        if (!values.rating) {
          throw new Error(t('errors.rating', 'rating must be a string'))
        }
        await onSubmit({
          ...values,
          rating: parseInt(values.rating, 10) as Values['rating'],
        })
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
    <Dialog
      {...dialog}
      title={title}
      aria-label={t('reviews.write', 'Write a Review')}
    >
      <form onSubmit={formik.handleSubmit} css={styles.form}>
        <Dropdown
          name="rating"
          label={t('review.rating', 'Rating')}
          required
          placeholder="Select Rating"
          options={[
            {
              label: t('review.rating_1', '1 star (worst)'),
              id: '1',
            },
            {
              label: t('review.rating_2', '2 stars'),
              id: '2',
            },
            {
              label: t('review.rating_3', '3 stars (average)'),
              id: '3',
            },
            {
              label: t('review.rating_4', '4 stars'),
              id: '4',
            },
            {
              label: t('review.rating_5', '5 stars (best)'),
              id: '5',
            },
          ]}
          onChange={formik.handleChange}
          value={formik.values.rating}
          aria-label={t('review.rating', 'Rating')}
        />
        <Field
          name="name"
          label={
            <span>
              {t('review.name', 'Name')}{' '}
              <span css={styles.Optional}>
                {t('profile.fields.optional', '(optional)')}
              </span>
            </span>
          }
          value={formik.values.name}
          error={formik.errors.name}
          onChange={formik.handleChange}
          css={styles.field}
        />
        <Field
          name="email"
          type="email"
          required
          label={t('review.email', 'Email')}
          value={formik.values.email}
          error={formik.errors.email}
          onChange={formik.handleChange}
          css={styles.field}
        />
        <Field
          name="title"
          required
          label={t('review.subject', 'Review Subject')}
          value={formik.values.title}
          error={formik.errors.title}
          onChange={formik.handleChange}
          css={styles.field}
        />
        <Field
          name="text"
          required
          label={t('review.comments', 'Comments')}
          value={formik.values.text}
          error={formik.errors.text}
          onChange={formik.handleChange}
          css={styles.field}
          as="textarea"
        />

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
