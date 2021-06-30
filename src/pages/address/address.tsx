import * as React from 'react'

import useAddresses from '@bigcommerce/storefront-data-hooks/address/use-addresses'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { Typography } from 'unsafe-bc-react-components'

import { AddressForm } from '@components/address-form'

import * as styles from './styles'

export function AddressPage(): React.ReactElement {
  const { t } = useTranslation()
  const { slug }: any = useParams()
  const { data, mutate } = useAddresses()

  const address = data?.addresses?.find((item: any) => item.entityId === slug)

  const handleSubmit = (values: any): Promise<any> => {
    return mutate(values as any, false)
  }

  return (
    <div css={styles.Container}>
      <Typography css={styles.Title} variant="display-large">
        {t('addresses.edit_address', 'Edit address')}
      </Typography>

      {address && (
        <AddressForm initialValues={address as any} onSubmit={handleSubmit} />
      )}
    </div>
  )
}
