import * as React from 'react'

import useCustomer from '@bigcommerce/storefront-data-hooks/use-customer'
import useSignup from '@bigcommerce/storefront-data-hooks/use-signup'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import { Link, Redirect, useHistory } from 'react-router-dom'
import { Button, Field, Typography } from 'unsafe-bc-react-components'

import * as styles from './styles'
import { createValidateFn } from './validation'

export function SignupPage(): React.ReactElement {
  const { t } = useTranslation()
  const signup = useSignup()
  const { data: customer } = useCustomer()
  const history = useHistory()

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate: createValidateFn(t),
    onSubmit: async ({ firstName, lastName, email, password }) => {
      try {
        await signup({
          firstName,
          lastName,
          email,
          password,
        })
        history.push('/user/profile')
      } catch (err) {
        formik.setErrors({ password: 'Signup failed' })
      }
    },
  })

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
              name="firstName"
              onChange={formik.handleChange}
              value={formik.values.firstName}
              error={formik.errors.firstName}
            />
            <Field
              css={styles.Field}
              label={t('signup.last_name', 'Last name')}
              name="lastName"
              onChange={formik.handleChange}
              value={formik.values.lastName}
              error={formik.errors.lastName}
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
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              error={formik.errors.email}
              type="email"
            />
          </div>
        </fieldset>

        <fieldset css={styles.Fieldset}>
          <h3 css={styles.Heading}>{t('signup.password', 'Password')}</h3>
          <div css={styles.FieldGrid}>
            <Field
              css={styles.Field}
              label={t('signup.password', 'Password')}
              name="password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              error={formik.errors.password}
            />
            <Field
              css={styles.Field}
              label={t('signup.password_confirm', 'Confirm password')}
              name="confirmPassword"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
              error={formik.errors.confirmPassword}
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
