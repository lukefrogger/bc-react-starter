import * as React from 'react'

import useAddresses from '@bigcommerce/storefront-data-hooks/address/use-addresses'
import { Address } from '@bigcommerce/storefront-data-hooks/api/address'
import { camelCase, snakeCase } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { Typography } from 'unsafe-bc-react-components'

import { ADDRESS_INITIAL_VALUES, AddressForm } from '@components/address-form'

import * as styles from './styles'

const transformAddressForForm = (address: Address): any =>
  Object.fromEntries(
    Object.entries(address).filter(([key]) => key in ADDRESS_INITIAL_VALUES)
  )

const transformAddressForPayload = (values: any, address: Address): any => ({
  ...values,
  address_type: address.address_type,
  customer_id: address.customer_id,
  id: address.id,
})

export function AddressPage(): React.ReactElement {
  const { t } = useTranslation()
  const { slug }: any = useParams()
  const { data, mutate, error } = useAddresses()

  const address = data?.addresses?.find((item: any) => item.id === Number(slug))

  const handleSubmit = (values: any): Promise<any> => {
    return mutate(transformAddressForPayload(values, address as any), false)
  }

  if (!address && error) {
    return <div>{t('errors.no_address', 'No address for given ID')}</div>
  }

  return (
    <div css={styles.Container}>
      <Typography css={styles.Title} variant="display-large">
        {t('addresses.edit_address', 'Edit address')}
      </Typography>

      {address && (
        <AddressForm
          initialValues={transformAddressForForm(address)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  )
}
