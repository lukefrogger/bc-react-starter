import * as React from 'react'

import useAddresses from '@bigcommerce/storefront-data-hooks/address/use-addresses'
import { Address } from '@bigcommerce/storefront-data-hooks/api/address'
import { camelCase } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { Typography } from 'unsafe-bc-react-components'

import { ADDRESS_INITIAL_VALUES, AddressForm } from '@components/address-form'

import * as styles from './styles'

const transformAddress = (address: Address): any =>
  Object.fromEntries(
    Object.entries(address)
      .map(([key, value]) => [camelCase(key), value])
      .filter(([key]) => key in ADDRESS_INITIAL_VALUES)
  )

export function AddressPage(): React.ReactElement {
  const { t } = useTranslation()
  const { slug }: any = useParams()
  const { data, mutate } = useAddresses()

  const address = data?.addresses?.find((item: any) => item.id === Number(slug))

  const handleSubmit = (values: any): Promise<any> => {
    return mutate(values as any, false)
  }

  return (
    <div css={styles.Container}>
      <Typography css={styles.Title} variant="display-large">
        {t('addresses.edit_address', 'Edit address')}
      </Typography>

      {address && (
        <AddressForm
          initialValues={transformAddress(address)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  )
}
