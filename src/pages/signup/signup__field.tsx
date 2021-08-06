import * as React from 'react'

import { useTranslation } from 'react-i18next'
import { Field, FieldProps } from 'unsafe-bc-react-components'

import * as styles from './styles'

type SignupFieldProps = FieldProps & {
  optional?: boolean
}
export function SignupField(props: SignupFieldProps): React.ReactElement {
  const { optional, label, ...rest } = props
  const { t } = useTranslation()

  return (
    <Field
      {...rest}
      label={
        optional ? (
          <>
            {label}
            <span css={styles.Optional}>
              {' '}
              ({t('signup.optional', 'optional')})
            </span>
          </>
        ) : (
          label
        )
      }
    />
  )
}
