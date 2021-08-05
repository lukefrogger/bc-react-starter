import { TranslationFn } from 'unsafe-bc-react-components'

export type SignupValues = {
  firstName: string
  lastName: string
  company: string
  email: string
  phone: string
  password: string
  confirmPassword: string
}

export const createValidateFn =
  (t: TranslationFn) =>
  (values: SignupValues): Partial<SignupValues> => {
    const errors: Partial<SignupValues> = {}

    if (!values.firstName) {
      errors.firstName = t('errors.first_name', 'First name is required')
    }
    if (!values.lastName) {
      errors.lastName = t('errors.last_name', 'Last name is required')
    }
    if (!values.email) {
      errors.email = t('errors.email', 'Email is required')
    }
    if (!values.password) {
      errors.password = t('errors.password', 'Password is required')
    }

    if (
      values.password &&
      !/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(
        values.password
      )
    ) {
      errors.password = t(
        'errors.pwd_length',
        'Password must contain at least one number and one special character'
      )
    }

    if (values.password && !values.confirmPassword) {
      errors.confirmPassword = t(
        'errors.confirm_pwd',
        'Please confirm your new password'
      )
    }

    if (
      values.password &&
      values.confirmPassword &&
      values.password !== values.confirmPassword
    ) {
      errors.confirmPassword = t('errors.no_match', 'Passwords do not match')
    }

    return errors
  }
