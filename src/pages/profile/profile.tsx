import * as React from 'react'

import useCustomer, {
  Customer,
} from '@bigcommerce/storefront-data-hooks/use-customer'
import { useFormik } from 'formik'
import { pick } from 'lodash'
import { useTranslation } from 'react-i18next'
import {
  Button,
  Field,
  TranslationFn,
  Typography,
} from 'unsafe-bc-react-components'

import { UpdateCustomerInput, useUpdateCustomer } from '@hooks'

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

    if (values.newPwd && !values.confirmPwd) {
      errors.confirmPwd = t(
        'errors.confirm_pwd',
        'Please confirm your new password'
      )
    }

    if (
      values.newPwd &&
      values.confirmPwd &&
      values.newPwd !== values.confirmPwd
    ) {
      errors.confirmPwd = t('errors.no_match', 'Passwords do not match')
    }

    if ((values.newPwd || values.confirmPwd) && !values.currPwd) {
      errors.currPwd = t(
        'errors.no_curr_pwd',
        'Please enter your current password'
      )
    }

    return errors
  }

const infoFields = ['company', 'email', 'firstName', 'lastName', 'phone']
const transformCustomerInput = (
  customer: Customer,
  password: string,
  new_password?: string
): UpdateCustomerInput => ({
  first_name: customer.firstName,
  last_name: customer.lastName,
  id: customer.entityId,
  phone: customer.phone,
  company: customer.company,
  email: customer.email,
  authentication: new_password ? { new_password, password } : undefined,
})

export function ProfilePage(): React.ReactElement {
  const { t } = useTranslation()
  const { data: customer } = useCustomer()
  const updateCustomer = useUpdateCustomer()
  const formik = useFormik({
    initialValues: {
      company: '',
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      // Merging with actual customer data
      ...pick(customer, infoFields),
      currPwd: '',
      newPwd: '',
      confirmPwd: '',
    },
    onSubmit: async (values: Values) => {
      const fields = {
        ...customer,
        ...pick(values, infoFields),
      } as Customer
      return updateCustomer(
        transformCustomerInput(fields, values.currPwd || '', values.newPwd)
      )
    },
    validate: createValidateFn(t),
    enableReinitialize: true,
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
        error={formik.errors[name]}
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
