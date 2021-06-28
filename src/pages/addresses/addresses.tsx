import * as React from 'react'

import { Profile } from 'unsafe-bc-react-components'

import { useAddresses } from '@hooks/use-addresses'

export function AddressesPage(): React.ReactElement {
  const data = useAddresses({ customerId: 40 })

  return (
    <div>
      Addresses
      {/* {addresses?.map((address) => (
        <Profile.AddressCard key={address.id} address={address} />
      ))} */}
    </div>
  )
}
