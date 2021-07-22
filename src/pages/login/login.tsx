import * as React from 'react'

import useCustomer from '@bigcommerce/storefront-data-hooks/use-customer'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom'
import { Button, Field, Typography } from 'unsafe-bc-react-components'

import { useLogin } from '@hooks/use-login'

import * as styles from './styles'

export function LoginPage(): React.ReactElement {
  const { t } = useTranslation()
  const login = useLogin()
  const { data: customer } = useCustomer()
  const { search } = useLocation()
  const history = useHistory()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async ({ email, password }) => {
      try {
        await login({
          email,
          password,
        })
        const params = new URLSearchParams(search)
        history.push(params.get('forward_url') || '/')
      } catch (err) {
        formik.setErrors({ password: 'Invalid credentials' })
      }
    },
  })

  // Already authenticated
  if (customer) {
    return <Redirect to="/" />
  }

  return (
    <div css={styles.container}>
      <Typography css={styles.centered} variant="display-large">
        {t('login.title', 'Login')}
      </Typography>
      <Typography css={styles.description} variant="body-small">
        {t('login.create_prompt_question', 'Don’t have an account yet?')}{' '}
        <Link css={styles.link} to="/signup">
          {t('login.create_prompt_link', 'Create one')}
        </Link>
      </Typography>

      <form css={styles.centered} onSubmit={formik.handleSubmit}>
        <Field
          css={styles.field}
          label={t('login.email', 'Email')}
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          error={formik.errors.email}
          required
          type="email"
        />
        <Field
          css={styles.field}
          label={t('login.password', 'Password')}
          name="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          error={formik.errors.password}
          required
        />
        <Button
          css={styles.button}
          variant="secondary"
          type="submit"
          disabled={formik.isSubmitting}
        >
          {t('login.title', 'Login')}
        </Button>
      </form>

      <Link css={styles.forgotLink} to="/forgot-password">
        {t('login.forgot_password', 'Forgot password')}
      </Link>
    </div>
  )
}
