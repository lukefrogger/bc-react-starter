import * as React from 'react'

import useAddresses from '@bigcommerce/storefront-data-hooks/address/use-addresses'
import { useTranslation } from 'react-i18next'
import { Typography } from 'unsafe-bc-react-components'

import { AddressForm } from '@components/address-form'

import * as styles from './styles'

export function AddAddressPage(): React.ReactElement {
  const { t } = useTranslation()
  const { mutate } = useAddresses()

  const handleSubmit = (values: any): Promise<any> => {
    return mutate(values as any, false)
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
