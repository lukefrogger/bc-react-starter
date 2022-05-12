import * as React from 'react'

import { useSitemap } from '@hooks/use-sitemap'

import * as styles from './styles'

export function Sitemap(): React.ReactElement {
  const sitemap = useSitemap()

  return (
    <div css={styles.container}>
      <ul>
        {sitemap.map((link) => (
          <li key={link}>{link}</li>
        ))}
      </ul>
    </div>
  )
}
