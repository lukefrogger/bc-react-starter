import React from 'react'

import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { Typography } from 'unsafe-bc-react-components'

import * as styles from './styles'

export function NoMatch404(): React.ReactElement {
  const location = useLocation()
  const { t } = useTranslation()

  return (
    <div css={styles.Container}>
      <Typography variant="display" as="h1" css={styles.Title}>
        {t('page_titles.404', '404')}
      </Typography>
      <Typography variant="body-small" css={styles.Text}>
        {t('errors.no_match_for', 'No match for ')}
        {location.pathname}
      </Typography>
    </div>
  )
}
