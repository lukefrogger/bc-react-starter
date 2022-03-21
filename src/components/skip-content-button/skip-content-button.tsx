import * as React from 'react'

import { useTranslation } from 'react-i18next'

import * as styles from './styles'

export function SkipContentButton(): React.ReactElement {
  const { t } = useTranslation()

  return (
    <a css={styles.SkipContent} href="#content">
      {t('skip.content.button', 'Skip to content')}
    </a>
  )
}
