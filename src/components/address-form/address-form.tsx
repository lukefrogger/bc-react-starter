import * as React from 'react'

import { Field as FormikField, Form, Formik, FormikProps } from 'formik'
import { useTranslation } from 'react-i18next'
import { Button, Field, FieldProps } from 'unsafe-bc-react-components'

import * as styles from './styles'

const INITIAL_VALUES = {
  firstName: '',
  lastName: '',
  company: '',
  phone: '',
  address1: '',
  address2: '',
  city: '',
  state: '',
  zip: '',
  country: '',
}

type AddressFormProps = {
  onSubmit: (values: any) => void
  initialValues?: typeof INITIAL_VALUES
}

const renderField = ({
  field,
  form,
  ...props
}: any & FieldProps): React.ReactElement => (
  <div>
    <Field {...field} {...props} />
  </div>
)

export function AddressForm({
  onSubmit,
  initialValues = INITIAL_VALUES,
}: AddressFormProps): React.ReactElement {
  const { t } = useTranslation()

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {(props: FormikProps<any>) => (
        <Form>
          <fieldset css={styles.Fieldset}>
            <h3 css={styles.Heading}>
              {t('addresses.general_info_title', 'General info')}
            </h3>
            <div css={styles.FieldGrid}>
              <FormikField
                name="firstName"
                label={t(`profile.fields.firstName`, 'First name')}
                component={renderField}
                required
              />
              <FormikField
                name="lastName"
                label={t(`profile.fields.lastName`, 'Last name')}
                component={renderField}
                required
              />
              <FormikField
                name="company"
                label={t(`profile.fields.company`, 'Company')}
                component={renderField}
              />
              <FormikField
                name="phone"
                label={t(`profile.fields.phone`, 'Phone')}
                component={renderField}
                required
              />
            </div>
          </fieldset>

          <fieldset css={styles.Fieldset}>
            <h3 css={styles.Heading}>
              {t('addresses.address_info_title', 'Address info')}
            </h3>
            <div css={styles.FieldGrid}>
              <FormikField
                name="address1"
                label={t(`profile.fields.address1`, 'Address line 1')}
                component={renderField}
                required
              />
              <FormikField
                name="address2"
                label={t(`profile.fields.address2`, 'Address line 2')}
                component={renderField}
              />
              <FormikField
                name="city"
                label={t(`profile.fields.city`, 'City/suburb')}
                component={renderField}
                required
              />
              <FormikField
                name="state"
                label={t(`profile.fields.state`, 'State/country')}
                component={renderField}
                required
              />
              <FormikField
                name="zip"
                label={t(`profile.fields.zip`, 'Zip/postcode')}
                component={renderField}
                required
              />
              <FormikField
                as="select"
                name="country"
                label={t(`profile.fields.country`, 'Country')}
                component={renderField}
                required
              />
            </div>
          </fieldset>
          <div css={styles.ButtonGroup}>
            <Button
              disabled={props.isSubmitting || !props.isValid}
              variant="tertiary"
              type="submit"
            >
              {t('addresses.cancel', 'Cancel')}
            </Button>
            <Button
              disabled={props.isSubmitting || !props.isValid}
              variant="secondary"
              type="submit"
            >
              {t('addresses.save', 'Save')}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  )
}
