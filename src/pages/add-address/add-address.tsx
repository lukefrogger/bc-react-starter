import * as React from 'react'

import {
  Field as FormikField,
  FieldInputProps,
  Form,
  Formik,
  FormikProps,
} from 'formik'
import { useTranslation } from 'react-i18next'
import {
  Button,
  Field,
  FieldProps,
  Typography,
} from 'unsafe-bc-react-components'

import * as styles from './styles'

const generalSection = [
  { field: 'firstName', label: 'First name', required: true, type: 'text' },
  { field: 'lastName', label: 'Last name', required: true, type: 'text' },
  { field: 'company', label: 'Company', required: false, type: 'text' },
  { field: 'phone', label: 'Phone', required: true, type: 'text' },
]

const addressSection = [
  { field: 'address1', label: 'Address line 1', required: true, type: 'text' },
  { field: 'address2', label: 'Address line 2', required: false, type: 'text' },
  { field: 'city', label: 'Suburb/city', required: true, type: 'text' },
  {
    field: 'state',
    label: 'State/province',
    required: true,
    type: 'select',
    options: [
      {
        label: '123',
        value: 123,
      },
    ],
  },
  { field: 'zip', label: 'Zip/postcode', required: true, type: 'text' },
  {
    field: 'country',
    label: 'Country',
    required: true,
    type: 'select',
    options: [
      {
        label: '123',
        value: 123,
      },
    ],
  },
]

const renderField = ({
  field,
  form,
  ...props
}: any & FieldProps): React.ReactElement => <Field {...field} {...props} />

export function AddAddressPage(): React.ReactElement {
  const { t } = useTranslation()

  return (
    <>
      <Typography variant="display-large">
        {t('addresses.new_address', 'New address')}
      </Typography>

      <Formik
        initialValues={{
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
        }}
        onSubmit={console.log}
      >
        {(props: FormikProps<any>) => (
          <Form>
            <fieldset>
              <h3 css={styles.Heading}>
                {t('profile.general_info_title', 'General info')}
              </h3>
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
            </fieldset>

            <fieldset>
              <h3 css={styles.Heading}>
                {t('profile.general_info_title', 'General info')}
              </h3>
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
            </fieldset>
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
          </Form>
        )}
      </Formik>
    </>
  )
}
