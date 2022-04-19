import * as React from 'react'

import useAddAddress from '@bigcommerce/storefront-data-hooks/address/use-add-address'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Typography } from 'unsafe-bc-react-components'

import { AddressForm, AddressValues } from '@components/address-form'

import * as styles from './styles'

export function AddAddressPage(): React.ReactElement {
  const { t } = useTranslation()
  const addAddress = useAddAddress()
  const navigate = useNavigate()

  const handleSubmit = async (values: AddressValues): Promise<any> => {
    await addAddress(values)
    navigate('/user/addresses')
  }

  return (
    <div css={styles.Container} id="content">
      <Typography as="h1" css={styles.Title} variant="display-large">
        {t('addresses.new_address', 'New address')}
      </Typography>

      <AddressForm onSubmit={handleSubmit} />
    </div>
  )
}
