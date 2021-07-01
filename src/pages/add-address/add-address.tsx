import * as React from 'react'

import useAddresses from '@bigcommerce/storefront-data-hooks/address/use-addresses'
import { Address } from '@bigcommerce/storefront-data-hooks/api/address'
import { useTranslation } from 'react-i18next'
import { Typography } from 'unsafe-bc-react-components'

import { AddressForm, AddressValues } from '@components/address-form'

import * as styles from './styles'

export function AddAddressPage(): React.ReactElement {
  const { t } = useTranslation()
  const { data, mutate } = useAddresses()

  const handleSubmit = (values: AddressValues): Promise<any> => {
    if (data?.addresses)
      return mutate(
        { ...data, addresses: data?.addresses.concat(values as Address) },
        false
      )
    return Promise.resolve()
  }

  return (
    <div css={styles.Container}>
      <Typography css={styles.Title} variant="display-large">
        {t('addresses.new_address', 'New address')}
      </Typography>

      <AddressForm onSubmit={handleSubmit} />
    </div>
  )
}
