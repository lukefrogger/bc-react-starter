import * as React from 'react'

import useCustomer from '@bigcommerce/storefront-data-hooks/use-customer'
import { useFormik } from 'formik'
import { pick } from 'lodash'
import { useTranslation } from 'react-i18next'
import {
  Button,
  Field,
  TranslationFn,
  Typography,
} from 'unsafe-bc-react-components'

import {
  contactSection,
  Fields,
  FormField,
  generalSection,
  passwordSection,
} from './sections'
import { styles } from './styles'

type Values = { [K in Fields]?: string }

const createValidateFn =
  (t: TranslationFn) =>
  (values: Values): Values => {
    const errors: Values = {}

    if (values.newPwd && values.oldPwd && values.newPwd === values.oldPwd) {
      errors.newPwd = t(
        'errors.same_password',
        'New password cannot be the same as the old password'
      )
    }

    return errors
  }

export function ProfilePage(): React.ReactElement {
  const { t } = useTranslation()
  const { data: customer, mutate } = useCustomer()
  const formik = useFormik({
    initialValues: {
      company: '',
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      // Merging with actual customer data
      ...pick(customer, ['company', 'email', 'firstName', 'lastName', 'phone']),
      currPwd: '',
      newPwd: '',
      oldPwd: '',
    },
    onSubmit: async (values) => {
      // TODO: update customer
      mutate(values as any)
    },
    validate: createValidateFn(t),
  })

  const renderField = ({
    name,
    label,
    inline,
    type,
    required,
  }: FormField): React.ReactElement => (
    <div key={name} css={styles.Field?.(inline ? 'inline' : 'block')}>
      <Field
        name={name}
        label={t(`profile.fields.${name}`, label)}
        onChange={formik.handleChange}
        value={formik.values[name]}
        error={formik.touched[name] ? formik.errors[name] : undefined}
        required={required}
        type={type}
      />
    </div>
  )

  return (
    <div>
      <Typography css={styles.Title} variant="display-large">
        {t('profile.title', 'Account profile')}
      </Typography>

      <form css={styles.Form} onSubmit={formik.handleSubmit}>
        <fieldset css={styles.Fieldset}>
          <h3 css={styles.Heading}>
            {t('profile.general_info_title', 'General info')}
          </h3>
          {generalSection.map(renderField)}
        </fieldset>

        <fieldset css={styles.Fieldset}>
          <h3 css={styles.Heading}>
            {t('profile.general_info_title', 'Contact info')}
          </h3>
          {contactSection.map(renderField)}
        </fieldset>

        <fieldset css={styles.Fieldset}>
          <h3 css={styles.Heading}>
            {t('profile.general_info_title', 'Change password')}
          </h3>
          {passwordSection.map(renderField)}
        </fieldset>

        <Button
          disabled={formik.isSubmitting || !formik.isValid}
          variant="secondary"
          type="submit"
        >
          {t('profile.submit_form', 'Update details')}
        </Button>
      </form>
    </div>
  )
}
