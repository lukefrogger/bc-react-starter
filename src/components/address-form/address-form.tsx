import * as React from 'react'

import { Field as FormikField, Form, Formik, FormikProps } from 'formik'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { Button, Field, FieldProps } from 'unsafe-bc-react-components'

import * as styles from './styles'

export const ADDRESS_INITIAL_VALUES = {
  first_name: '',
  last_name: '',
  company: '',
  phone: '',
  address1: '',
  address2: '',
  city: '',
  state_or_province: '',
  postal_code: '',
  country: '',
}

type AddressFormProps = {
  onSubmit: (values: any) => void
  initialValues?: typeof ADDRESS_INITIAL_VALUES
}

const renderField = ({
  field,
  form,
  asType,
  options,
  ...props
}: any & FieldProps): React.ReactElement => (
  <div>
    <Field as={asType} {...field} {...props} />
  </div>
)

export function AddressForm({
  onSubmit,
  initialValues = ADDRESS_INITIAL_VALUES,
}: AddressFormProps): React.ReactElement {
  const { t } = useTranslation()
  const history = useHistory()

  const handleCancel = (e: React.FormEvent): void => {
    e.preventDefault()
    history.goBack()
  }

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
                name="first_name"
                label={t(`profile.fields.firstName`, 'First name')}
                component={renderField}
                required
              />
              <FormikField
                name="last_name"
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
                asType="select"
                name="state_or_province"
                label={t(`profile.fields.state`, 'State/country')}
                component={renderField}
                required
              >
                {/* TODO: fetch countries and states */}
                <option
                  value="Michigan"
                  selected={props.values.state_or_province === 'Michigan'}
                >
                  Michigan
                </option>
                <option
                  value="Connecticut"
                  selected={props.values.state_or_province === 'Connecticut'}
                >
                  Connecticut
                </option>
              </FormikField>
              <FormikField
                name="postal_code"
                label={t(`profile.fields.zip`, 'Zip/postcode')}
                component={renderField}
                required
              />
              <FormikField
                asType="select"
                name="country"
                label={t(`profile.fields.country`, 'Country')}
                component={renderField}
                required
              >
                <option
                  value="United States"
                  selected={props.values.country === 'United States'}
                >
                  United States
                </option>
                <option
                  value="Czech Republic"
                  selected={props.values.country === 'Czech Republic'}
                >
                  Czech Republic
                </option>
              </FormikField>
            </div>
          </fieldset>
          <div css={styles.ButtonGroup}>
            <Button
              disabled={props.isSubmitting || !props.isValid}
              variant="tertiary"
              type="button"
              onClick={handleCancel}
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
