import * as React from 'react'

import { useTranslation } from 'react-i18next'
import { Profile, Typography } from 'unsafe-bc-react-components'

import * as styles from './styles'

export function ProfilePage(): React.ReactElement {
  const { t } = useTranslation()

  return (
    <div css={styles.container}>
      <Typography css={styles.title} variant="display-large">
        {t('profile.title', 'Account profile')}
      </Typography>
      <Profile.ProfileForm
        onSubmit={(value) => {
          console.log(value)
          return true
        }}
      />
    </div>
  )
}
