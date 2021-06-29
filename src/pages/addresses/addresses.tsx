import * as React from 'react'

import useAddresses from '@bigcommerce/storefront-data-hooks/address/use-addresses'
import { Address } from '@bigcommerce/storefront-data-hooks/api/address'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { Button, Profile, Typography } from 'unsafe-bc-react-components'
import { AddressType } from 'unsafe-bc-react-components/dist/components/core/profile/types'

const mock: Address[] = [
  {
    id: 63,
    address1: '123 Fake St',
    address2: '',
    address_type: 'residential',
    city: 'Oklahoma',
    company: '',
    country: 'United States',
    country_code: 'US',
    customer_id: 41,
    first_name: 'Nick',
    last_name: 'Ioa',
    phone: '555678545',
    postal_code: '123456',
    state_or_province: 'Florida',
  },
  {
    id: 81,
    address1: '31',
    address2: 'Aspin Park Road',
    address_type: 'residential',
    city: 'Knaresborough',
    company: '',
    country: 'United Kingdom',
    country_code: 'GB',
    customer_id: 41,
    first_name: 'Nick',
    last_name: 'Ioannou',
    phone: '',
    postal_code: 'HG5 8HF',
    state_or_province: 'North Yorkshire',
  },
]

export function AddressesPage(): React.ReactElement {
  const { t } = useTranslation()
  const history = useHistory()
  // TODO: When useCustomer hook works, this should start working too
  const { data, mutate } = useAddresses()
  const addresses = data?.addresses || mock

  const handleAdd = (): void => history.push('/user/addresses/add')
  const handleEdit = (address: AddressType): void => {
    if (address?.id) history.push(`/user/addresses/edit/${address?.id}`)
  }
  const handleDelete = (address: AddressType): void => {
    mutate({
      ...data,
      addresses: addresses.filter((item) => item?.id !== address?.id),
    } as any)
  }

  return (
    <div>
      <Typography variant="display-large">
        {t('addresses.title', 'My addresses')}
      </Typography>
      <Button onClick={handleAdd} variant="secondary">
        {t('addresses.add', 'Add new address')}
      </Button>
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
  )
}
