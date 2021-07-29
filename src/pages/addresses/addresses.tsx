import * as React from 'react'

import useAddresses from '@bigcommerce/storefront-data-hooks/address/use-addresses'
import useRemoveAddress from '@bigcommerce/storefront-data-hooks/address/use-remove-address'
import { Address } from '@bigcommerce/storefront-data-hooks/api/address'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { Button, Profile, Typography } from 'unsafe-bc-react-components'
import { AddressType } from 'unsafe-bc-react-components/dist/components/core/profile/types'

import * as styles from './styles'

export function AddressesPage(): React.ReactElement {
  const { t } = useTranslation()
  const history = useHistory()
  const { data, error, revalidate } = useAddresses()
  const removeAddress = useRemoveAddress()
  const addresses = data?.addresses
  const isLoading = !data && !error

  const handleAdd = (): void => history.push('/user/addresses/new')
  const handleEdit = (address: AddressType): void => {
    if (address?.id) history.push(`/user/addresses/${address?.id}`)
  }
  const handleDelete = async (address: AddressType): Promise<void> => {
    await removeAddress({ id: address.id })
    revalidate()
  }

  return (
    <div css={styles.Container}>
      <Typography css={styles.Title} variant="display-large">
        {t('addresses.title', 'My addresses')}
      </Typography>
      <Button css={styles.Button} onClick={handleAdd} variant="secondary">
        {t('addresses.add', 'Add new address')}
      </Button>
      <div css={styles.Grid}>
        {isLoading && <div>{t('common.loading', 'Loading...')}</div>}
        {addresses?.map(
          (address: Address): React.ReactElement => (
            <Profile.AddressCard
              key={address.id}
              address={address as AddressType}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )
        )}
      </div>
    </div>
  )
}
