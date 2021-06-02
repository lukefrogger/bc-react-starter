import * as React from 'react'

import { useTranslation } from 'react-i18next'
import { Hero, Profile, Typography } from 'unsafe-bc-react-components'

export function WishListPage(): React.ReactElement {
  const { t, i18n } = useTranslation()

  return (
    <div>
      {['en', 'fr'].map((lng) => (
        <button
          type="button"
          key={lng}
          onClick={() => i18n.changeLanguage(lng)}
        >
          {lng}
        </button>
      ))}

      <Hero
        headline={{
          text: t('hero.headline', 'Headline in the Hero'),
        }}
      />
      <Typography variant="display-large">
        Translating BC Components:
      </Typography>
      <Profile.AddressCard
        address={{
          address1: '5th Avenue',
          address2: '555',
          address_type: '',
          city: 'New York City',
          company: '',
          country: '',
          country_code: '',
          customer_id: 1,
          first_name: '',
          id: 2,
          last_name: '',
          phone: '',
          postal_code: '53553',
          state_or_province: '',
        }}
        onEdit={console.log}
        onDelete={console.log}
      />
    </div>
  )
}
