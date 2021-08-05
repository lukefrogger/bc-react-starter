import * as React from 'react'

import useCustomer from '@bigcommerce/storefront-data-hooks/use-customer'
import useSignup from '@bigcommerce/storefront-data-hooks/use-signup'
import { FormikProps, useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import { Link, Redirect, useHistory } from 'react-router-dom'
import { Button, Typography } from 'unsafe-bc-react-components'

import { SignupField as Field } from './signup__field'
import * as styles from './styles'
import { createValidateFn, SignupValues } from './validation'

const createGetFieldProps =
  (formik: FormikProps<SignupValues>) => (field: keyof SignupValues) => ({
    name: field,
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
    error: formik.touched[field] ? formik.errors[field] : undefined,
    value: formik.values[field],
  })

export function SignupPage(): React.ReactElement {
  const { t } = useTranslation()
  const signup = useSignup()
  const { data: customer } = useCustomer()
  const history = useHistory()

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      company: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
    validate: createValidateFn(t),
    onSubmit: async ({ firstName, lastName, email, password, ...rest }) => {
      try {
        await signup({
          firstName,
          lastName,
          email,
          password,
          ...rest,
        })
        history.push('/user/profile')
      } catch (err) {
        formik.setErrors({ password: 'Signup failed' })
      }
    },
  })
  const getFieldProps = createGetFieldProps(formik)

  // Already authenticated
  if (customer) {
    return <Redirect to="/" />
  }

  return (
    <div css={styles.Container}>
      <Typography css={styles.Centered} variant="display-large">
        {t('signup.title', 'Create account')}
      </Typography>
      <Typography css={styles.Description} variant="body-small">
        {t('signup.login_prompt_question', 'Aleady have an account?')}{' '}
        <Link css={styles.Link} to="/login">
          {t('signup.login_prompt', 'Login')}
        </Link>
      </Typography>

      <form css={styles.Centered} onSubmit={formik.handleSubmit}>
        <fieldset css={styles.Fieldset}>
          <h3 css={styles.Heading}>
            {t('signup.general_info_title', 'General info')}
          </h3>
          <div css={styles.FieldGrid}>
            <Field
              css={styles.Field}
              label={t('signup.first_name', 'First name')}
              {...getFieldProps('firstName')}
            />
            <Field
              css={styles.Field}
              label={t('signup.last_name', 'Last name')}
              {...getFieldProps('lastName')}
            />
          </div>
          <div css={styles.FieldGrid}>
            <Field
              optional
              css={styles.Field}
              label={t('signup.company_name', 'Company name')}
              {...getFieldProps('company')}
            />
          </div>
        </fieldset>

        <fieldset css={styles.Fieldset}>
          <h3 css={styles.Heading}>
            {t('signup.contact_info_title', 'Contact info')}
          </h3>
          <div css={styles.FieldGrid}>
            <Field
              css={styles.Field}
              label={t('signup.email', 'Email address')}
              type="email"
              {...getFieldProps('email')}
            />
            <Field
              css={styles.Field}
              label={t('signup.phone', 'Phone number')}
              optional
              type="tel"
              {...getFieldProps('phone')}
            />
          </div>
        </fieldset>

        <fieldset css={styles.Fieldset}>
          <h3 css={styles.Heading}>{t('signup.password', 'Password')}</h3>
          <div css={styles.FieldGrid}>
            <Field
              css={styles.Field}
              label={t('signup.password', 'Password')}
              type="password"
              {...getFieldProps('password')}
            />
            <Field
              css={styles.Field}
              label={t('signup.password_confirm', 'Confirm password')}
              type="password"
              {...getFieldProps('confirmPassword')}
            />
          </div>
        </fieldset>
        <Button
          css={styles.Button}
          variant="secondary"
          type="submit"
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {t('signup.title', 'Create account')}
        </Button>
      </form>
    </div>
  )
}
