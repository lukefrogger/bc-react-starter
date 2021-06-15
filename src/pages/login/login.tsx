import * as React from 'react'

import { useLogin } from '@bigcommerce/storefront-data-hooks'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Button, Field, Typography } from 'unsafe-bc-react-components'

export function LoginPage(): React.ReactElement {
  const { t } = useTranslation()
  const login = useLogin()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async ({ email, password }) => {
      await login({
        email,
        password,
      })
    },
  })

  return (
    <div>
      <Typography>{t('login.title', 'Login')}</Typography>
      <Typography>
        {t('login.create_prompt_question', 'Don’t have an account yet?')}{' '}
        <Link to="/register">
          {t('login.create_prompt_link', 'Create one')}
        </Link>
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        <Field
          label={t('login.email', 'Email')}
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        <Field
          label={t('login.password', 'Password')}
          name="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <Button variant="primary" type="submit" disabled={formik.isSubmitting}>
          {t('login.title', 'Login')}
        </Button>
      </form>
    </div>
  )
}
