import * as React from 'react'

import { Form, Formik, FormikProps, useField } from 'formik'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { Button, Field, FieldProps } from 'unsafe-bc-react-components'

import { useCountries } from '@hooks/use-countries'
import { useStates } from '@hooks/use-states'

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
  country_code: '',
}

export type AddressValues = typeof ADDRESS_INITIAL_VALUES

type AddressFormProps = {
  onSubmit: (values: AddressValues) => Promise<any> | void
  initialValues?: AddressValues
}

const FormikField = ({
  asType,
  ...props
}: any & FieldProps): React.ReactElement => {
  const [field, meta] = useField(props)

  return (
    <div>
      <Field
        as={asType}
        error={meta?.touched && meta?.error}
        {...field}
        {...props}
      />
    </div>
  )
}

const getCountryCodeByName = (countries: any, name: string): string =>
  countries?.find((country: any) => country.name === name)?.id

const required = (value: string): string | undefined =>
  !value?.trim() ? 'This field is required' : undefined

export function AddressForm({
  onSubmit,
  initialValues = ADDRESS_INITIAL_VALUES,
}: AddressFormProps): React.ReactElement {
  const { t } = useTranslation()
  const [countryCode, setCountryCode] = React.useState<string>(
    initialValues?.country_code || ''
  )
  const history = useHistory()
  const { data: countries } = useCountries()
  const { data: states } = useStates(
    countryCode || getCountryCodeByName(countries, initialValues.country)
  )
  const handleCancel = (e: React.FormEvent): void => {
    e.preventDefault()
    history.goBack()
  }

  const handleCountryChange =
    (props: FormikProps<AddressValues>) =>
    (e: any): void => {
      props.setValues({ ...props.values, state_or_province: '' })
      props.handleChange(e)
      const code = getCountryCodeByName(countries, e.target.value)
      setCountryCode(code)
    }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) =>
        onSubmit({ ...values, country_code: countryCode ?? '' })
      }
      enableReinitialize
    >
      {(props: FormikProps<AddressValues>) => (
        <Form>
          <fieldset css={styles.Fieldset}>
            <h3 css={styles.Heading}>
              {t('addresses.general_info_title', 'General info')}
            </h3>
            <div css={styles.FieldGrid}>
              <FormikField
                name="first_name"
                label={t(`profile.fields.firstName`, 'First name')}
                validate={required}
              />
              <FormikField
                name="last_name"
                label={t(`profile.fields.lastName`, 'Last name')}
                validate={required}
              />
              <FormikField
                name="company"
                label={
                  <span>
                    {t(`profile.fields.company`, 'Company Name')}{' '}
                    <span css={styles.Optional}>
                      ({t('profile.fields.optional', 'optional')})
                    </span>
                  </span>
                }
              />
              <FormikField
                name="phone"
                label={t(`profile.fields.phone`, 'Phone')}
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
                validate={required}
              />
              <FormikField
                name="address2"
                label={
                  <span>
                    {t(`profile.fields.address2`, 'Address line 2')}{' '}
                    <span css={styles.Optional}>
                      ({t('profile.fields.optional', 'optional')})
                    </span>
                  </span>
                }
              />
              <FormikField
                name="city"
                label={t(`profile.fields.city`, 'City/suburb')}
                validate={required}
              />
              <FormikField
                asType="select"
                name="country"
                label={t(`profile.fields.country`, 'Country')}
                onChange={handleCountryChange(props)}
                validate={required}
              >
                <option>Select a country</option>
                {countries?.map((country: any) => (
                  <option key={country.id} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </FormikField>
              <FormikField
                name="postal_code"
                label={t(`profile.fields.zip`, 'Zip/postcode')}
                validate={required}
              />
              <FormikField
                asType="select"
                name="state_or_province"
                label={t(`profile.fields.state`, 'State/province')}
                validate={states?.length ? required : null}
              >
                <option>Select a state / country</option>

                {states?.map((state: any) => (
                  <option key={state.id} value={state.name}>
                    {state.name}
                  </option>
                ))}
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
