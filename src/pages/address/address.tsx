import * as React from 'react'

import useAddresses from '@bigcommerce/storefront-data-hooks/address/use-addresses'
import useUpdateAddress from '@bigcommerce/storefront-data-hooks/address/use-update-address'
import { Address } from '@bigcommerce/storefront-data-hooks/api/address'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'
import { Typography } from 'unsafe-bc-react-components'

import {
  ADDRESS_INITIAL_VALUES,
  AddressForm,
  AddressValues,
} from '@components/address-form'

import * as styles from './styles'

const transformAddressForForm = (address: Address): AddressValues =>
  Object.fromEntries(
    Object.entries(address).filter(([key]) => key in ADDRESS_INITIAL_VALUES)
  ) as AddressValues

const transformAddressForPayload = (
  values: AddressValues,
  address: Address
): Address => ({
  ...values,
  address_type: address.address_type,
  customer_id: address.customer_id,
  id: address.id,
})

export function AddressPage(): React.ReactElement {
  const { t } = useTranslation()
  const { slug }: { slug: string } = useParams()
  const { data, error } = useAddresses()
  const updateAddress = useUpdateAddress()
  const history = useHistory()

  const address = data?.addresses?.find(
    (item: Address) => item.id === Number(slug)
  )

  const handleSubmit = async (values: AddressValues): Promise<void> => {
    if (!data?.addresses?.length) return Promise.resolve()
    await updateAddress(transformAddressForPayload(values, address as Address))
    return history.push('/user/addresses')
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
